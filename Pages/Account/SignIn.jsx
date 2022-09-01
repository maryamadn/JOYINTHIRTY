import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setUserDetails, setLibrary }) => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSignIn = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (localStorage.getItem(username) === null) {
      alert("Username not found, please sign up!");
    } else {
      if (JSON.parse(localStorage.getItem(username)).password !== password) {
        alert("Incorrect password!");
      } else {
        setUserDetails(JSON.parse(localStorage.getItem(username)));
        setLibrary(JSON.parse(localStorage.getItem(username)).library)
        document.querySelector("body").classList.toggle("hideOverflow");
        navigate("/user");
      }
    }
  };

  const handleForgotPw = () => {
    navigate("/forgotpw");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
    <div className="signInPage">
      <input className="usernameInput" ref={usernameRef} placeholder="USERNAME" />
      <input className="passwordInput" ref={passwordRef} placeholder="PASSWORD" />
      <button className="signIn" onClick={handleSignIn}>SIGN IN</button>
      <button className="forgotPassword" onClick={handleForgotPw}>FORGOT PASSWORD</button>
      <button className="signUp" onClick={handleSignUp}>SIGN UP</button>
    </div>
    </>
  );
};

export default SignIn;
