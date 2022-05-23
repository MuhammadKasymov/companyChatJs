import React from "react";
import styles from "./UserIconList.module.scss";
import UserIcon from "../UserIcon/UserIcon";

const UserIconList = ({
  usersList,
  style,
  headerTxt,
  setData,
  emptyText,
  errorText,
}) => {
  const isShowUsers = usersList[0] && !errorText;
  const isShowEmptyText = !usersList[0] && !errorText;

  return (
    <div className={`${styles.container} ${style || ""}`}>
      <h1 className={styles.headerTxt}>{headerTxt || "Заголовок списка"}</h1>
      <div className={`${styles.content}`}>
        {isShowUsers && (
          <div className={styles.users}>
            {usersList.map((el) => (
              <UserIcon
                key={el.id}
                userData={el}
                setData={setData}
                showModal={true}
              />
            ))}
          </div>
        )}
        {isShowEmptyText && (
          <h2 className={styles.emptyText}>{emptyText || "Пустой список"}</h2>
        )}
        {errorText && (
          <h2 className={styles.errText}>{errorText}</h2>
        )}
      </div>
    </div>
  );
};

export default UserIconList;
