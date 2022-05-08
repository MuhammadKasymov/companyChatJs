import React from "react";
import styles from "./NewFriendCards.module.scss";
import Frame from "../Frame/Frame";
import NewFriendCard from "../NewFriendCard/NewFriendCard";

const NewFriendCards = ({ newFriendsData }) => {
  return (
    <Frame style={styles.container} headerText={"Поиск друзей"}>
      <div className={styles.content}>
        {newFriendsData.map((el) => (
          <NewFriendCard key={el.id.toString()} data={el} />
        ))}
      </div>
    </Frame>
  );
};

export default NewFriendCards;
