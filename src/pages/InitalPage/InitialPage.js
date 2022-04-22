import React from "react";
import RedirectWrapper from "../../components/RedirectWrapper/RedirectWrapper";
import { chatRouteNoId, authRoute } from "../../constants/routePath";
import {USER_DATA, LAST_CHAT_ID} from '../../constants/localStorageKeys';

const InitialPage = () => {
  const localStrAuthData = localStorage.getItem(USER_DATA);
  const localLastChatId = localStorage.getItem(LAST_CHAT_ID);
  const localAuthData = localStrAuthData ? JSON.parse(localStrAuthData) : null;
  const isAuth = Number(localAuthData?.id) && Number(localLastChatId);
  console.log(localAuthData?.id)
  const baseUrl = isAuth ? chatRouteNoId + localLastChatId : authRoute;

  return <RedirectWrapper path={baseUrl} isRedirect={true} />;
};

export default InitialPage;