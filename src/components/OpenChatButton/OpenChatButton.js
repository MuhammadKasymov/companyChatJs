import React from "react";
import styles from "./OpenChatButton.module.scss";

const OpenChatButton = ({ onClick }) => (
  <button className={styles.chatBtn} onClick={onClick} title="Открыть чат">
    <p className={styles.chatBtnText}>C</p>
  </button>
);

export default OpenChatButton;
