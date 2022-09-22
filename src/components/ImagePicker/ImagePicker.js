import React, { useRef } from "react";
import PlusIcon from "../PlusIcon/PlusIcon";
import styles from "./ImagePicker.module.scss";

const ImagePicker = ({ setImage, isDisable, style }) => {
  let inputRef = useRef();
  const openExplorer = () => !isDisable && inputRef.click();
  const setImg = (current) => setImage && setImage(current.target?.files[0]);

  return (
    <button
      onClick={openExplorer}
      className={`${styles.container} ${style || ""}`}
    >
      {!isDisable && <PlusIcon />}
      <input
        ref={(inp) => (inputRef = inp)}
        className={styles.selectImage}
        type={"file"}
        accept={"image/*"}
        onChange={setImg}
      />
      <p className={styles.fillText}>?</p>
    </button>
  );
};

export default ImagePicker;
