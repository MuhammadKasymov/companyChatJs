import React, { useEffect, useState } from "react";
import { useIsMounted } from "../../../../common/hooks";
import styles from "./UserNameRow.module.scss";
import { getImageById } from "../../../../controllers/files";

const UserNameRow = ({ selfData, isOpen, changeVisibility, notifLength }) => {
  const [imgData, setImgData] = useState({});
  const isMounted = useIsMounted();

  const uploadImg = React.useCallback(async () => {
    const imageId = selfData?.imageId;
    if (imageId) {
      const imageData = await getImageById(imageId);
      isMounted.current && setImgData(imageData);
    }
  }, [isMounted, selfData?.imageId]);

  useEffect(uploadImg, [uploadImg]);

  const getMaxedNotif = () => (notifLength > 99 ? "99+" : notifLength);

  const getName = () => {
    const firstName = selfData?.firstName || "??";
    const secondName = selfData?.secondName || "??";
    const login = selfData?.login || "??";
    let name = `${firstName} ${secondName}`;
    if (name.length > 20) return login;
    return name
  };

  return (
    <div className={styles.container} onClick={changeVisibility}>
      <div className={styles.ico}>
        {!imgData.smallImage ? (
          <p className={styles.icoText}>{selfData.login?.charAt(0)} </p>
        ) : (
          <img
            className={styles.icoImg}
            src={imgData.smallImage}
            alt={"Пользовательская иконка"}
          />
        )}
        {notifLength > 0 && (
          <span className={styles.notifLength}>
            <p>{getMaxedNotif()}</p>
          </span>
        )}
      </div>

      <p className={styles.userNameText}>{getName()}</p>
      <p
        className={`${styles.arrow} 
          ${isOpen ? styles.arrowTop : styles.arrowDown}`}
      >
        {isOpen ? "⌃" : "⌄"}
      </p>
    </div>
  );
};

export default UserNameRow;
