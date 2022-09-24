import React from "react";
import styles from "../UserInfoCard.module.scss";

const UserAllInfo = ({userData}) => {
  const { firstName, secondName, birthday } = userData;
  const age = birthday || 1;
  return (
    <div className={styles.allInfoContainer}>
      <h2>Имя</h2>
      <p className={styles.infoText}>{firstName}</p>
      <h2>Фамилия</h2>
      <p className={styles.infoText}>{secondName}</p>
      <h2>Дата рождения</h2>
      <p className={styles.infoText}>{age}</p>
    </div>
  );
};

export default UserAllInfo;
