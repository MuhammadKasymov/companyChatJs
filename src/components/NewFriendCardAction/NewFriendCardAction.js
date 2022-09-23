import React, { useState } from "react";
import { useSelector } from "react-redux";
import { inviteFriend } from "../../controllers/friendsController";
import CheckMarkButton from "../CheckMarkButton/CheckMarkButton";
import UpDownButton from "../UpDownButton/UpDownButton";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import styles from "./NewFriendCardAction.module.scss";

const NewFriendCardAction = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const selfId = useSelector((state) => state.auth?.id);

  const toggleOpenState = () => setIsOpen(!isOpen);
  const sendInvite = async () => {
    if (!isSend) {
      const friendId = data.id;
      const isSuccess = await inviteFriend(selfId, friendId);
      isSuccess && setIsSend(true);
    }
  };

  const containerStyles = `${styles.actionContainer}
                          ${isOpen && styles.openActionContainer}`;

  return (
    <div className={containerStyles}>
      <UserInfoCard userData={data} isOpen={isOpen} />
      <div className={styles.btnsContainer}>
        <CheckMarkButton isMarked={isSend} onPress={sendInvite} />
        <UpDownButton
          onPress={toggleOpenState}
          isOpen={isOpen}
          title="Показать больше"
        />
      </div>
    </div>
  );
};

export default NewFriendCardAction;
