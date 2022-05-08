import React from "react";
import styles from "./UserInfoCard.module.scss";

const UserInfoCard = ({ userData, isOpen }) => {
  const { firstName, secondName, birthday, login } = userData;
  const age = birthday || 1;
  return (
    <div className={`${styles.container} ${isOpen && styles.openContainer}`}>
      <p className={`${styles.infoText} ${isOpen && styles.openLogin}`}>
        {login}
      </p>
      {isOpen && (
        <div className={styles.allInfoContainer}>
          <h2>Имя</h2>
          <p className={styles.infoText}>{firstName}</p>
          <h2>Фамилия</h2>
          <p className={styles.infoText}>{secondName}</p>
          <h2>Дата рождения</h2>
          <p className={styles.infoText}>{age}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;
