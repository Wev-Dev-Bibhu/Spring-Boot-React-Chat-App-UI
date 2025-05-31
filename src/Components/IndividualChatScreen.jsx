import React, { useState, useEffect, useRef, useContext } from "react";
import DuoIcon from "@mui/icons-material/Duo";
import CallIcon from "@mui/icons-material/Call";
import { Tooltip } from "@mui/material";
import InputEmoji from "react-input-emoji";
import { io } from "socket.io-client";
import { AuthContext } from "../Apis/AuthContext";
import { ScreenApis } from "../Apis/ScreenApis";

const IndividualChatScreen = (props) => {
  const { fetchUserMessages } = ScreenApis();
  const { chatUser } = props;
  const { currentUser, apiUrl } = useContext(AuthContext);

  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Fetch messages when chatUser or currentUser changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!currentUser || !chatUser) return;
        const formData = {
          senderId: currentUser.id,
          receiverId: chatUser.id,
        };
        const response = await fetchUserMessages(formData);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatUser, currentUser]);

  // Dynamic socket connection
  useEffect(() => {
    if (!currentUser || !apiUrl) return;

    socketRef.current = io(apiUrl);

    socketRef.current.emit("joinRoom", { userId: currentUser.id });

    const handleMessage = (message) => {
      if (
        (message.sender === chatUser.id && message.receiver === currentUser.id) ||
        (message.sender === currentUser.id && message.receiver === chatUser.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socketRef.current.on("receiveMessage", handleMessage);

    return () => {
      socketRef.current.disconnect();
    };
  }, [apiUrl, currentUser, chatUser]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (chatMessage.trim() && chatUser) {
      const messageData = {
        sender: currentUser.id,
        receiver: chatUser.id,
        message: chatMessage.trim(),
      };

      socketRef.current.emit("sendMessage", messageData);
      setMessages((prevMessages) => [...prevMessages, { ...messageData, local: true }]);
      setChatMessage("");
    }
  };

  if (!chatUser) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-lg font-semibold">No Chat Selected</h1>
          <p className="text-gray-500 mt-2">Select a user to start chatting.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-gray-800 flex flex-col border-l-[1px] border-slate-500">
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-500 bg-gray-900 text-white shadow-sm">
        <div>
          <h1 className="text-lg font-semibold">{chatUser.fullname}</h1>
          <span className={`text-sm ${chatUser.login ? "text-green-500" : "text-gray-500"}`}>
            {chatUser.login ? "online" : "offline"}
          </span>
        </div>

        <div className="flex space-x-5 text-gray-500 pr-5">
          <Tooltip title="Voice Call"><CallIcon className="hover:text-gray-300 cursor-pointer" /></Tooltip>
          <Tooltip title="Video Call"><DuoIcon className="hover:text-gray-300 cursor-pointer" /></Tooltip>
        </div>
      </header>

      <main className="flex-grow p-4 overflow-y-auto space-y-6 max-h-[calc(100vh-130px)] scrollbar-hide overflow-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-${msg.sender === currentUser.id ? "end" : "start"} space-x-3 ${msg.sender === currentUser.id ? "justify-end" : ""
              }`}
          >
            {msg.sender !== currentUser.id && (
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center font-bold text-purple-700">
                <img
                  src={chatUser.profileImage}
                  alt="User Profile"
                  className="rounded-full"
                />
              </div>
            )}
            <div>
              <div
                className={`p-3 rounded-lg max-w-xs ${msg.sender === currentUser.id
                    ? "bg-gray-200 text-gray-900"
                    : "bg-purple-500 text-white"
                  }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs mt-1 text-gray-500">{msg.created_at}</p>
              </div>
              {msg.sender !== currentUser.id && (
                <p className="text-xs font-semibold text-slate-200 mt-1">{msg.sender}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="flex items-center p-2 border-t border-t-slate-500 w-full absolute bottom-0 left-0">
        <div className="relative flex-1 px-4">
          <InputEmoji
            value={chatMessage}
            theme="dark"
            keepOpened={true}
            shouldReturn={true}
            onChange={setChatMessage}
            cleanOnEnter={false}
            onEnter={handleSendMessage}
            placeholder="Type a message"
          />
        </div>

        <button
          className={`ml-2 p-3 rounded-lg ${chatMessage ? "bg-purple-500" : "bg-purple-300 cursor-not-allowed"
            } text-white`}
          disabled={!chatMessage}
          onClick={handleSendMessage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default IndividualChatScreen;
