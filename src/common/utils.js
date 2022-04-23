/** Check object for emptiness
 * @param {any} obj - checking objeck
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  if (obj == null) {
    return true;
  } else if (obj === undefined) {
    return true;
  } else if (obj === "") {
    return true;
  } else {
    return false;
  }
};
