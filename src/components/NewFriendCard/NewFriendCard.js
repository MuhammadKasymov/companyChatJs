import React from "react";
import UserImage from "../UserImage/UserImage";
import NewFriendCardAction from "../NewFriendCardAction/NewFriendCardAction";
import styles from "./NewFriendCard.module.scss";

const NewFriendCard = ({ data }) => {
  const { login, imageId } = data;

  return (
    <div className={styles.container}>
      <UserImage login={login} srcImage={imageId} />
      <NewFriendCardAction data={data} />
    </div>
  );
};

export default NewFriendCard;
