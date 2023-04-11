import React, {useState} from "react";
import {useOutletContext} from "react-router-dom";
const Profile = () => {
  const {username} = useOutletContext();
  const {privateID} = useOutletContext();
  const [togglePassword, setTogglePassword] = useState(false);
  // const [toggleAvatars, setToggleAvatars] = useState(false);
  // const [avatar, setAvatar] = useState("");
  // const avatars = [
  //   {
  //     id: 1,
  //     name: "blush_ghost",
  //     url: "./blush_ghost.PNG",
  //   },
  //   {
  //     id: 2,
  //     name: "happy_ghost",
  //     url: "./happy_ghost.PNG",
  //   },
  //   {
  //     id: 3,
  //     name: "skeleton_ghost",
  //     url: "./skeleton_ghost.PNG",
  //   },
  //   {
  //     id: 4,
  //     name: "devil_ghost",
  //     url: "./devil_ghost.PNG",
  //   },
  // ];
  // const toggleAvatarCollection = () => {
  //   setToggleAvatars(!toggleAvatars);
  // };
  // const changeAvatar = e => {
  //   console.log(e.target.alt);
  //   setAvatar(e.target.alt);
  // };
  const [copyToggle, setCopyToggle] = useState(false);
  const copyID = () => {
    navigator.clipboard.writeText(privateID);
    setCopyToggle(true);
    setTimeout(() => {
      setCopyToggle(false);
    }, 2500);
  };
  return (
    <div className="profile">
      <h2 className="panel-header">Profile</h2>
      <div className="avatar">
        {/* <div className="select-avatar">
          {avatar === "" && <button onClick={toggleAvatarCollection}>+</button>}
          {avatars.flatMap(av => {
            if (av.name === avatar) {
              return (
                <img
                  src={av.url}
                  alt={av.name}
                  onClick={toggleAvatarCollection}
                />
              );
            }
          })}
        </div> */}

        {/* <div className="collection">
          {toggleAvatars &&
            avatars.map(avatar => {
              return (
                <img
                  src={avatar.url}
                  alt={avatar.name}
                  onClick={changeAvatar}
                />
              );
            })}
        </div> */}
      </div>
      <div className="account-info">
        <h3>Account Info</h3>
        <p>username: {username}</p>
        <button
          className="btn-password-change"
          onClick={() => {
            setTogglePassword(!togglePassword);
          }}
        >
          change password
        </button>
        {togglePassword && (
          <form
            className="password-change"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              type="password"
              placeholder="current password"
              required
              disabled
            />
            <input
              type="password"
              placeholder="new password"
              required
              disabled
            />
            <input
              type="password"
              placeholder="confirm password"
              required
              disabled
            />
            <button>save</button>
          </form>
        )}
        <button className="btn-delete">delete account</button>
      </div>
      <div className="account-id">
        {/* <div className="qr">
          <button>QR CODE</button>
        </div> */}
        <div className="analog">
          <h3>
            Get added by friends with account ID.
            {/* ,or QR code scan. */}
          </h3>
          <p>
            private ID: <span>{privateID}</span>
          </p>
          <button onClick={copyID}>{copyToggle ? "copied!" : "copy"}</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
