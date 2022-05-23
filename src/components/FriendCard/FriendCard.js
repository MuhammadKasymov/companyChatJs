import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "../UserImage/UserImage";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import styles from "./FriendCard.module.scss";
import { chatRouteNoId } from "../../constants/routePath";
import { getPrivateChatId } from "../../controllers/chatController";
import { useSelector } from "react-redux";

const FriendCard = ({ friendData }) => {
  const selfId = useSelector((state) => state.auth.id);
  const friendId = friendData.id;
  const { login, imageId } = friendData;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const changeOpenState = () => setIsOpen(!isOpen);
  const goToChat = async () => {
    const chatId = await getPrivateChatId(selfId, friendId);
    navigate(chatRouteNoId + chatId);
  };

  return (
    <div className={styles.container}>
      <UserImage login={login} imageId={imageId} />
      <div
        className={`${styles.actionContainer} ${
          isOpen && styles.openActionContainer
        }`}
      >
        <UserInfoCard userData={friendData} isOpen={isOpen} />
        <div className={styles.btnsContainer}>
          <button onClick={goToChat} title="Открыть чат">
            <p className={styles.chatBtnText}>C</p>
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

export default FriendCard;
