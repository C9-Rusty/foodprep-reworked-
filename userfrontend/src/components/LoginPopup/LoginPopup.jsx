import { useState, useEffect } from "react";
import { useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const decodeJwtResponse = (token) => {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const [curState, setCurState] = useState("Log In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (curState === "Log In") newUrl += "/api/user/login";
    else newUrl += "/api/user/register";

    try {
      const response = await axios.post(newUrl, data);
      if (curState === "Sign Up") {
        toast.success("Account created successfully! Please log in");
        setCurState("Log In");
      } else {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {curState !== "Log In" ? (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your Name"
              required
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{curState}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to terms & privacy policy</p>
        </div>
        {curState === "Log In" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurState("Log In")}>Log in here</span>
          </p>
        )}

        <hr />

        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const backendResponse = await axios.post(
                `${url}/api/user/google-login`,
                {
                  credential: credentialResponse.credential,
                }
              );
              setToken(backendResponse.data.token);
              localStorage.setItem("token", backendResponse.data.token);
              setShowLogin(false);
              toast.success("Logged in successfully with Google");
            } catch (error) {
              console.error(error);
              toast.error("Google login failed");
            }
          }}
          onError={() => {
            toast.error("Google login failed");
          }}
          useOneTap
        />
      </form>
    </div>
  );
};

export default LoginPopup;
