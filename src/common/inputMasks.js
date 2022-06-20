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

export const getMasketPhone = (inputValue) => {
  let result = "+7";
  let number = getOnlyNumbers(inputValue);
  const isWithCode = number[0] === "7";
  number = isWithCode ? number.slice(1, 11) : number.slice(0, 11);
  const firstPart = number.substring(0, 3);
  const secondPart = number.substring(3, 6);
  const thirdPart = number.substring(6, 8);
  const lastPart = number.substring(8, 11);
  if (firstPart) result += `(${firstPart}`;
  if (secondPart) result += `)${secondPart}`;
  if (thirdPart) result += `-${thirdPart}`;
  if (lastPart) result += `-${lastPart}`;
  return result;
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
