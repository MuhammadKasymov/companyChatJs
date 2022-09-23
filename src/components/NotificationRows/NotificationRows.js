import React, { useState } from "react";
import styles from "./NotificationRows.module.scss";
import HorizontalRule from "../HorizontalRule/HorizontalRule";
import FriendNotificationsList from "./components/FriendNotificationsList";
import GoMenuButton from "./components/GoMenuButton";

function NotificationRows({ data, setIsNotif, isOpen }) {
  const [deletedItems, setDeletedItems] = useState([]);

  const closeNotif = () => setIsNotif(false);
  const deleteEl = (indEl) => setDeletedItems([...deletedItems, indEl]);
  const isNotif = () => data[0] && data.length >= deletedItems.length;

  return (
    <div className={styles.container}>
      {isNotif() && (
        <FriendNotificationsList
          data={data}
          deletedItems={deletedItems}
          deleteEl={deleteEl}
        />
      )}
      <HorizontalRule />
      {!isNotif() && (
        <h1 className={styles.emptyNotifText}>Пустой список уведомлений</h1>
      )}
      <GoMenuButton closeNotif={closeNotif} isOpen={isOpen} />
    </div>
  );
}

export default NotificationRows;
