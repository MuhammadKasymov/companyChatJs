import React from "react";
import styles from "./NavLinks.module.scss";
import HorizontalRule from "../../../HorizontalRule/HorizontalRule";
import { NavLink } from "react-router-dom";
import {
  friendsRoute,
  profileRoute,
  newChatRoute,
  settingRoute,
  chatRouteNoId,
  authRoute,
} from "../../../../constants/routePath";
import { useSelector } from "react-redux";

const NavLinks = ({ onRedirect, setIsNotif }) => {
  const lastChatId = useSelector((state) => state.tempData.chatId);
  const lastChatRoute = chatRouteNoId + lastChatId;
  const goToNotifi = () => setIsNotif(true);
  const exit = () => localStorage.clear();
  return (
    <>
      <HorizontalRule />
      <NavLink onClick={onRedirect} className={styles.navRow} to={profileRoute}>
        <p className={styles.userNameText}>Профиль</p>
      </NavLink>
      <HorizontalRule />
      <NavLink
        onClick={onRedirect}
        className={styles.navRow}
        to={lastChatRoute}
      >
        <p className={styles.userNameText}>Сообщения</p>
      </NavLink>
      <HorizontalRule />
      <div onClick={goToNotifi} className={styles.navRow} to={settingRoute}>
        <p className={styles.userNameText}>Уведомления</p>
      </div>
      <HorizontalRule />
      <NavLink onClick={onRedirect} className={styles.navRow} to={friendsRoute}>
        <p className={styles.userNameText}>Друзья</p>
      </NavLink>
      <HorizontalRule />
      <NavLink onClick={onRedirect} className={styles.navRow} to={newChatRoute}>
        <p className={styles.userNameText}>Новый чат</p>
      </NavLink>
      <HorizontalRule />
      <NavLink onClick={exit} className={styles.navRow} to={authRoute}>
        <p className={styles.userNameText}>Выйти</p>
      </NavLink>
      <HorizontalRule />
    </>
  );
};

export default NavLinks;
