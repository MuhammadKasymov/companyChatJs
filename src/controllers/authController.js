import axios from "axios";
import { URL_SERVER, ROUTE_AUTH } from "../constants/server";
import { isEmail } from "../common/validations/checkData";
import { initialSelfInformationState } from "../constants/initialStates/reducerStates";

const authUser = async (authData) => {
  let data = {
    goodAuth: false,
    notExistUser: false,
    userData: initialSelfInformationState,
  };

  const isLogin = !isEmail(authData.login);

  const reqBody = {
    login: null,
    email: null,
    password: authData.password,
  };

  if (isLogin) reqBody.login = authData.login;
  if (!isLogin) reqBody.email = authData.login;

  await axios
    .post(URL_SERVER + ROUTE_AUTH, reqBody)
    .then((res) => {
      const result = res.data;
      if (result) {
        data.goodAuth = result.goodAuth;
        data.notExistUser = result.notExistUser;
        data.userData = result.userData;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

export default authUser;
