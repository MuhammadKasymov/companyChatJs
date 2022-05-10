import React from "react";
import styles from "./ComponentHeader.module.scss";

const ComponentHeader = ({ header, style }) => {
  return (
    <div className={`${styles.container} ${style || ""}`}>
      <h1 className={styles.headerText}>{header}</h1>
    </div>
  );
};

export default ComponentHeader;
