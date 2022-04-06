import {
  validDate,
  validEMail,
  validLogin,
  validName,
  validLastName,
  validPassword,
  validRepeatedPassword,
} from "./validateInputs";
import { regInputTypes } from "../../constants/types/pageTypes/UserRegistrationContstans";
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

export default async function userRegistrationValidations(
  inputType,
  value,
  extraValue
) {
  let result = null;
  let isExist = false;
  switch (inputType) {
    case regInputTypes.login:
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
    case regInputTypes.email:
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
    case regInputTypes.firstName:
      result = validName(value);
      break;
    case regInputTypes.secondName:
      result = validName(value);
      break;
    case regInputTypes.lastName:
      result = validLastName(value);
      break;
    case regInputTypes.birthday:
      result = validDate(value);
      break;
    case regInputTypes.password:
      result = validPassword(value);
      break;
    case regInputTypes.repeatedPassword:
      result = validRepeatedPassword(value, extraValue);
      break;
    default:
      return null;
  }
  return result;
}
