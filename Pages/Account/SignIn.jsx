import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  
  const handleSignIn = () => {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
    if (localStorage.getItem(username) === null) {
      alert("Username not found, please sign up!");
    } else {
      const userDetails = JSON.parse(localStorage.getItem(username));
      if (userDetails.password !== password) {
        alert("Incorrect password!");
    } else {
        navigate("/user");
        console.log(localStorage);
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
      <form>
        <input ref={usernameRef} placeholder="USERNAME" />
        <input ref={passwordRef} placeholder="PASSWORD" />
        <button onClick={handleSignIn}>SIGN IN</button>
        <button onClick={handleForgotPw}>FORGOT PASSWORD</button>
        <button onClick={handleSignUp}>SIGN UP</button>
      </form>
    </>
  );
};

export default SignIn;
