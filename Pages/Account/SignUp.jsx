import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setUserDetails }) => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSignUp = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (username === "" || password === "") {
      alert("Please input a valid entry!");
    } else if (localStorage.getItem(username) === null) {
      const newUserDetails = {
        username: username,
        password: password,
        playlists: [],
      };
      localStorage.setItem(
        newUserDetails.username,
        JSON.stringify(newUserDetails)
      ); //what other info we wanna keep?
      setUserDetails(newUserDetails);
      document.querySelector("body").classList.toggle("hideOverflow");
      navigate("/user");
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
      <form>
        <input ref={usernameRef} placeholder="USERNAME" />
        <input ref={passwordRef} placeholder="PASSWORD" />
        <button type="button" onClick={handleSignUp}>
          SIGN UP
        </button>
        <button type="button" onClick={handleForgotPw}>
          FORGOT PASSWORD
        </button>
        <button type="button" onClick={handleSignIn}>
          SIGN IN
        </button>
      </form>
    </>
  );
};

export default SignUp;
