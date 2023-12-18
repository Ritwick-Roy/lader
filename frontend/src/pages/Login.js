import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils/index";

const Login = () => {
  const navigate = useNavigate();
  const [token,setToken]=useState("");
  useEffect(()=>{
    const loggedin=localStorage.getItem("token");
    if(loggedin)
    {
      navigate('/');
    }
    setToken(loggedin);
  },[navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${getBaseUrl()}/api/user/login`, { email, password })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/",{ replace: true });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div className="login-signup">
      <h1>Login</h1>
      <form id="form" onSubmit={handleSubmit}>
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
          Login
        </button>
        <button onClick={() => {navigate("/signup")}}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Login;
