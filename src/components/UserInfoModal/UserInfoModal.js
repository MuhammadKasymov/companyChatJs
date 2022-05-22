import React from "react";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import styles from "./UserInfoModal.module.scss";

const UserInfoModal = ({ userData, isShow }) => {
  return (
    <div className={`${styles.container} ${isShow ? styles.showIt : ""}`}>
      {isShow && (
        <div className={styles.content}>
          <UserInfoCard userData={userData} isOpen={isShow} />
        </div>
      )}
    </div>
  );
};

export default UserInfoModal;
