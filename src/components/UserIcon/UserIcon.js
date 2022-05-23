import React, { useCallback, useEffect, useState } from "react";
import styles from "./UserIcon.module.scss";
import { getImageById } from "../../controllers/files";
import { useIsMounted } from "../../common/hooks";
import UserInfoModal from "../UserInfoModal/UserInfoModal";

const UserIcon = ({ userData, setData, showModal }) => {
  const [isChoosed, setIsChoosed] = useState(false);
  const [userImg, setUserImage] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isMounted = useIsMounted();
  let showTimeOut = null;
  const firstLetter = userData.login?.charAt(0)?.toUpperCase();
  const updateNotif = useCallback(async () => {
    if (userData.imageId != null) {
      const imgData = await getImageById(userData.imageId);
      isMounted.current && setUserImage(imgData?.image);
    }
  }, [isMounted, userData.imageId]);

  useEffect(updateNotif, [updateNotif]);

  const onClickEv = () => {
    if (setData) {
      mouseLeaved();
      setIsChoosed((prevState) => !prevState);
      setData(userData, isChoosed);
    }
  };
  const mouseOvered = () => {
    if (showModal) {
      showTimeOut && clearTimeout(showTimeOut);
      showTimeOut = setTimeout(() => setIsMouseOver(true), 600);
    }
  };
  const mouseLeaved = () => {
    if (showModal) {
      showTimeOut && clearTimeout(showTimeOut);
      isMouseOver && setIsMouseOver(false);
    }
  };

  return (
    <button
      onClick={onClickEv}
      onMouseEnter={mouseOvered}
      onMouseLeave={mouseLeaved}
      className={`${styles.container} ${isChoosed ? styles.border : ""}`}
    >
      {userImg === null ? (
        <div className={styles.img}>{firstLetter}</div>
      ) : (
        <img
          src={userImg}
          className={`${styles.img} ${isChoosed ? styles.imgBorder : ""}`}
          alt={"Иконка"}
        />
      )}
      <UserInfoModal isShow={isMouseOver} userData={userData} />
    </button>
  );
};

export default UserIcon;
