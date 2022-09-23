import React from "react";
import FriendCardAction from "../FriendCardAction/FriendCardAction";
import UserImage from "../UserImage/UserImage";
import styles from "./FriendCard.module.scss";

const FriendCard = ({ friendData }) => {
  const { login, imageId } = friendData;

  return (
    <div className={styles.container}>
      <UserImage login={login} imageId={imageId} />
      <FriendCardAction friendData={friendData} />
    </div>
  );
};

export default FriendCard;
