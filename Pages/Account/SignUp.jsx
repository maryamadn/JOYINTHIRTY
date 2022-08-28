import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  
  const handleSignUp = () => {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
    if (username === "" || password === "") {
      alert("Please input a valid entry!");
    } else if (localStorage.getItem(username) === null) {
      const userDetails = {
        //===================================probably need to setstate
        password: password,
        playlists: [],
      };
      localStorage.setItem(username, JSON.stringify(userDetails)); //what other info we wanna keep?
      navigate("/user");
      console.log(localStorage);
    } else {
      alert("Username taken!");
    }
  };

  const handleSignIn = () => {
    navigate("/");
  };

  const handleForgotPw = () => {
    navigate("/forgotpw");
  };


  return (
    <>
      <input ref={usernameRef} placeholder="USERNAME" />
      <input ref={passwordRef} placeholder="PASSWORD" />
      <button onClick={handleSignUp}>SIGN UP</button>
      <button onClick={handleForgotPw}>FORGOT PASSWORD</button>
      <button onClick={handleSignIn}>SIGN IN</button>
    </>
  );
};

export default SignUp;
