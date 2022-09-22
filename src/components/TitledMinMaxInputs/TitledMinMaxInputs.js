import React from "react";
import MinMaxInputs from "../MinMaxInputs/MinMaxInputs";
import styles from "./TitledMinMaxInputs.module.scss";

const TitledMinMaxInputs = ({
  maxValue,
  minValue,
  onTypingMin,
  onTypingMax,
}) => (
  <div className={styles.container}>
    <h2 className={styles.headerText}>Возраст</h2>
    <MinMaxInputs
      maxValue={maxValue}
      minValue={minValue}
      onMinInput={onTypingMin}
      onMaxInput={onTypingMax}
    />
  </div>
);

export default TitledMinMaxInputs;
