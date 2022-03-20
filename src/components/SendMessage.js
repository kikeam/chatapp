import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import { ChatContext } from "../contexts/chat/ChatContext";

export const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);
  const onSubmit = (ev) => {
    ev.preventDefault();

    socket.emit("message-personal", {
      from: auth.uid,
      to: chatState.activeChat,
      message,
    });

    setMessage("");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={({ target }) => {
              setMessage(target.value);
            }}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button
            className="msg_send_btn mt-3"
            disabled={message.trim().length === 0}
            type="submit"
          >
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
