import React from "react";
import styles from "./UserNameRow.module.scss";

const UserNameRow = ({ selfData, isOpen, changeVisibility, notifLength }) => {
  const getMaxedNotif = () => (notifLength > 99 ? "99+" : notifLength);

  return (
    <div className={styles.container} onClick={changeVisibility}>
      <div className={styles.ico}>
        <p className={styles.icoText}>{selfData.login?.charAt(0)} </p>
        {notifLength > 0 && (
          <span className={styles.notifLength}>
            <p>{getMaxedNotif()}</p>{" "}
          </span>
        )}
      </div>

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
  );
};

export default UserNameRow;
