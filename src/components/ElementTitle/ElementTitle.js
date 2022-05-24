import React from "react";
import styles from "./ElementTitle.module.scss";

const ElementTitle = ({ text, isLeftSite, isShow }) => {
  const siteClass = isLeftSite ? styles.leftShow : styles.rightShow;
  return (
    <>
      {isShow && <p className={`${styles.container} ${siteClass}`}>{text}</p>}{" "}
    </>
  );
};

export default ElementTitle;
