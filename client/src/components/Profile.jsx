const Profile = () => {
  return (
    <div className="profile">
      <div className="avatar">
        <button>+</button>
        <p>select avatar</p>
        <div className="collection">
          {
            // map through avatars and display them here to be applied to the user
          }
        </div>
      </div>
      <p>username</p>
      <button>change password</button>
      <button>delete account</button>
      change identifier which will be used for being recognized by friends
    </div>
  );
};

export default Profile;
