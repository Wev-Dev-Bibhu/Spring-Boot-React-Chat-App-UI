import React, { useContext, useEffect, useState } from 'react';
import { fetchAllUsers } from '../Apis/ScreenApis';
import { AuthContext } from '../Apis/AuthContext';

const UserList = (props) => {
  const [searchChat, setSearchChat] = useState("");
  const [userList, setUserList] = useState([]);
  const [chatUser, setChatUser] = useState(false);
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    props.setChatUser(chatUser);
  }, [chatUser, props]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userID = currentUser.id;
      const data = await fetchAllUsers({ userID });
      setUserList(data.data.users);
    };
    fetchUsers();
  }, [currentUser.id]);

  // Fallback for loading or empty list
  if (!Array.isArray(userList) || userList.length === 0) {
    return (
      <div className="text-center text-gray-400">
        <p>{userList.length === 0 ? "No users found." : "Loading users..."}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-4 h-full">
      <h1 className="text-3xl font-semibold mb-4 text-white">Chats</h1>
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#9ca3af">
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
        </span>
        <input
          placeholder="Search messages or users"
          className="appearance-none w-full px-10 py-3 border border-transparent bg-[#1c2733] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6f87af] sm:text-sm placeholder-gray-400"
          type="text"
          name="search"
          id="search"
          value={searchChat}
          onChange={(e) => setSearchChat(e.target.value)}
        />
      </div>

      <h1 className="text-lg text-[#9ca3af] font-semibold mb-4">Recent</h1>
      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
        {userList.map((chat) => (
          <div
            role='button'
            key={chat.id}
            className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer ${chatUser?.id === chat.id ? 'bg-gray-700' : 'bg-gray-800'
              }`}
            onClick={() => setChatUser(chat)}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center font-bold text-white mr-3">
              {chat.profileImage ? (
                <img
                  src={chat.profileImage}
                  alt={chat.fullname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg text-gray-500">{chat.fullname.charAt(0)}</span>
              )}
              {chat.login === true && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-gray-900" />
              )}
              {chat.login === false && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border border-gray-900" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-semibold text-white">{chat.fullname}</p>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <div className="flex items-center">
                <p className={`text-sm ${chat.isTyping ? 'text-purple-500' : 'text-gray-400'}`}>
                  {chat.isTyping ? 'typing...' : chat.message}
                </p>
                {chat.unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default UserList;
