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

/** If el is not in viewport then scroll into view
 * @param parent - parent el
 * @param child - child el
 */
export const scrollToChild = (parent, child) => {
  const elTopScroll = child.offsetTop;
  const elScrollHeigth = child.scrollHeight;
  const elYPos = elTopScroll - elScrollHeigth;
  const parHeigth = parent.clientHeight;
  const parScrollTop = parent.scrollTop;
  const parCurrentView = parHeigth + parScrollTop;
  const isBottomVisible = parCurrentView > elTopScroll;
  const isTopVisible = parScrollTop < elYPos;
  const isVisible = isBottomVisible && isTopVisible;

  !isVisible && child.scrollIntoView();
};
