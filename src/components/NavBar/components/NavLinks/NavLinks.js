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
} from "../../../../constants/routePath";
import { useSelector } from "react-redux";

const NavLinks = ({ onRedirect }) => {
  const lastChatId = useSelector((state) => state.tempData.chatId);
  const lastChatRoute = chatRouteNoId + lastChatId;

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
      <NavLink onClick={onRedirect} className={styles.navRow} to={friendsRoute}>
        <p className={styles.userNameText}>Друзья</p>
      </NavLink>
      <HorizontalRule />
      <NavLink onClick={onRedirect} className={styles.navRow} to={newChatRoute}>
        <p className={styles.userNameText}>Новый чат</p>
      </NavLink>
      <HorizontalRule />
      <NavLink onClick={onRedirect} className={styles.navRow} to={settingRoute}>
        <p className={styles.userNameText}>Настройки</p>
      </NavLink>
      <HorizontalRule />
    </>
  );
};

export default NavLinks;
