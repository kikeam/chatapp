import React, { useContext } from "react";
import { ChatContext } from "../contexts/chat/ChatContext";
import { fetchToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";
import { types } from "../types/types";

export const SideBarChatItem = ({ user }) => {
  const { dispatch, chatState } = useContext(ChatContext);
  const { activeChat } = chatState;

  const onClick = async () => {
    dispatch({ type: types.chatSelected, payload: user.uid });

    const resp = await fetchToken(`messages/${user.uid}`);

    dispatch({ type: types.loadMessages, payload: resp.messages });
    scrollToBottom("msg_history");
  };

  return (
    <div
      className={`chat_list ${user.uid === activeChat && "active_chat"}`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://image.freepik.com/vector-gratis/diseno-avatar-persona_24877-38131.jpg"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
