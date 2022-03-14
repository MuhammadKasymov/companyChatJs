import React, { useState } from "react";
import styles from "./TextInput.module.scss";
import { isEnterPressed } from "../../common/handlerEvents";
import { isEmpty } from "../../common/utils";

const TextInput = ({ sendMsg }) => {
  const [inpValue, setInpValue] = useState("");

  const handlerEvents = (ev) => {
    const isEnter = isEnterPressed(ev);
    isEnter && sendCheckedMsg(inpValue);
  };
  const handleChange = (ev) => {
    setInpValue(ev.target.value);
  };
  const sendCheckedMsg = () => {
    const trimmedValue = inpValue.trim();
    isEmpty(trimmedValue) && sendMsg(inpValue);
  };

  return (
    <div className={styles.сontiner}>
      <textarea
        onKeyPress={handlerEvents}
        className={styles.textInput}
        rows={3}
        value={inpValue}
        onChange={handleChange}
      />
      <button className={styles.btn} onClick={sendCheckedMsg}>
        S
      </button>
    </div>
  );
};

export default TextInput;
