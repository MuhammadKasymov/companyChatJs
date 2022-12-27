import * as React from "react";
import styles from "./ChatLine.module.scss";
import { addTripleDot } from "../../common/composeString";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import { useNavigate } from "react-router-dom";
import { chatRouteNoId } from "../../constants/routePath";
import { getFriendData } from "../../controllers/friendsController";
import { useIsMounted } from "../../common/hooks";
import { getImageById } from "../../controllers/files";

function ChatLine({ data, scrollToMe }) {
  const [name, setName] = React.useState(data.title);
  const [imgData, setImgData] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const tempData = useSelector((state) => state.tempData);
  const selfId = useSelector((state) => state.auth.id);
  const { isGeneral, isAdminChat, usersId, imageId } = data;
  const chatId = data.id;
  const currentChatId = tempData.chatId;
  const isChoosed = chatId === Number(tempData.chatId);
  const chatLineRef = React.createRef();

  const onPress = () => {
    if (chatId !== currentChatId) {
      dispatch(setCurrentChatId(chatId));
      navigate(chatRouteNoId + chatId);
    }
  };

  const uploadName = React.useCallback(async () => {
    const isPrivateUserChat = !isGeneral && !isAdminChat;
    let friendData = null;
    if (isPrivateUserChat) {
      let chatName = name;
      const userIdsArr = usersId?.split(",");
      const [friendId] = userIdsArr?.filter((el) => el !== selfId?.toString());
      friendData = await getFriendData(friendId);
      chatName = `${friendData.firstName} ${friendData.secondName}`;

      isMounted.current && setName(chatName);
    }
    return friendData;
  }, [isAdminChat, isGeneral, isMounted, name, selfId, usersId]);

  const uploadImg = React.useCallback(
    async (friendImageId) => {
      const imgId = friendImageId || imageId;
      if (imgId) {
        const imageData = await getImageById(imgId);
        isMounted.current && setImgData(imageData);
      }
    },
    [imageId, isMounted]
  );

  const uploadData = React.useCallback(async () => {
    const friendData = await uploadName();
    uploadImg(friendData?.imageId);
  }, [uploadImg, uploadName]);

  React.useEffect(uploadData, [uploadData]);
  React.useEffect(
    () => scrollToMe && isChoosed && scrollToMe(chatLineRef.current),
    [chatLineRef, isChoosed, scrollToMe]
  );

  let msgText = data.lastMessage?.messageText;
  if (msgText && msgText.length > 13) {
    msgText = addTripleDot(msgText, 13);
  }

  return (
    <div
      onClick={onPress}
      className={`${styles.container} ${isChoosed ? styles.bgColor : ""}`}
      ref={chatLineRef}
    >
      {!imgData.smallImage ? (
        <div className={styles.ico}>
          <p>{name.charAt(0)}</p>
        </div>
      ) : (
        <img
          className={styles.ico}
          src={imgData.smallImage}
          alt={"Пользовательская иконка"}
        />
      )}

      <div className={styles.infDiv}>
        <p className={styles.nameText}>{name}</p>
        {msgText && <p>{msgText}</p>}
        {!msgText && <p>Пустая история</p>}
      </div>
    </div>
  );
}

export default ChatLine;
