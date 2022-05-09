import React from "react";
import { inputTypes } from "../../constants/types/inputTypes";
import InputText from "../InputText/InputText";
import styles from "./MinMaxInputs.module.scss";

const MinMaxInputs = ({ onMinInput, onMaxInput, style }) => {
  return (
    <div className={`${styles.container} ${style || ""} `}>
      <div className={styles.inputContainer}>
        <InputText
          inputStyle={styles.input}
          inputType={inputTypes.NUMBERS}
          onInput={onMinInput}
          placeholder={"Мин"}
        />
      </div>
      <p className={styles.sign}>-</p>
      <div className={styles.inputContainer}>
        <InputText
          inputStyle={styles.input}
          inputType={inputTypes.NUMBERS}
          onInput={onMaxInput}
          placeholder={"Макс"}
        />
      </div>
    </div>
  );
};

export default MinMaxInputs;
