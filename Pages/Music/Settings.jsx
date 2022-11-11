import { useRef } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import notifyIncorrectPassword from "../../Toastify/Settings/IncorrectPassword";
import notifyUnmatchedNewPassword from "../../Toastify/Settings/UnmatchedNewPassword";
import notifyUsernameTaken from "../../Toastify/Settings/UsernameTaken";

const Settings = ({ userDetails, setUserDetails }) => {
  const [changeUsername, setChangeUsername] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const usernameInput = useRef();
  const oldPasswordInput = useRef();
  const newPasswordInput = useRef();
  const confirmNewPasswordInput = useRef();

  // console.log(localStorage)
  // console.log(userDetails)

  const handleChangeUsername = () => {
    setChangeUsername(true);
  };

  const handleChangePassword = () => {
    setChangePassword(true);
  };

  const handleSubmitChangeUsername = () => {
    const user = {...userDetails};
    const username = usernameInput.current.value;
    if (localStorage.getItem(username) === null) {
      user.username = username;
      console.log(user)
      console.log(userDetails)
      localStorage.removeItem(userDetails.username);
      localStorage.setItem(user.username, JSON.stringify(user));
      console.log(localStorage)
      setUserDetails(user);
      setChangeUsername(false);
    } else {
      notifyUsernameTaken();
    }
  };

  const handleSubmitChangePassword = () => {
    const password = oldPasswordInput.current.value;
    if (password !== userDetails.password) {
      notifyIncorrectPassword();
    } else {
      if (
        newPasswordInput.current.value !== confirmNewPasswordInput.current.value
      ) {
        notifyUnmatchedNewPassword();
      } else {
        const user = {...userDetails};
        user.password = newPasswordInput.current.value;
        localStorage.removeItem(userDetails.username);
        localStorage.setItem(user.username, JSON.stringify(user));
        setUserDetails(user);
        setChangePassword(false);
      }
    }
  };

  return (
    <div className="settingsPage">
      <h1>Hi, {userDetails.username}!</h1>
      <div className="changeUsername">
      <p>Username:</p>
        {changeUsername && (
          <div className="inputs">
            <input ref={usernameInput} placeholder="username" />
            <button onClick={handleSubmitChangeUsername}>
              submit new username
            </button>
            <button onClick={() => setChangeUsername(false)}>cancel</button>
          </div>
        )}
        {!changeUsername && (
          <button onClick={handleChangeUsername}>change username</button>
        )}
      </div>
      <div className="changePassword">
      <p>Password:</p>
        {changePassword && (
          <div className="inputs">
            <input ref={oldPasswordInput} placeholder="old password" />
            <input ref={newPasswordInput} placeholder="new password" />
            <input
              ref={confirmNewPasswordInput}
              placeholder="confirm new password"
            />
            <button onClick={handleSubmitChangePassword}>
              submit new password
            </button>
            <button onClick={() => setChangePassword(false)}>cancel</button>
          </div>
        )}
        {!changePassword && (
          <button onClick={handleChangePassword}>change password</button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
