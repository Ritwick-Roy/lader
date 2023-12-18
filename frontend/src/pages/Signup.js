import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils/index";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${getBaseUrl()}/api/user/register`,{name,email,password})
      .then((res) => {
        console.log(res.data);
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate('/',{ replace: true });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div className="login-signup">
      <h1>Signup</h1>
      <form id="form" onSubmit={handleSubmit}>
        Name: 
        <input
          id="input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        Email:
        <input
          id="input"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        Password: 
        <input
          id="input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit" value="Submit">
          Register
        </button>
        <button onClick={() => {navigate("/login")}}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
