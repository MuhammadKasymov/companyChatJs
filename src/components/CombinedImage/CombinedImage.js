import React from "react";
import ImagePicker from "../ImagePicker/ImagePicker";
import VerticalImage from "../VerticalImage/VerticalImage";

const CombinedImage = ({ imgData, setImgData, removeImg }) => {
  return (
    <>
      {!imgData && <ImagePicker setImage={setImgData} isDisable={false} />}
      {imgData && <VerticalImage src={imgData} removeImage={removeImg} />}
    </>
  );
};

export default CombinedImage;
