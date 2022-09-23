import React from "react";
import AttentionIcon from "../../AttentionIcon/AttentionIcon";
import styles from "../InputText.module.scss";

const StateIndicator = ({ errorText, isChoosed, isTyped }) => {
  const isUnreadedInd = () => !isChoosed && !errorText && !isTyped;
  const isChoosedInd = () => isChoosed && !errorText && !isTyped;
  const isSuccessInd = () => !errorText && isTyped;

  return (
    <>
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
    </>
  );
};

export default StateIndicator;
