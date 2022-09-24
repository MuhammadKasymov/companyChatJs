import React from "react";
import RemoveButton from "../RemoveButton/RemoveButton";
import styles from "./VerticalImage.module.scss";

const VerticalImage = ({ src, alt, style, removeImage }) => {
  return (
    <div className={`${styles.container} ${style || ""}`}>
      {removeImage && <RemoveButton onClick={removeImage} />}
      <img className={styles.img} src={src} alt={alt || "verical image"} />
    </div>
  );
};

export default VerticalImage;
