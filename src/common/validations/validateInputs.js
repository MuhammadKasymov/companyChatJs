import {
  latinAndNumbersReg,
  latinAndCyrrilReg,
  dateReg,
  lettersAndNotOnlyReg,
  numberndNotOnlyReg,
  latinCyrrilNumbReg,
} from "../../constants/regularExpressions";
import {
  MIN_YEAR,
  MIN_LOGIN_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_LENGTH_BIRTHPLACE,
} from "../../constants/validations/userRegistration";
import { CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY } from "../../constants/date";
import {
  ONLY_LAT_KYR_LETTERS,
  MIN_TWO_SYMBOLS,
  ONLY_NUMB_LAT_LETTERS,
  SHORT_LENGTH_PASSWORD,
  BAD_INCLUDE_PASSWORD,
  BAD_REPEAT_PASSWORD,
  BAD_FORMAT_DATE,
  INCORRECT_DATE,
  INVALID_EMAIL,
  ONLY_NUMB_LAT_KYR_LETTERS,
  EMPTY_INPUT,
  REPEAT_PASSWORD,
} from "../../constants/types/exceptionTypes/registrationExceptionTypes";
import { getMonthsLengthList } from "../time";
import { isEmptyString } from "./stringValidations";
import { isEmail } from "./checkData";

export const validEMail = (email) => {
  let result = null;
  const isEmpty = isEmptyString(email);

  if (isEmpty) {
    result = EMPTY_INPUT;
  } else if (!isEmail(email)) result = INVALID_EMAIL;
  return result;
};

export const validLogin = (login) => {
  let result = null;
  const logLength = login.length;
  const isGoodLength = logLength >= MIN_LOGIN_LENGTH;
  const isEmpty = isEmptyString(login);
  if (isEmpty) {
    result = EMPTY_INPUT;
  } else if (!isGoodLength) {
    result = MIN_TWO_SYMBOLS;
  } else if (!latinAndNumbersReg.test(login)) {
    result = ONLY_NUMB_LAT_LETTERS;
  }
  return result;
};

export const validName = (name) => {
  let result = null;
  const logLength = name.length;
  const isGoodLength = logLength >= MIN_NAME_LENGTH;
  const isEmpty = isEmptyString(name);
  if (isEmpty) {
    result = EMPTY_INPUT;
  } else if (!isGoodLength) {
    result = MIN_TWO_SYMBOLS;
  } else if (!latinAndCyrrilReg.test(name)) {
    result = ONLY_LAT_KYR_LETTERS;
  }
  return result;
};

export const validLastName = (name) => {
  let result = null;
  const logLength = name.length;
  const isGoodLength = logLength >= MIN_NAME_LENGTH;
  const isEmpty = isEmptyString(name);
  if (!isEmpty) {
    if (!isGoodLength) {
      result = MIN_TWO_SYMBOLS;
    } else if (!latinAndCyrrilReg.test(name)) {
      result = ONLY_LAT_KYR_LETTERS;
    }
  }
  return result;
};

export const validDate = (date) => {
  let result = null;
  const isEmpty = isEmptyString(date);
  if (isEmpty) {
    result = EMPTY_INPUT;
  } else if (dateReg.test(date)) {
    /** Decomposing parametr date */
    const parts = date.split(".");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    /** Getting list of amount of days in choosed year */
    const monthLengthList = getMonthsLengthList(year);

    /** comparing with current date */
    const isLastYear = CURRENT_YEAR === year;
    const isCurrentMonth = CURRENT_MONTH === month;

    /** Final validations with getted data*/
    const isGoodYear = year > MIN_YEAR && year <= CURRENT_YEAR;
    const isGoodMaxMonth = isLastYear ? month <= CURRENT_MONTH : month <= 12;
    const isGoodMonth = month > 0 && isGoodMaxMonth;
    const isGoodMaxDay = isCurrentMonth
      ? day <= CURRENT_DAY
      : day <= monthLengthList[month - 1];
    const isGoodDay = day > 0 && isGoodMaxDay;

    if (!isGoodDay || !isGoodMonth || !isGoodYear) {
      result = INCORRECT_DATE;
    }
  } else {
    result = BAD_FORMAT_DATE;
  }

  return result;
};

export const validPassword = (password) => {
  let result = null;
  const passwordLength = password.length;
  const isGoodLength = passwordLength > MIN_PASSWORD_LENGTH;
  const isIncludeNumbers = numberndNotOnlyReg.test(password);
  const isIncludeLetters = lettersAndNotOnlyReg.test(password);
  const isEmpty = isEmptyString(password);
  if (isEmpty) {
    result = EMPTY_INPUT;
  } else if (!isGoodLength) {
    result = SHORT_LENGTH_PASSWORD;
  } else if (!isIncludeNumbers || !isIncludeLetters) {
    result = BAD_INCLUDE_PASSWORD;
  }

  return result;
};

export const validRepeatedPassword = (repeatedPassword, password) => {
  let result = null;
  const isEmpty = isEmptyString(repeatedPassword);
  if (isEmpty) {
    result = REPEAT_PASSWORD;
  } else if (password !== repeatedPassword) {
    result = BAD_REPEAT_PASSWORD;
  }
  return result;
};

export const validBirthplace = (birthPlace) => {
  let result = null;
  const birthPlaceLength = birthPlace.length;
  const isGoodLength = birthPlaceLength > MIN_LENGTH_BIRTHPLACE;
  const isEmpty = isEmptyString(birthPlace);
  if (isEmpty) {
    result = EMPTY_INPUT;
  } else if (!isGoodLength) {
    result = MIN_TWO_SYMBOLS;
  } else if (latinCyrrilNumbReg.test(birthPlace)) {
    result = ONLY_NUMB_LAT_KYR_LETTERS;
  }

  return result;
};
