import React, { useState, useEffect, useCallback } from "react";
import styles from "./NavBar.module.scss";
import { USER_DATA } from "../../constants/localStorageKeys";
import NavLinks from "./components/NavLinks/NavLinks";
import UserNameRow from "./components/UserNameRow/UserNameRow";
import { getAllNotificationsData } from "../../controllers/notificationController";
import NotificationRows from "../NotificationRows/NotificationRows";
import { useIsMounted } from "../../common/hooks";

const NavBar = ({ onRedirect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotif, setIsNotif] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const isMounted = useIsMounted();

  const selfDataStr = localStorage.getItem(USER_DATA);
  const selfData = JSON.parse(selfDataStr);

  const changeVisibility = () => setIsOpen(!isOpen);
  const getNotificationsLength = () => notificationData.length;
  const withRedirect = () => {
    onRedirect && onRedirect();
    changeVisibility();
  };
  const updateNotif = useCallback(async () => {
    const notifData = await getAllNotificationsData(selfData.id);
    isMounted.current && setNotificationData(() => notifData);
    setTimeout(updateNotif, 5000);
  }, [isMounted, selfData.id]);

  useEffect(updateNotif, [updateNotif]);

  return (
    <div className={isOpen ? styles.shadowIt : ""}>
      <div className={`${styles.container} ${isOpen && styles.openContainer}`}>
        <UserNameRow
          changeVisibility={changeVisibility}
          notifLength={getNotificationsLength()}
          selfData={selfData}
          isOpen={isOpen}
        />
        <div className={styles.content}>
          {isNotif ? (
            <NotificationRows
              setIsNotif={setIsNotif}
              data={notificationData}
              isOpen={isOpen}
            />
          ) : (
            <NavLinks setIsNotif={setIsNotif} onRedirect={withRedirect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
