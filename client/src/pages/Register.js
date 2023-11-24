import { message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, password };
    console.log(user);
    const response = await fetch("/api/users/register", {
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
      setName("");
      setEmail("");
      setPassword("");
      message.error(json.error);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: json });
      message.success("Register Succesfully");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="register">
        <div className="register-form">
          <form className="signup" onSubmit={handleSubmit}>
            <h1>POS APP</h1>
            <h3>Register Page</h3>
            <label>User Name:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

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
             <br/>
            <button>Sign up</button>
            <br/>
            <p style={{fontSize: "15px"}}>
                Already a user
                <Link to="/login" style={{fontSize: "15px"}}> Login here !</Link>
              </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
