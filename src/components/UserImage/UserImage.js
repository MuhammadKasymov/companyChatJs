import React from "react";
import styles from "./UserImage.module.scss";

const UserImage = ({ login, srcImage }) => {
  const textIco = login?.charAt(0).toUpperCase();
  return (
    <div className={styles.container}>
      {srcImage ? (
        <img className={styles.img} alt={"Аватарка"} src={srcImage} />
      ) : (
        <p className={styles.textImg}>{textIco}</p>
      )}
    </div>
  );
};

export default UserImage;
