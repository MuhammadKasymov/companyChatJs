import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ActionsButtons.module.scss";
import { registrationRoute } from "../../../constants/routePath";

const ActionsButtons = ({ confirmData }) => {
  const navigate = useNavigate();
  const goToRegistration = () => navigate(registrationRoute);

  return (
    <div className={styles.btnContainer}>
      <button onClick={goToRegistration} className={styles.regBtn}>
        Регистрация
      </button>
      <button className={styles.authBtn} onClick={confirmData}>
        Применить
      </button>
    </div>
  );
};

export default ActionsButtons;
