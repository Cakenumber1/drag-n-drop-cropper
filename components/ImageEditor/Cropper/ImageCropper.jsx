import React, {forwardRef} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from './styles.module.scss';

const ImageCropper = ({history, handleForceUpdateMethod}, ref) => {
  // const onCrop = () => {
  //   const cropper = cropperRef.current?.cropper;
  //   console.log(cropper.getCroppedCanvas().toDataURL());
  // };

  return (
        <Cropper
            src={history.current.src}
            className={styles.imageCropper}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            guides={false}
            // crop={onCrop}
            ref={ref}
        />
  );
};

const ImageCropperWrapper = forwardRef(ImageCropper);

export default ImageCropperWrapper;
