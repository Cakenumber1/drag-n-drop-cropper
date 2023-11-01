import React, {forwardRef, useState} from 'react';
import { FileDrop } from 'react-file-drop';
import {useTranslation} from "next-i18next";

import ClearIcon from "@app/assets/ClearIcon";

import styles from './styles.module.scss';
import {checkFileSize} from "@app/utils/checkFileSize";
import {checkExtension} from "@app/utils/checkExtenstion";

const ImageUpload = ({history, handleForceUpdateMethod, extensions, limit = 12}, ref) => {
  const { t } = useTranslation();
  const [error, setError] = useState();

  const extensionsString = (extensions.length ? extensions.join(' ') : t("ANY")) + " " + t("LIMITS_FORMATS");
  const limitsString = t("LIMITS_MAX") + limit + " " + t("LIMITS_MB");
  const limitsFullText = extensionsString + " " + limitsString;
  const handleAddFiles = (files) => {
    let extensionPass = true;
    setError(null);
    if (files.length > 1) {
      setError(t("ERROR_MULTIPLE"));
    }
    console.log(files[0]);
    if (checkFileSize(files[0].size, limit)) {
      setError(t("ERROR_LIMIT"));
      return;
    }
    console.log(files[0].type);
    if (!checkExtension(files[0].type, extensions)) {
      extensionPass = false;
      console.log(111);
      setError(t("ERROR_EXTENSION"));
      ref.current.value = null;
      return;
    }
    const img = new Image();
    img.src = window.URL.createObjectURL(files[0]);
    img.onload = () => {
      history.clear();
      history.update(img);
      handleForceUpdateMethod();
    };

    ref.current.value = null;
  };

  if (history.current) {
    return;
  }

  return (
      <div className={styles.fileUploadContainer}>
        <div className={styles.fullFileDropContainer}
        >
          <FileDrop
              onDrop={files => handleAddFiles(files)}
          >
            <div className={styles.info}>
              <ClearIcon width={52} height={52} />
              <div className={styles.description}>{t("DESCRIPTION")}</div>
              <p className={styles.limits}>{limitsFullText}</p>
            </div>
          </FileDrop>
          <input
              ref={ref}
              accept={extensions.length ? extensions.join(', ') : 'image/*'}
              type="file"
              onChange={event => handleAddFiles(event.target.files)}
              className={styles.input}
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
  );
};

const ImageUploadWrapper = forwardRef(ImageUpload);

export default ImageUploadWrapper;
