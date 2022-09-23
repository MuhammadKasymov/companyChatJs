import React from "react";
import styles from "./UpDownButton.module.scss";

const UpDownButton = ({ onPress, isOpen, title }) => (
  <button onClick={onPress} title={title}>
    {isOpen && <p className={styles.arrowDown}>⌄</p>}
    {!isOpen && <p className={styles.arrowTop}>⌃</p>}
  </button>
);

export default UpDownButton;
