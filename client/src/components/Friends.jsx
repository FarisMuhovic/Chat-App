import React, {useState, useEffect} from "react";
import axios from "axios";

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
  console.log(friends);
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
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="friends">
      <h2 className="panel-header">Friends</h2>
      <div className="friends-list">
        {friends.map(friend => {
          return <p>{friend.username}</p>;
          // also has a privateID
        })}
      </div>
      <h2 className="addfriendtext">Add friends</h2>
      <div className="add-friend">
        <input
          type="text"
          placeholder="Private ID"
          onChange={e => {
            setInputFriend(e.target.value);
          }}
        />
        <button onClick={friendAdd}>+</button>
      </div>
    </div>
  );
};
// friends = room number unique private ID
export default Friends;
