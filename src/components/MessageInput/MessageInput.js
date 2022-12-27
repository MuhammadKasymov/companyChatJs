import React, { useState } from "react";
import styles from "./MessageInput.module.scss";
import { isEnterPressed } from "../../common/handlerEvents";
import { isEmpty } from "../../common/utils";
import Frame from "../Frame/Frame";
import { isMobile } from "../../constants/app";

const MessageInput = ({ sendMsg }) => {
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
    if (!isEmpty(trimmedValue)) {
      sendMsg(inpValue);
      setInpValue("");
    }
  };

  return (
    <Frame style={styles.сontainer}>
      <textarea
        onKeyPress={handlerEvents}
        className={styles.textInput}
        rows={isMobile ? 2 : 3}
        value={inpValue}
        onChange={handleChange}
      />
      <button className={styles.btn} onClick={sendCheckedMsg}>
        S
      </button>
    </Frame>
  );
};

export default MessageInput;
