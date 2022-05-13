import React, { useState } from "react";
import styles from "./NotificationRows.module.scss";
import FriendNotificationRow from "../FriendNotificationRow/FriendNotificationRow";
import HorizontalRule from "../HorizontalRule/HorizontalRule";

function NotificationRows({ data, setIsNotif, isOpen }) {
  const [deletedItems, setDeletedItems] = useState([]);

  const closeNotif = () => setIsNotif(false);
  const deleteEl = (indEl) => setDeletedItems([...deletedItems, indEl]);
  const isNotif = () => data[0] && data.length >= deletedItems.length;

  return (
    <div className={styles.container}>
      {isNotif() &&
        data.map((el, index) => {
          const isDeleted = deletedItems.includes(index);
          const deleteMe = () => deleteEl(index);
          return (
            <div key={el.id}>
              {!isDeleted && <HorizontalRule />}
              {!isDeleted && (
                <FriendNotificationRow deleteMe={deleteMe} data={el} />
              )}
            </div>
          );
        })}
      <HorizontalRule />
      {!isNotif() && (
        <h1 className={styles.emptyNotifText}>Пустой список уведомлений</h1>
      )}

      <button
        onClick={closeNotif}
        className={`${styles.goToMenu} ${isOpen ? styles.goToMenuOpen : ""} `}
      >
        <p>❰</p>
        <p>Меню</p>
      </button>
    </div>
  );
}

export default NotificationRows;
