import { getOnlyNumbers } from "./composeString";
import { inputTypes } from "../constants/types/inputTypes";

export const getMaskedDate = (date) => {
  let result = "";

  let clearedDate = getOnlyNumbers(date);
  const dateLength = clearedDate.length;

  if (dateLength <= 2) {
    result = clearedDate;
  } else if (dateLength > 2 && dateLength <= 4) {
    const days = clearedDate.slice(0, 2);
    const month = clearedDate.slice(2, 4);
    result = `${days}.${month}`;
  } else {
    const days = clearedDate.slice(0, 2);
    const month = clearedDate.slice(2, 4);
    const years = clearedDate.slice(4, 8);
    result = `${days}.${month}.${years}`;
  }

  return result;
};

//Todo: fill func
export const getMasketPhone = (number) => {
  return number;
};

export const getMaskedInput = (value, inputType) => {
  let result = "";
  switch (inputType) {
    case inputTypes.DATE:
      result = getMaskedDate(value);
      break;
    case inputTypes.PHONE:
      result = getMasketPhone(value);
      break;
    case inputTypes.NUMBERS:
      result = getOnlyNumbers(value);
      break;
    default:
      result = value;
  }
  return result;
};
