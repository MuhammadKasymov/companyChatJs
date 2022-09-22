import React from "react";
import styles from "./ConfirmButton.module.scss";

const ConfirmButton = ({ text, onConfirm }) => (
  <button className={styles.confirmBtn} onClick={onConfirm}>
    {text || "Применить"}
  </button>
);

export default ConfirmButton;
