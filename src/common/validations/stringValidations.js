export const isEmptyString = (str) => {
  if (str.length === 0) {
    return true;
  }
  return false;
};

export const isString = (variable) => {
  if (typeof variable !== "string") {
    return false;
  }
  return true;
};
