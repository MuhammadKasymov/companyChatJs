import React from "react";
import styles from "./AttentionIcon.module.scss";

const AttentionIcon = ({ hoverText, style }) => {
  const attensionStyles = `${styles.attention} ${style}`;

  return (
    <span className={attensionStyles} data-hover={hoverText}>
      !
    </span>
  );
};

export default AttentionIcon;
