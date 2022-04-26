import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { USER_DATA } from "../../constants/localStorageKeys";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selfDataStr = localStorage.getItem(USER_DATA);
  const selfData = JSON.parse(selfDataStr);
  const changeVisobility = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.container} onClick={changeVisobility}>
      <div className={styles.ico}>{selfData.login?.charAt(0)}</div>
      <p className={styles.userNameText}>
        {`${selfData?.firstName} ${selfData?.secondName}`}
      </p>
      {isOpen && <p className={`${styles.arrow} ${styles.arrowDown}`}>&#8964;</p>}
      {!isOpen && <p className={`${styles.arrow} ${styles.arrowTop}`}>&#8963;</p>}
    </div>
  );
};

export default NavBar;
