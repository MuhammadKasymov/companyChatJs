import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { USER_DATA } from "../../constants/localStorageKeys";
import { NavLink } from "react-router-dom";
import HorizontalRule from "../HorizontalRule/HorizontalRule";
import {
  friendsRoute,
  profileRoute,
  newChatRoute,
  settingRoute,
} from "../../constants/routePath";

const NavBar = ({ onRedirect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selfDataStr = localStorage.getItem(USER_DATA);
  const selfData = JSON.parse(selfDataStr);
  const changeVisobility = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={isOpen ? styles.shadowIt : ""}>
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
        <NavLink
          onClick={onRedirect}
          className={styles.navRow}
          to={profileRoute}
        >
          <p className={styles.userNameText}>Профиль</p>
        </NavLink>
        <HorizontalRule />
        <NavLink
          onClick={onRedirect}
          className={styles.navRow}
          to={friendsRoute}
        >
          <p className={styles.userNameText}>Друзья</p>
        </NavLink>
        <HorizontalRule />
        <NavLink
          onClick={onRedirect}
          className={styles.navRow}
          to={newChatRoute}
        >
          <p className={styles.userNameText}>Новый чат</p>
        </NavLink>
        <HorizontalRule />
        <NavLink
          onClick={onRedirect}
          className={styles.navRow}
          to={settingRoute}
        >
          <p className={styles.userNameText}>Настройки</p>
        </NavLink>
        <HorizontalRule />
      </div>
    </div>
  );
};

export default NavBar;
