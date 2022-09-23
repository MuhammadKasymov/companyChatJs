import React, { useCallback, useEffect, useState } from "react";
import styles from "./FriendNotificationRow.module.scss";
import {
  getFriendData,
  acceptInviteFriend,
} from "../../controllers/friendsController";
import SquareButton from "../SquareButton/SquareButton";

const FriendNotificationRow = ({ data, deleteMe }) => {
  const [friendData, setFriendData] = useState({});
  const friendId = data.friendId;
  const notifId = data.id;

  const uploadFriendData = useCallback(async () => {
    const data = await getFriendData(friendId);
    setFriendData(data);
  }, [friendId]);

  const acceptInvite = async () => {
    const isSuccess = await acceptInviteFriend(notifId, true);
    isSuccess && deleteMe();
  };

  const rejectInvite = async () => {
    const isSuccess = await acceptInviteFriend(notifId, false);
    isSuccess && deleteMe();
  };

  useEffect(uploadFriendData, [uploadFriendData]);

  const getFriendName = () =>
    `${friendData.firstName || ""} ${friendData.secondName || ""}`;

  return (
    <div className={styles.container}>
      <p className={styles.info}>
        <b>{getFriendName()}</b> хочет с вами подружиться
      </p>

      <div className={styles.btnContainer}>
        <SquareButton
          onClick={acceptInvite}
          title={"✓"}
          style={styles.acceptBtn}
        />
        <SquareButton onClick={rejectInvite} title={"X"} />
      </div>
    </div>
  );
};

export default FriendNotificationRow;
