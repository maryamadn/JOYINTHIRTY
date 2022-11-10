import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const customId = "custom-id-yes";

const SignIn = ({ setUserDetails, setLibrary }) => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const notifyUsername = () => {
    toast.error("Username not found!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: customId,
    });
  };

  const notifyPassword = () => {
    toast.error("Incorrect password!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: customId,
    });
  };

  const handleSignIn = (event) => {
    event.preventDefault()
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (localStorage.getItem(username) === null) {
      notifyUsername();
    } else {
      if (JSON.parse(localStorage.getItem(username)).password !== password) {
        notifyPassword();
      } else {
        setUserDetails(JSON.parse(localStorage.getItem(username)));
        setLibrary(JSON.parse(localStorage.getItem(username)).library);
        document.querySelector("body").classList.toggle("hideOverflow");
        navigate("/user");
      }
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <form className="signInPage">
        <p>SIGN IN</p>
        <input
          className="usernameInput"
          ref={usernameRef}
          placeholder="username"
        />
        <input
          className="passwordInput"
          ref={passwordRef}
          placeholder="password"
        />
        <button className="signIn" onClick={handleSignIn}>
          SIGN IN
        </button>
        <ToastContainer />
        <button type="button" className="signUp" onClick={handleSignUp}>
          SIGN UP
        </button>
      </form>
    </>
  );
};

export default SignIn;
