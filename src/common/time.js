import {
  getDateType,
  diffDateType,
  delayType,
} from "../constants/types/timeUtil";

/** Get formated time
 * @param {string} format - type of get data
 *
 * Cases
 *  + HOURSE_MINUTES -  hours:minute | 24:00
 *  + ONLY_DATE - day.mounth.year | 10.03.2022
 *  + FULL_TIME - day.mounth.year hours:minute | 10.03.2022 12:33'
 *  +
 *
 * @param {number} milliseconds - optional parameter if enabled,
 * will format the time from this parameter, and if not, it will
 * format the time from the current
 */

export const getFormatedTime = (format, milliseconds) => {
  let date = "";
  if (milliseconds) {
    date = new Date(milliseconds);
  } else date = new Date();
  const onlyDate = date.toLocaleDateString().toString();
  const onlyHours = date.toLocaleTimeString().toString();
  switch (format) {
    case getDateType.HM: // hours - minute
      return onlyHours.slice(0, -3);
    case getDateType.OD: // only - date
      return onlyDate;
    case getDateType.FT: // full - time
      const fullDate = onlyDate + " " + onlyHours.slice(0, -3);
      return fullDate;
    case getDateType.DM: // day - mounth
      return onlyDate.slice(0, 5);
    default:
      return "";
  }
};

/** Get difference of date
 * todo: complete it...
 */
export const getDateDiff = (resType, fDate, lDate) => {
  let result = "";
  let t1, t2;
  let sDate = lDate;
  if (!lDate) {
    sDate = new Date();
  }
  switch (resType) {
    case diffDateType.IN_DAYS:
      t2 = sDate.getTime();
      t1 = fDate.getTime();
      result = Math.floor((t2 - t1) / (24 * 3600 * 1000));
      break;
    case diffDateType.IN_WEEKS:
      t2 = sDate.getTime();
      t1 = fDate.getTime();
      result = parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
      break;
    case diffDateType.IN_MOUNTH:
      const fDateY = fDate.getFullYear();
      const sDateY = sDate.getFullYear();
      const fDateM = fDate.getMonth();
      const sDateM = sDate.getMonth();
      result = sDateM + 12 * sDateY - (fDateM + 12 * fDateY);
      break;
    case diffDateType.IN_YEARS:
      result = sDate.getFullYear() - fDate.getFullYear();
      break;
    default:
      break;
  }
  return result;
};

/** Get Full millisecond in Date
 * @param {number} date - date, can be empty
 */
export const getDateInMilliseconds = (date) => {
  let result = 0;
  if (date) {
    result = date.getTime();
  } else {
    result = new Date().getTime();
  }
  return result;
};

/** Get days in month by year */
export const getMonthsLengthList = (year) => {
  let febrary = 28;
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) febrary = 29;

  return [31, febrary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

/** Get delays text from milliseconds
 *  @param {number} milliseconds get diff from this time
 *  @returns {delayType}
 */
export const getDelayDateType = (milliseconds) => {
  const date = milliseconds ? new Date(milliseconds) : new Date();
  const diffYear = getDateDiff(diffDateType.IN_YEARS, date);
  const diffDays = getDateDiff(diffDateType.IN_DAYS, date);
  let type = delayType.MOUNTH_DATE;

  if (diffYear > 0) {
    type = delayType.FULL_DATE;
  } else if (diffDays === 1) {
    type = delayType.YESTERDAY;
  } else if (diffDays === 0) {
    type = delayType.TODAY;
  }
  return type;
};

/** get text of delay by type
 * @param {number} milliseconds
 * @param {getDateType} type
 * @returns {string}
 */
export const getDateDelayText = (milliseconds, type) => {
  let result = "";
  switch (type) {
    case delayType.FULL_DATE:
      result = getFormatedTime(getDateType.FT, milliseconds);
      break;
    case delayType.MOUNTH_DATE:
      result = getFormatedTime(getDateType.DM, milliseconds);
      break;
    case delayType.YESTERDAY:
      result = "Вчера";
      break;
    case delayType.TODAY:
      result = "Сегодня";
      break;
    default:
      break;
  }

  return result;
};
