import React from "react";
import UserIcon from "../../UserIcon/UserIcon";
import styles from "../UserIconList.module.scss";

const UserIcons = ({usersList, setData}) => (
  <div className={styles.users}>
    {usersList.map((el) => (
      <UserIcon key={el.id} userData={el} setData={setData} showModal={true} />
    ))}
  </div>
);

export default UserIcons;
