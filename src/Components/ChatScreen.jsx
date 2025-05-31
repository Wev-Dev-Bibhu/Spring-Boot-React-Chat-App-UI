import React, { useState } from 'react'
import UserList from './UserList'
import IndividualChatScreen from './IndividualChatScreen'

const ChatScreen = () => {

  const [chatUser, setChatUser] = useState({});

  const handleChatUser = (data) => {
    setChatUser(data)
  }


    return (
        <div className="relative bg-gray-900 h-screen flex flex-col pl-24 overflow-hidden">
            <div className="flex flex-grow gap-4">

                <div className="w-80 border-slate-400">
                    <UserList setChatUser={handleChatUser} currentUser={{ username: "YourUsername", fullname: "Your Full Name" }} />
                </div>

                <div className="flex-grow rounded-md overflow-hidden shadow-slate-300">
                    <IndividualChatScreen chatUser={chatUser} />

                </div>

            </div>
        </div>
    )
}

export default ChatScreen
