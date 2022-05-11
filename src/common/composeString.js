import { numberReg } from "../constants/regularExpressions";

/** Catching string by lenght,
 *  and adding triple dot to end
 *  + Example:
 *  + str -> 'Some long string'
 *  + len -> 4
 *  + Result -> 'Some...'
 *
 *  @param {string} str - composing string
 *  @param {number} len - length of catching
 *  @return {string} composed string
 */

export const addTripleDot = (str, len) => {
  let catchedString = str;
  if (str.length >= len) {
    catchedString = str.substring(0, len).trim() + "...";
  }
  return catchedString;
};

/**
 *  @param {string} url - string;
 *  @returns {number} id of url  */
export const getChatIdByUrl = (url) => {
  let chatId = -1;
  const partsOfUlr = url.split("/");
  const lastIndexParts = partsOfUlr.length - 1;
  const lastPartUlr = partsOfUlr[lastIndexParts];
  if (lastPartUlr.match(/^\d+$/)) {
    chatId = parseInt(lastPartUlr, 10);
  }
  return chatId;
};

/** Remove all characters in a
 * string that are not numbers */
export const getOnlyNumbers = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (numberReg.test(str[i])) {
      result += str[i];
    }
  }
  return result;
};
