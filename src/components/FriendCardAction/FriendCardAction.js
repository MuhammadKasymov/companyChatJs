import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { chatRouteNoId } from "../../constants/routePath";
import { getPrivateChatId } from "../../controllers/chatController";
import OpenChatButton from "../OpenChatButton/OpenChatButton";
import UpDownButton from "../UpDownButton/UpDownButton";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import styles from "./FriendCardAction.module.scss";

const FriendCardAction = ({ friendData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selfId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  const friendId = friendData.id;

  const toggleOpenState = () => setIsOpen(!isOpen);
  const goToChat = async () => {
    const chatId = await getPrivateChatId(selfId, friendId);
    navigate(chatRouteNoId + chatId);
  };

  return (
    <div className={`${styles.сontainer} ${isOpen && styles.openContainer}`}>
      <UserInfoCard userData={friendData} isOpen={isOpen} />
      <div className={styles.btnsContainer}>
        <OpenChatButton onClick={goToChat} />
        <UpDownButton
          isOpen={isOpen}
          onPress={toggleOpenState}
          title={"Показать больше информации"}
        />
      </div>
    </div>
  );
};

export default FriendCardAction;
