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
  inputStyle,
}) => {
  return (
    <div className={`${style || ""} ${styles.container}`}>
      <h2 className={styles.headerTxt}>{headerText}</h2>
      <InputText
        intialValue={intialValue}
        inputType={inputType}
        errorText={errorText}
        onInput={onInput}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        maxLength={maxLength}
        inputStyle={inputStyle || ''}
      />
    </div>
  );
};

export default InputWithHeader;
