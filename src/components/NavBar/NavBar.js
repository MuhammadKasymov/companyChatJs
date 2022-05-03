import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { USER_DATA } from "../../constants/localStorageKeys";
import { NavLink } from "react-router-dom";
import HorizontalRule from "../HorizontalRule/HorizontalRule";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selfDataStr = localStorage.getItem(USER_DATA);
  const selfData = JSON.parse(selfDataStr);
  const changeVisobility = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${styles.shadowContainer}  ${isOpen && styles.shadowIt}`}>
      <div
        className={`${styles.container} ${isOpen && styles.openContainer}`}
        onClick={changeVisobility}
      >
        <div className={styles.row}>
          <div className={styles.ico}>{selfData.login?.charAt(0)}</div>
          <p className={styles.userNameText}>
            {`${selfData?.firstName} ${selfData?.secondName}`}
          </p>
          <p
            className={`${styles.arrow} 
          ${isOpen ? styles.arrowTop : styles.arrowDown}`}
          >
            {isOpen ? "⌃" : "⌄"}
          </p>
        </div>
        <HorizontalRule />
        <NavLink className={styles.navRow} to="/profile">
          <p className={styles.userNameText}>Профиль</p>
        </NavLink>
        <HorizontalRule />
        <NavLink className={styles.navRow} to="/friends">
          <p className={styles.userNameText}>Друзья</p>
        </NavLink>
        <HorizontalRule />
        <NavLink className={styles.navRow} to="/newChat">
          <p className={styles.userNameText}>Новый чат</p>
        </NavLink>
        <HorizontalRule />
        <NavLink className={styles.navRow} to="/settings">
          <p className={styles.userNameText}>Настройки</p>
        </NavLink>
        <HorizontalRule />
      </div>
    </div>
  );
};

export default NavBar;
