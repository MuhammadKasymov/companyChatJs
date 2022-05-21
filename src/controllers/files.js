import axios from "axios";
import {
  URL_SERVER,
  ROUTE_IMAGE_GET,
  ROUTE_IMAGE_NEW,
} from "../constants/server";

export const getImageById = async (imageId) => {
  let data = [];
  const reqBody = { imageId };
  await axios
    .post(URL_SERVER + ROUTE_IMAGE_GET, reqBody)
    .then((res) => {
      const result = res.data;
      if (result) {
        data = result;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

export const createImage = async (imageData, pastImageId) => {
  let data = [];
  const reqBody = {
    image: imageData.image || null,
    smallImage: imageData.smallImage || null,
    pastImageId: pastImageId || null,
  };
  await axios
    .post(URL_SERVER + ROUTE_IMAGE_NEW, reqBody)
    .then((res) => {
      const result = res.data;
      if (result) {
        data = result;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};
