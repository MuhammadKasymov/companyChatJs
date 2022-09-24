import React from "react";
import styles from "./RemoveButton.module.scss";

const RemoveButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.removeImage}>
    <span />
    <span />
  </button>
);

export default RemoveButton;
