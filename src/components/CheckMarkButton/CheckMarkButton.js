import React from "react";
import styles from "./CheckMarkButton.module.scss";

const CheckMarkButton = ({ isMarked, onPress }) => (
  <button
    onClick={onPress}
    title="Добавить в друзья"
    className={`${styles.container} 
    ${isMarked && styles.markedBtn}`}
  >
    {isMarked ? "✓" : "+"}
  </button>
);

export default CheckMarkButton;
