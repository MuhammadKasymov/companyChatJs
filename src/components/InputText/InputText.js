import React, { useEffect, useState } from "react";
import { getMaskedInput } from "../../common/inputMasks";
import styles from "./InputText.module.scss";
import { inputTypes } from "../../constants/types/inputTypes";
import StateIndicator from "./components/StateIndicator";

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
      />
      <StateIndicator
        errorText={errorText}
        isChoosed={isChoosed}
        isTyped={isTyped}
      />
    </div>
  );
};

export default InputText;
