import React from "react";
import styles from "./InputWithHeader.module.scss";
import InputText from "../InputText/InputText";

const InputWithHeader = ({
  intialValue,
  style,
  headerText,
  placeholder,
  onInput,
  onKeyUp,
  errorText,
  inputType,
  maxLength,
}) => {
  return (
    <div className={`${styles.container} ${style || ""}`}>
      <h2 className={styles.headerTxt}>{headerText}</h2>
      <InputText
        intialValue={intialValue}
        inputType={inputType}
        errorText={errorText}
        onInput={onInput}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
};

export default InputWithHeader;
