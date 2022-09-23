import React from "react";
import styles from "./SquareButton.module.scss";

const SquareButton = ({ title, style, onClick }) => {
  return (
    <button onPress={onClick} className={`${styles.container} ${style}`}>
      {title}
    </button>
  );
};

export default SquareButton;
