import {
  validDate,
  validEMail,
  validLogin,
  validName,
  validPassword,
  validRepeatedPassword,
} from "./validateInputs";
import { inputTypes } from "../../contants/types/pageTypes/UserRegistrationContstans";
import {
  checkLogin,
  checkEmail,
} from "../../controllers/registrationController";
import {
  EXIST_EMAIL,
  EXIST_LOGIN,
  EMPTY_INPUT,
} from "../../contants/types/exceptionTypes/registrationExceptionTypes";
import { isEmptyString } from "./stringValidations";

export default async function userRegistrationValidations(
  inputType,
  value,
  extraValue
) {
  let result = null;
  let isExist = false;
  switch (inputType) {
    case inputTypes.login:
      if (isEmptyString(value)) {
        result = EMPTY_INPUT;
      } else {
        isExist = await checkLogin(value);
        if (!isExist) {
          result = validLogin(value);
        } else {
          result = EXIST_LOGIN;
        }
      }
      break;
    case inputTypes.email:
      if (isEmptyString(value)) {
        result = EMPTY_INPUT;
      } else {
        isExist = await checkEmail(value);
        if (!isExist) {
          result = validEMail(value);
        } else {
          result = EXIST_EMAIL;
        }
      }
      break;
    case inputTypes.firstName:
      result = validName(value);
      break;
    case inputTypes.secontName:
      result = validName(value);
      break;
    case inputTypes.lastName:
      result = validName(value);
      break;
    case inputTypes.birthday:
      result = validDate(value);
      break;
    case inputTypes.password:
      result = validPassword(value);
      break;
    case inputTypes.repeatedPassword:
      if (isEmptyString(value))
        result = validRepeatedPassword(value, extraValue);
      break;
    default:
      return null;
  }
  return result;
}
