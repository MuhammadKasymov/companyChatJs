import {
  validDate,
  validEMail,
  validLogin,
  validName,
  validLastName,
  validPassword,
  validRepeatedPassword,
} from "./validateInputs";
import { userInputTypes } from "../../constants/types/pageTypes/UserRegistrationContstans";
import {
  checkLogin,
  checkEmail,
} from "../../controllers/registrationController";
import {
  EXIST_EMAIL,
  EXIST_LOGIN,
  EMPTY_INPUT,
} from "../../constants/types/exceptionTypes/registrationExceptionTypes";
import { isEmptyString } from "./stringValidations";

export default async function userDataValidations(
  inputType,
  value,
  extraValue
) {
  let result = null;
  let isExist = false;
  switch (inputType) {
    case userInputTypes.login:
      if (isEmptyString(value)) {
        result = EMPTY_INPUT;
      } else {
        result = validLogin(value);
        if (result == null) {
          isExist = await checkLogin(value);
        }
        if (isExist) result = EXIST_LOGIN;
      }
      break;
    case userInputTypes.email:
      if (isEmptyString(value)) {
        result = EMPTY_INPUT;
      } else {
        result = validEMail(value);
        if (result == null) {
          isExist = await checkEmail(value);
        }
        if (isExist) result = EXIST_EMAIL;
      }
      break;
    case userInputTypes.firstName:
      result = validName(value);
      break;
    case userInputTypes.secondName:
      result = validName(value);
      break;
    case userInputTypes.lastName:
      result = validLastName(value);
      break;
    case userInputTypes.birthday:
      result = validDate(value);
      break;
    case userInputTypes.password:
      result = validPassword(value);
      break;
    case userInputTypes.repeatedPassword:
      result = validRepeatedPassword(value, extraValue);
      break;
    default:
      return null;
  }
  return result;
}
