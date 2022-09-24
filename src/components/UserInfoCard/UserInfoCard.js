import React from "react";
import styles from "./UserInfoCard.module.scss";
import UserAllInfo from "./components/UserAllInfo";

const UserInfoCard = ({ userData, isOpen }) => {
  const { login } = userData;
  return (
    <div className={`${styles.container} ${isOpen && styles.openContainer}`}>
      <p className={`${styles.infoText} ${isOpen && styles.openLogin}`}>
        {login}
      </p>
      {isOpen && <UserAllInfo userData={userData} />}
    </div>
  );
};

export default UserInfoCard;
