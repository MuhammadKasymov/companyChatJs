import React, { useState } from "react";
import styles from "./InputText.module.scss";

//Todo: расписать пропсы
const InputText = ({ onInput, placeholder, errorText }) => {
  const [isChoosed, setIsChoosed] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const onInputText = (txt) => {
    const value = txt.target.value;
    const trimmedValue = value.trim();
    !isTyped && setIsTyped(true);
    onInput(trimmedValue);
  };
  const onClick = () => {
    setIsChoosed(true);
  };
  const onBlur = () => setIsChoosed(false);
  return (
    <div className={`${styles.container} ${isChoosed && styles.choosedInput}`}>
      <input
        placeholder={placeholder || "Введите текст..."}
        onClick={onClick}
        onInput={onInputText}
        onBlur={onBlur}
        className={styles.inputText}
      />
      {errorText && <p className={styles.errorText}>Dummy error</p>}
      {!isChoosed && !errorText && !isTyped && (
        <div className={styles.unreadIndicator} />
      )}
      {isChoosed && !errorText && !isTyped && (
        <div className={styles.choosedIndicator} />
      )}
      {!errorText && isTyped && <div className={styles.successIndicator} />}
      {errorText && isTyped && <div className={styles.errorIndicator} />}
    </div>
  );
};

export default InputText;
