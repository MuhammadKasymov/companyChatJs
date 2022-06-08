import React from "react";
import styles from "./DateDelay.module.scss";
import { getDateDelayText, getDelayDateType } from "../../common/time";

function DateDelay({ milliseconds }) {
  const delayType = getDelayDateType(milliseconds);
  const dateTxt = getDateDelayText(milliseconds, delayType);
  return (
    <span className={styles.container}>
      <p className={styles.textDate}>{dateTxt}</p>
    </span>
  );
}

export default DateDelay;
