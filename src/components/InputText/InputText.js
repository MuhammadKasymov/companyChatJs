import React, { useState } from "react";
import { getMaskedInput } from "../../common/inputMasks";
import styles from "./InputText.module.scss";

const InputText = ({
  onInput,
  placeholder,
  errorText,
  maxLength,
  inputType,
}) => {
  const [isChoosed, setIsChoosed] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const [value, setValue] = useState("");

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

  return (
    <div className={`${styles.container} ${isChoosed && styles.choosedInput}`}>
      <input
        maxLength={maxLength || 24}
        placeholder={placeholder || "Введите текст..."}
        onClick={onClick}
        onInput={onInputText}
        onBlur={onBlur}
        value={value}
        className={styles.inputText}
      />
      {errorText && <p className={styles.errorText}>{errorText}</p>}
      {!isChoosed && !errorText && !isTyped && (
        <div className={styles.unreadIndicator} />
      )}
      {isChoosed && !errorText && !isTyped && (
        <div className={styles.choosedIndicator} />
      )}
      {!errorText && isTyped && <div className={styles.successIndicator} />}
      {errorText && <div className={styles.errorIndicator} />}
    </div>
  );
};

export default InputText;
