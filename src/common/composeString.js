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
    catchedString = str.substring(0, len) + "...";
  }
  return catchedString;
};
