import React, { useContext, useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Login = ({ url }) => {
  const navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

 const onLogin = async (event) => {
  event.preventDefault();

  console.log("📨 Submitting form:", data.email, data.password);

  try {
    const response = await axios.post(url + "/api/user/login", data);

    console.log("🎯 Login response:", response.data);

    if (response.data.role === "admin") {
      console.log("✅ Admin role confirmed");

      setToken(response.data.token);
      setAdmin(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(true));

      toast.success("Login Successful");
      navigate("/add");
    } else {
      console.log("❌ Role not admin:", response.data.role);
      toast.error("You are not an admin");
    }
  } catch (error) {
    console.error("❌ Login error caught:", error);
    console.error("🔍 Response:", error?.response?.data);

    toast.error(
      error?.response?.data?.message || "Login failed (catch block)"
    );
  }
};



  useEffect(() => {
    if (admin && token) {
      navigate("/add");
    }
  }, [admin, token]);

  


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <div className="login-popup-inputs">
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
