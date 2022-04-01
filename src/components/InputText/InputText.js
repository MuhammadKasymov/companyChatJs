import React, { useState } from "react";
import styles from "./InputText.module.scss";

//Todo: расписать пропсы
const InputText = (props) => {
  const [isChoosed, setIsChoosed] = useState(false);
  const onInput = (txt) => {
    console.log(txt.target.value);
  };
  const onClick = () => setIsChoosed(true);
  const onBlur = () => setIsChoosed(false);
  return (
    <div className={`${styles.container} ${isChoosed && styles.choosedInput}`}>
      <input
        placeholder={props.placeholder || "Введите текст..."}
        onClick={onClick}
        onInput={onInput}
        onBlur={onBlur}
        className={styles.inputText}
        type={props.type || "text"}
      />
    </div>
  );
};

export default InputText;
