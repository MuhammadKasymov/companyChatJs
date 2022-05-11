import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { USER_DATA } from "../../constants/localStorageKeys";
import NavLinks from "./components/NavLinks/NavLinks";
import UserNameRow from "./components/UserNameRow/UserNameRow";

const NavBar = ({ onRedirect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selfDataStr = localStorage.getItem(USER_DATA);
  const selfData = JSON.parse(selfDataStr);
  const changeVisobility = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={isOpen ? styles.shadowIt : ""}>
      <div
        className={`${styles.container} ${isOpen && styles.openContainer}`}
        onClick={changeVisobility}
      >
        <UserNameRow selfData={selfData} isOpen={isOpen} />
        <NavLinks onRedirect={onRedirect} />
      </div>
    </div>
  );
};

export default NavBar;
