import React, { useState } from "react";
import { getMaskedInput } from "../../common/inputMasks";
import styles from "./InputText.module.scss";
import { inputTypes } from "../../constants/types/inputTypes";

const InputText = ({
  onInput,
  placeholder,
  errorText,
  maxLength,
  inputType,
  onKeyUp,
}) => {
  const [isChoosed, setIsChoosed] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const [value, setValue] = useState("");

  const getInputType = () =>
    inputType === inputTypes.PASSWORD ? inputTypes.PASSWORD : "";

  const onInputText = (txt) => {
    const value = getMaskedInput(txt.target.value, inputType);
    const trimmedValue = value.trim();
    !isTyped && setIsTyped(true);
    onInput(trimmedValue);
    setValue(value);
  };

  const onClick = () => {
    setIsChoosed(true);
  };
  const onBlur = () => setIsChoosed(false);
  const isUnreadedInd = () => !isChoosed && !errorText && !isTyped;
  const isChoosedInd = () => isChoosed && !errorText && !isTyped;
  const isSuccessInd = () => !errorText && isTyped;

  return (
    <div className={`${styles.container} ${isChoosed && styles.choosedInput}`}>
      <input
        maxLength={maxLength || 24}
        placeholder={placeholder || "Введите текст..."}
        onClick={onClick}
        onInput={onInputText}
        onBlur={onBlur}
        value={value}
        onKeyUp={onKeyUp}
        type={getInputType()}
        className={styles.inputText}
      />
      {errorText && <p className={styles.errorText}>{errorText}</p>}
      {isUnreadedInd() && <div className={styles.unreadIndicator} />}
      {isChoosedInd() && <div className={styles.choosedIndicator} />}
      {isSuccessInd() && <div className={styles.successIndicator} />}
      {errorText && <div className={styles.errorIndicator} />}
    </div>
  );
};

export default InputText;
