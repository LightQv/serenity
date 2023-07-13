import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NotificationSvg from "../../svg/NotificationSvg";

export default function Notification() {
  const [socket, setSocket] = useState(null);
  const [socketUser, setSocketUser] = useState(null);
  const [show, setShow] = useState(false);

  const [messageList, setMessageList] = useState([]);
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    // To do : Server creation
    const soc = io(import.meta.env.VITE_SERVER_URL);
    setSocket(soc);

    soc.on("connect", () => {
      setSocketUser(soc.id);
    });
  }, []);

  // Retrieve message list from socket
  useEffect(() => {
    setViewed(false);
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessageList([...messageList, message]);
      });
    }
  }, [messageList, socket]);

  const handleNotification = () => {
    setShow(!show);
    setViewed(true);
  };

  return (
    <button
      type="button"
      className="relative h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 lg:p-2"
      onClick={() => handleNotification()}
    >
      {messageList.length > 0 && !viewed && (
        <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-red-500" />
      )}
      {show && (
        <div className="fixed right-0 top-0 flex h-fit w-screen flex-col items-center justify-between bg-turquoise-dark-0 shadow-md lg:right-8 lg:top-8 lg:w-[25rem] lg:rounded-lg">
          <button
            type="button"
            className="absolute right-0 top-0 mr-1 mt-4 self-end text-slate-100"
            onClick={() => setShow(false)}
          >
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 25"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.0078 6.88105L7.83089 6.69253L4.82428 3.48814C4.49943 3.17608 4.00359 3.17413 3.70263 3.47599C3.40186 3.77766 3.41168 4.26831 3.73495 4.57872L6.91816 7.97289L6.7475 8.14409L3.4691 11.4328C3.16824 11.7346 3.17825 12.2267 3.49282 12.5267C3.80458 12.8257 4.30043 12.8241 4.59969 12.5239L7.99407 9.12011L8.17091 9.30849L11.1781 12.5123C11.501 12.824 11.9986 12.8258 12.2991 12.5227C12.5988 12.2237 12.5888 11.7316 12.2657 11.4213L9.08117 8.02827L9.25183 7.85701L12.5302 4.56713C12.8312 4.26508 12.822 3.77442 12.5084 3.47383C12.196 3.17432 11.7002 3.17575 11.4009 3.47597L8.0078 6.88105Z"
              />
            </svg>
          </button>
          <ul className="w-full px-6 py-8">
            {socketUser && messageList.length > 0 ? (
              messageList
                .filter((notification, index) => {
                  return messageList.indexOf(notification) === index;
                })
                .map((notification) => (
                  <li className="h-6 w-full">
                    <NavLink to={`/admin/patients/${notification.author_id}`}>
                      <p className="w-full text-left">{notification.message}</p>
                    </NavLink>
                  </li>
                ))
            ) : (
              <li className="h-6 w-full">
                <p className="">Aucune notification</p>
              </li>
            )}
          </ul>
        </div>
      )}
      <NotificationSvg />
    </button>
  );
}
