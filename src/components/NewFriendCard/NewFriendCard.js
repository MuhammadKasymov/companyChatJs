import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserImage from "../UserImage/UserImage";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import styles from "./NewFriendCard.module.scss";
import { inviteFriend } from "../../controllers/friendsController.js";

const NewFriendLine = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const { login, srcImage } = data;
  const selfId = useSelector((state) => state.auth?.id);

  const changeOpenState = () => setIsOpen(!isOpen);
  const sendInvite = async () => {
    if (!isSend) {
      const friendId = data.id;
      const isSuccess = await inviteFriend(selfId, friendId);
      isSuccess && setIsSend(true);
    }
  };

  return (
    <div className={styles.container}>
      <UserImage login={login} srcImage={srcImage} />
      <div
        className={`${styles.actionContainer} ${
          isOpen && styles.openActionContainer
        }`}
      >
        <UserInfoCard userData={data} isOpen={isOpen} />
        <div className={styles.btnsContainer}>
          <button
            onClick={sendInvite}
            title="Добавить в друзья"
            className={`${styles.addToFriendsBtn} 
                ${isSend && styles.invitedBtn}`}
          >
            {isSend ? "✓" : "+"}
          </button>
          <button onClick={changeOpenState} title="Показать больше">
            <p className={isOpen ? styles.arrowDown : styles.arrowTop}>
              {isOpen ? "⌄" : "⌃"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFriendLine;
