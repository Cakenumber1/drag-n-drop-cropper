import React, {useRef, useState} from 'react';

import ImageUpload from "@app/components/ImageEditor/Upload";
import ImageEditor from "@app/components/ImageEditor/Cropper";
import ImageControllers from "components/ImageEditor/Controls";

import {History} from "@app/utils/history";

import styles from './styles.module.scss';

const useForceUpdate = () => {
    let [value, setState] = useState(true);
    return () => setState(!value);
};

const ImageContainer = ({config}) => {
    const {mime_types, limit} = config;
    const cropperRef = useRef(null);
    const inputRef = useRef(null);

    const [history] = useState(() => new History());

    const handleForceUpdateMethod = useForceUpdate();

    return (
        <div className={styles.baseContainer}>
            <ImageUpload ref={inputRef} extensions={mime_types} limit={limit} history={history} handleForceUpdateMethod={handleForceUpdateMethod} />
            {history.current &&
                <div className={styles.editorContainer}>
                    <ImageControllers ref={cropperRef} history={history} handleForceUpdateMethod={handleForceUpdateMethod} />
                    <ImageEditor ref={cropperRef} history={history} handleForceUpdateMethod={handleForceUpdateMethod} />
                </div>
            }
        </div>
    );
};

export default ImageContainer;
