import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const DemoChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("User1");
  const [room, setRoom] = useState("Room1");

  useEffect(() => {
    // Join a chat room
    socket.emit("joinRoom", { username, room });

    // Listen for messages
    socket.on("receiveMessage", (message) => {
      setChat((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room, username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { username, room, message });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat Room: {room}</h1>
      <div>
        {chat.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default DemoChat;
