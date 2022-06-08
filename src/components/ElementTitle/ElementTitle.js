import React from "react";
import styles from "./ElementTitle.module.scss";

const ElementTitle = ({ text, isShow }) => {
  return <>{isShow && <p className={styles.container}>{text}</p>}</>;
};

export default ElementTitle;
