import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ userDetails, setUserDetails }) => {
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
      <input ref={usernameRef} placeholder="USERNAME" />
      <input ref={passwordRef} placeholder="PASSWORD" />
      <button onClick={handleSignIn}>SIGN IN</button>
      <button onClick={handleForgotPw}>FORGOT PASSWORD</button>
      <button onClick={handleSignUp}>SIGN UP</button>
    </>
  );
};

export default SignIn;
