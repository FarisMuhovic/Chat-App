import React, {useState, useEffect} from "react";
import axios from "axios";
import io from "socket.io-client";
import {useOutletContext} from "react-router-dom";

const socket = io("http://localhost:6001", {withCredentials: true});
socket.on("connect", () => {
  console.log("connected", socket.id);
});

const Messages = () => {
  const [room, setRoom] = useState("");
  const {privateID, username} = useOutletContext();
  // client data above ^
  const [friends, setFriends] = useState([]);

  // friends contain all the friends of the user and their
  // messages roomid userid and username
  const friendItems = friends.map(friend => {
    return (
      <div
        className="friend-list"
        onClick={() => {
          setChatsWith(friend);
          // joins the room of the friend
          setAllMessages([]);
          socket.emit("join-room", friend.roomID, privateID, friend.userID);
          setRoom(friend.roomID);

          socket.on("messages", messages => {
            setAllMessages(messages);
          });
        }}
      >
        <button>{friend.username}</button>
        {/* <p>last message.</p> */}
      </div>
    );
  });
  // tells us the user that the client is chatting with
  // has the username and userID of the user and roomid
  const [chatswith, setChatsWith] = useState("");

  const [message, setMessage] = useState({
    message: "",
    sentBy: privateID,
    receiver: chatswith.userID,
  });

  const [allMessages, setAllMessages] = useState([]);

  // get friends of the user
  useEffect(() => {
    axios
      .get("http://localhost:6001/friends/getFriends", {withCredentials: true})
      .then(res => {
        // console.log(res);
        setFriends(res.data.friends);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  socket.on("receive-message", message => {
    setAllMessages([...allMessages, message]);
  });

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("send-message", message, room);

    setMessage({
      message: "",
      sentBy: privateID,
      receiver: chatswith.userID,
    });
  }
  console.log(allMessages);
  return (
    <div className="messages">
      <h2 className="panel-header">Messages</h2>
      <div className="friend-messages">
        {friends.length > 0 ? friendItems : <p>No friends.</p>}
      </div>
      {chatswith && (
        <div className="chat">
          <div className="chat-header">
            <h3>Chat with {chatswith.username}</h3>
          </div>
          <div className="chat-messages">
            {allMessages.map((message, index) => {
              return (
                <div
                  key={index}
                  className="message-box"
                  style={{
                    backgroundColor:
                      message.sentBy === username ? "rgb(78, 78, 78)" : "",
                  }}
                >
                  <p>{message.message}</p>
                  <span>
                    from: {message.sentBy === username ? "You" : message.sentBy}
                  </span>
                </div>
              );
            })}
          </div>
          <form onSubmit={sendMessage} className="message-inputbox">
            <input
              type="text"
              placeholder="Message"
              name="message"
              value={message.message}
              onChange={e => {
                setMessage({
                  message: e.target.value,
                  sentBy: privateID,
                  receiver: chatswith.userID,
                });
              }}
            />
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Messages;
