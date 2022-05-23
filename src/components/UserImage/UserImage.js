import React, { useCallback, useEffect, useState } from "react";
import { useIsMounted } from "../../common/hooks";
import styles from "./UserImage.module.scss";
import { getImageById } from "../../controllers/files";

const UserImage = ({ login, imageId }) => {
  const [image, setImage] = useState(null);
  const isMounted = useIsMounted();

  const uploadImg = useCallback(async () => {
    if (imageId != null) {
      const imgData = await getImageById(imageId);
      isMounted.current && setImage(imgData?.image);
    }
  }, [imageId, isMounted]);

  useEffect(uploadImg, [uploadImg]);

  const textIco = login?.charAt(0).toUpperCase();
  return (
    <div className={styles.container}>
      {image ? (
        <img className={styles.img} alt={"Аватарка"} src={image} />
      ) : (
        <p className={styles.textImg}>{textIco}</p>
      )}
    </div>
  );
};

export default UserImage;
