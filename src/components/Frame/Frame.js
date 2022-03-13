import React from "react";
import styles from "./Frame.module.scss";



const Frame = ({ children, style }) => {
  const additionalStyle = style || "";
  return (
    <div className={`${styles.container} ${additionalStyle}`}>{children}</div>
  );
};
export default Frame;
