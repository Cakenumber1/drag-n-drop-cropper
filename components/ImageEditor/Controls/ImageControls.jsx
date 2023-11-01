import React, {forwardRef} from 'react';
import { useTranslation } from "next-i18next";

import ControlButton from "@app/components/ImageEditor/Controls/ControlButton";

import ResetIcon from "@app/assets/ResetIcon";
import BackwardsIcon from "@app/assets/BackwardsIcon";
import ForwardsIcon from "@app/assets/ForwardsIcon";
import CloseIcon from "@app/assets/CloseIcon";
import UploadIcon from "@app/assets/UploadIcon";
import CutIcon from "@app/assets/CutIcon";

import styles from './styles.module.scss';

const ImageControls = ({history, handleForceUpdateMethod}, ref) => {
    const { t } = useTranslation();
    const isImageUploaded = history.current;
    const isResetEnabled = history.enabledReset;
    const isForwardsEnabled = history.enabledForwards;
    const isBackwardsEnabled = history.enabledBackwards;
    const handleReset = () => {
        history.reset();
        handleForceUpdateMethod();
    };

    const handleForwards = () => {
        history.moveForwards();
        handleForceUpdateMethod();
    };

    const handleBackwards = () => {
        history.moveBackwards();
        handleForceUpdateMethod();
    };

    const handleApply = () => {
        const cropper = ref.current?.cropper;
        const image = new Image();
        image.src = cropper.getCroppedCanvas().toDataURL();
        history.update(image);
        handleForceUpdateMethod();
    };

    const handlePost = () => {
        const data = new FormData();
        data.append('file', new File([history.current.src], "uploadedFile"));

        fetch(process.env.NEXT_PUBLIC_URL, {
            method: 'POST',
            body: data
        })
            .then(() => {console.log('success');})
            .catch((error) => {console.error(error);})
            .finally(() => {
                history.clear();
                handleForceUpdateMethod();
            });
    };

    const handleClear = () => {
        history.clear();
        handleForceUpdateMethod();
    };

    const buttons = [
        {
            name: 'reset',
            disabled: !isResetEnabled,
            onClick: handleReset,
            src: <ResetIcon />
        },
        {
            name: 'backwards',
            disabled: !isBackwardsEnabled,
            onClick: handleBackwards,
            src: <BackwardsIcon />
        },
        {
            name: 'forwards',
            disabled: !isForwardsEnabled,
            onClick: handleForwards,
            src: <ForwardsIcon />
        },
        {
            name: 'apply',
            disabled: !isImageUploaded,
            onClick: handleApply,
            src: <CutIcon />
        },
        {
            name: 'post',
            disabled: !isImageUploaded,
            onClick: handlePost,
            src: <UploadIcon />
        },
        {
            name: 'close',
            disabled: !isImageUploaded,
            onClick: handleClear,
            src: <CloseIcon />
        },
    ];

    return (
        <div className={styles.controlsContainer}>
            {buttons.map(button =>
                <ControlButton key={button.name} disabled={button.disabled} onClick={button.onClick}>
                    {button.src}
                </ControlButton>
            )}
        </div>
    );
};


const ImageControlsWrapper = forwardRef(ImageControls);

export default ImageControlsWrapper;
