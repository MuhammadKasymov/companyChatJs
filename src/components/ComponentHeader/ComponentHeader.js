import React from "react";
import styles from "./ComponentHeader.module.scss";

const ComponentHeader = ({ header }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.headerText}>{header}</h1>
    </div>
  );
};

export default ComponentHeader;
