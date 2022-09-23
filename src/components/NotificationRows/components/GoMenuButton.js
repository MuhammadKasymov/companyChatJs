import React from "react";
import styles from "../NotificationRows.module.scss";

const GoMenuButton = ({ closeNotif, isOpen }) => (
  <button
    onClick={closeNotif}
    className={`${styles.goToMenu} ${isOpen && styles.goToMenuOpen}`}
  >
    <p>❰</p>
    <p>Меню</p>
  </button>
);

export default GoMenuButton;
