import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const customId = "custom-id-yes";

const SignUp = ({ setUserDetails, setLibrary }) => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const notifyInvalidEntry = () => {
    toast.error("Please input a valid entry, no spaces allowed!", {
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

  const notifyUsernameTaken = () => {
    toast.error("Username taken!", {
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

  const handleSignUp = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (
      username === "" ||
      password === "" ||
      username.includes(" ") ||
      password.includes(" ")
    ) {
      notifyInvalidEntry();
    } else if (localStorage.getItem(username) === null) {
      const newUserDetails = {
        username: username,
        password: password,
        library: [],
      };
      localStorage.setItem(
        newUserDetails.username,
        JSON.stringify(newUserDetails)
      ); //what other info we wanna keep?
      setUserDetails(newUserDetails);
      setLibrary([]);
      document.querySelector("body").classList.toggle("hideOverflow");
      navigate("/user");
    } else {
      notifyUsernameTaken();
    }
  };

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <>
      <form className="signUpPage">
        <p>SIGN UP</p>
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
        <button className="signUp" onClick={handleSignUp}>
          SIGN UP
        </button>
        <ToastContainer />
        <button type="button" className="signIn" onClick={handleSignIn}>
          SIGN IN
        </button>
      </form>
    </>
  );
};

export default SignUp;
