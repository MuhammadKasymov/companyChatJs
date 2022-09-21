import React, { useEffect, useState } from "react";
import { getMaskedInput } from "../../common/inputMasks";
import styles from "./InputText.module.scss";
import { inputTypes } from "../../constants/types/inputTypes";
import AttentionIcon from "../AttentionIcon/AttentionIcon";

const InputText = ({
  intialValue,
  onInput,
  placeholder,
  errorText,
  maxLength,
  inputType,
  onKeyUp,
  inputStyle,
}) => {
  const [isChoosed, setIsChoosed] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const [value, setValue] = useState("");

  const setInitialValue = () => {
    intialValue && setValue(intialValue);
    intialValue && setIsTyped(true);
  };

  const getInputType = () =>
    inputType === inputTypes.PASSWORD ? inputTypes.PASSWORD : "";

  useEffect(setInitialValue, [intialValue]);

  const onInputText = (txt) => {
    const value = getMaskedInput(txt.target.value, inputType);
    const trimmedValue = value.trim();
    !isTyped && setIsTyped(true);
    onInput && onInput(trimmedValue);
    setValue(value);
  };

  const onClick = () => setIsChoosed(true);
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
        className={`${styles.inputText} ${inputStyle || ""}`}
      ></input>
      {isUnreadedInd() && <div className={styles.unreadIndicator} />}
      {isChoosedInd() && <div className={styles.choosedIndicator} />}
      {isSuccessInd() && <div className={styles.successIndicator} />}
      {errorText && <div className={styles.errorIndicator} />}
      {errorText && (
        <AttentionIcon
          style={styles.errorIndicatorIcon}
          hoverText={errorText}
        />
      )}
    </div>
  );
};

export default InputText;
