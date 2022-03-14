import React, { useState } from "react";
import styles from "./TextInput.module.scss";
import { isEnterPressed } from "../../common/handlerEvents";

const TextInput = ({ sendMsg }) => {
  const [inpValue, setInpValue] = useState("");

  const handlerEvents = (ev) => {
    const isEnter = isEnterPressed(ev);
    isEnter && sendMsg(inpValue);
  };
  const handleChange = (ev) => {
    setInpValue(ev.target.value);
  };
  const handleBtnPress = () => sendMsg(inpValue);

  return (
    <div className={styles.сontiner}>
      <textarea
        onKeyPress={handlerEvents}
        className={styles.textInput}
        rows={3}
        value={inpValue}
        onChange={handleChange}
      />
      <button className={styles.btn} onClick={handleBtnPress}>
        S
      </button>
    </div>
  );
};

export default TextInput;
