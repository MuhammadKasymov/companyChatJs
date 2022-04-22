import React from "react";
import RedirectWrapper from "../../components/RedirectWrapper/RedirectWrapper";
import { chatRouteNoId, authRoute } from "../../constants/routePath";
import { USER_DATA, LAST_CHAT_ID } from "../../constants/localStorageKeys";
import { useDispatch } from "react-redux";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import { setAuth } from "../../store/action-creators/auth";

const InitialPage = () => {
  const dispatch = useDispatch();
  const localStrAuthData = localStorage.getItem(USER_DATA);
  const localLastChatId = localStorage.getItem(LAST_CHAT_ID);
  const localAuthData = localStrAuthData ? JSON.parse(localStrAuthData) : null;
  const isAuth = Number(localAuthData?.id) && Number(localLastChatId);
  let baseUrl = authRoute;
  if (isAuth) {
    dispatch(setCurrentChatId({chatId: localLastChatId}));
    dispatch(setAuth(localAuthData));
    baseUrl = chatRouteNoId + localLastChatId;
  }

  return <RedirectWrapper path={baseUrl} isRedirect={true} />;
};

export default InitialPage;
