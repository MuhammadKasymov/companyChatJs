import * as React from "react";
import styles from "./ChatLine.module.scss";
import { addTripleDot } from "../../common/composeString";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import { useNavigate } from "react-router-dom";
import { chatRouteNoId } from "../../constants/routePath";
import { getFriendData } from "../../controllers/friendsController";

function ChatLine({ data }) {
  const [name, setName] = React.useState(data.title);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tempData = useSelector((state) => state.tempData);
  const selfId = useSelector((state) => state.auth.id);
  const { isGeneral, isAdminChat, usersId } = data;
  const chatId = data.id;
  const currentChatId = tempData.chatId;
  const isChoosed = chatId === Number(tempData.chatId);

  let msgText = data.lastMessage?.messageText;
  if (msgText && msgText.length > 13) {
    msgText = addTripleDot(msgText, 13);
  }

  const onPress = () => {
    if (chatId !== currentChatId) {
      dispatch(setCurrentChatId(chatId));
      navigate(chatRouteNoId + chatId);
    }
  };

  React.useEffect(
    () =>
      !isGeneral &&
      !isAdminChat &&
      (async function () {
        let chatName = name;
        const userIdsArr = usersId?.split(",");
        const [friendId] = userIdsArr?.filter((el) => el !== selfId.toString());
        const friendData = await getFriendData(friendId);
        chatName = `${friendData.firstName} ${friendData.secondName}`;
        setName(chatName);
      })(),
    [isAdminChat, isGeneral, name, selfId, usersId]
  );

  return (
    <div
      onClick={onPress}
      className={`${styles.container} ${isChoosed ? styles.bgColor : ""}`}
    >
      <div className={styles.ico}>
        <p>{name.charAt(0)}</p>
      </div>
      <div className={styles.infDiv}>
        <p className={styles.nameText}>{name}</p>
        {msgText && <p>{`Последнeе: ${msgText}`}</p>}
        {!msgText && <p>Пустая история чата</p>}
      </div>
    </div>
  );
}

export default ChatLine;
