import React from "react";
import styles from "./HorizontalRule.module.scss";

const HorizontalRule = ({ style }) => (
  <div className={`${styles.container} ${style || ""}`} />
);

export default HorizontalRule;
