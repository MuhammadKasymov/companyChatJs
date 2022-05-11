import React from "react";
import styles from "./FriendsCards.module.scss";
import FriendCard from "../FriendCard/FriendCard";
import Frame from "../Frame/Frame";

const FriendsCards = ({ friendsData }) => {
  return (
    <Frame style={styles.container} headerText={"Друзья"}>
      <div className={styles.content}>
        {friendsData.map((friendData) => (
          <FriendCard key={friendData.id} friendData={friendData} />
        ))}
      </div>
    </Frame>
  );
};

export default FriendsCards;
