import React from "react";
import styles from "./InputWithHeader.module.scss";
import InputText from "../InputText/InputText";

const InputWithHeader = (props) => {
  return (
    <div className={`${styles.container} ${props.style || ""}`}>
      <h2 className={styles.headerTxt}>{props.header}</h2>
      <InputText onInput={props.onInput} placeholder={props.placeholder || ""} />
    </div>
  );
};

export default InputWithHeader;
