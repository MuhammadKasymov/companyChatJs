import React from "react";
import styles from "./UserNameRow.module.scss";

const UserNameRow = ({ selfData, isOpen }) => {
  return (
    <div className={styles.container}>
      <div className={styles.ico}>{selfData.login?.charAt(0)}</div>
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
