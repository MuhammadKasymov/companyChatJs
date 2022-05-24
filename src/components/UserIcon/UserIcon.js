import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./UserIcon.module.scss";
import { getImageById } from "../../controllers/files";
import { useIsMounted } from "../../common/hooks";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import ElementTitle from "../ElementTitle/ElementTitle";

const UserIcon = ({ userData, setData, showModal, titleData }) => {
  const [isChoosed, setIsChoosed] = useState(false);
  const [userImg, setUserImage] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isMounted = useIsMounted();
  const containerRef = useRef();
  let showTimeOut = null;
  const firstLetter = userData.login?.charAt(0)?.toUpperCase();

  const uploadImg = useCallback(async () => {
    if (userData.imageData) {
      isMounted.current && setUserImage(userData.imageData.smallImage);
    } else if (userData.imageId != null) {
      const imgData = await getImageById(userData.imageId);
      isMounted.current && setUserImage(imgData?.smallImage);
    }
  }, [isMounted, userData.imageData, userData.imageId]);

  useEffect(uploadImg, [uploadImg]);

  const onClickEv = () => {
    if (setData) {
      mouseLeaved();
      setIsChoosed((prevState) => !prevState);
      setData(userData, isChoosed);
    }
  };
  const mouseOvered = () => {
    if (showModal || titleData?.text) {
      showTimeOut && clearTimeout(showTimeOut);
      showTimeOut = setTimeout(() => setIsMouseOver(true), 600);
    }
  };
  const mouseLeaved = () => {
    if (showModal || titleData?.text) {
      showTimeOut && clearTimeout(showTimeOut);
      isMouseOver && setIsMouseOver(false);
    }
  };

  return (
    <button
      onClick={onClickEv}
      onMouseEnter={mouseOvered}
      onMouseLeave={mouseLeaved}
      ref={containerRef}
      className={`${styles.container} ${isChoosed ? styles.border : ""}`}
    >
      {userImg === null ? (
        <div className={styles.img}>{firstLetter}</div>
      ) : (
        <img src={userImg} className={styles.img} alt={"Иконка"} />
      )}
      <ElementTitle
        isLeftSite={titleData?.isLeftSite}
        text={titleData?.text}
        isShow={isMouseOver && !showModal}
      />
      <UserInfoModal isShow={isMouseOver && showModal} userData={userData} />
    </button>
  );
};

export default UserIcon;
