/** Checking event on clicked 'enter' key */
export const isEnterPressed = (ev) => {
  let isEnter = false;
  if (ev.key === "Enter") {
    ev.preventDefault();
    isEnter = true;
  }
  return isEnter;
};
