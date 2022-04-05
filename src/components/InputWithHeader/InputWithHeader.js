import React from "react";
import styles from "./InputWithHeader.module.scss";
import InputText from "../InputText/InputText";

const InputWithHeader = ({
  style,
  headerText,
  placeholder,
  onInput,
  errorText,
  inputType,
}) => {
  return (
    <div className={`${styles.container} ${style || ""}`}>
      <h2 className={styles.headerTxt}>{headerText}</h2>
      <InputText
        inputType={inputType}
        errorText={errorText}
        onInput={onInput}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputWithHeader;
