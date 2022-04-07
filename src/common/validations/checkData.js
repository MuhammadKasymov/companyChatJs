import { mailReg } from "../../constants/regularExpressions";

export const isEmail = (email) => {
  return mailReg.test(email);
};
