import React from "react";
import styles from "./VerticalImage.module.scss";

const VerticalImage = ({ src, alt, style, removeImage }) => {
  return (
    <div className={`${styles.container} ${style || ""}`}>
      {removeImage && (
        <button onClick={removeImage} className={styles.removeImage}>
          <span />
          <span />
        </button>
      )}
      <img className={styles.img} src={src} alt={alt || "verical image"} />
    </div>
  );
};

export default VerticalImage;
