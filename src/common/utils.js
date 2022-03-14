/** Check object for emptiness
 * @param {any} obj - checking objeck
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  if (obj == null) {
    return false;
  } else if (obj === undefined) {
    return false;
  } else if (obj === "") {
    return false;
  } else {
    return true;
  }
};
