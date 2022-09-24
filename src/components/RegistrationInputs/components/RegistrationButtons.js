import React from "react";
import styles from "../RegistrationSelfInputs.module.scss";

const RegistrationButtons = ({ goToAuth, goNext }) => (
  <div className={styles.btnsContainer}>
    <button onClick={goToAuth} className={styles.whiteBtn}>
      Авторизоваться
    </button>
    <button onClick={goNext} className={styles.btn}>
      Применить
    </button>
  </div>
);

export default RegistrationButtons;
