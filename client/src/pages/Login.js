import { message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      message.error(json.error);
    }
    if (response.ok) {
      message.success("Login Successful");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      console.log(json);
      navigate("/");
    }
  };
  return (
    <>
      <div className="login">
        <div className="login-form">
          <form className="loginn" onSubmit={handleSubmit}>
            <h1>POS APP</h1>
            <h3>Login Page</h3>

            <label>Email address:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button>Login</button>
            <br/>
            <p style={{fontSize: "15px"}}>
                Not a user Please
                <Link to="/register" style={{fontSize: "15px"}}> Register Here !</Link>
              </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
