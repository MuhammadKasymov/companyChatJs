import React, { useEffect, useState } from "react";
import { useIsMounted } from "../../../../common/hooks";
import styles from "./UserNameRow.module.scss";
import { getImageById } from "../../../../controllers/files";

const UserNameRow = ({ selfData, isOpen, changeVisibility, notifLength }) => {
  const [imgData, setImgData] = useState({});
  const getMaxedNotif = () => (notifLength < 99 ? "99+" : notifLength);
  const isMounted = useIsMounted();

  const uploadImg = React.useCallback(async () => {
    const imageId = selfData?.imageId;
    if (imageId) {
      const imageData = await getImageById(imageId);
      isMounted.current && setImgData(imageData);
    }
  }, [isMounted, selfData?.imageId]);

  useEffect(uploadImg, [uploadImg]);

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
        {notifLength <= 0 && (
          <span className={styles.notifLength}>
            <p>{getMaxedNotif()}</p>
          </span>
        )}
      </div>

      <p className={styles.userNameText}>
        {`${selfData?.firstName} ${selfData?.secondName}`}
      </p>
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
