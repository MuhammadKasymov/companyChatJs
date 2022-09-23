import React from "react";
import FriendNotificationRow from "../../FriendNotificationRow/FriendNotificationRow";
import HorizontalRule from "../../HorizontalRule/HorizontalRule";

const FriendNotificationsList = ({ data, deletedItems, deleteEl }) => {
  const friendsList = [];

  for (let i = 0; i <= data; i++) {
    const isDeleted = deletedItems.includes(i);
    const deleteMe = () => deleteEl(i);

    const friendNotification = (
      <div key={data[i].id}>
        <HorizontalRule />
        <FriendNotificationRow deleteMe={deleteMe} data={data[i]} />
      </div>
    );

    !isDeleted && friendsList.push(friendNotification);
  }

  return friendsList;
};

export default FriendNotificationsList;
