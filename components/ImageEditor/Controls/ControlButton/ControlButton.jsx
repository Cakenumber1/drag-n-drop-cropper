import React from 'react';

import styles from './styles.module.scss';

const ControlButton = ({children, disabled, onClick}) => {
    return (
        <button className={styles.controlButton} type="button" disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default ControlButton;
