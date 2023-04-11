import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Friends = () => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:6001/friends/getFriends", {withCredentials: true})
      .then(res => {
        console.log(res);
        setFriends(res.data.friends);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const [inputFriend, setInputFriend] = useState("");
  const friendAdd = () => {
    axios
      .post(
        "http://localhost:6001/friends/addFriend",
        {friendID: inputFriend},
        {withCredentials: true}
      )
      .then(res => {
        console.log(res.response.data);
        setInputFriend("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="friends">
      <h2 className="panel-header">Friends</h2>
      <div className="friends-list">
        {friends.length > 0 ? (
          friends.map((friend, index) => {
            return (
              <Link to={"/messages"} key={index}>
                {friend.username}
                <span>chat now</span>
              </Link>
            );
          })
        ) : (
          <p>No friends yet.</p>
        )}
      </div>
      <form
        className="add-friend"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <h3 className="addfriendtext">Add friends</h3>
        <input
          type="text"
          placeholder="Private ID"
          onChange={e => {
            setInputFriend(e.target.value);
          }}
          required
        />
        <button onClick={friendAdd}>Add</button>
      </form>
    </div>
  );
};
// friends = room number unique private ID
export default Friends;
