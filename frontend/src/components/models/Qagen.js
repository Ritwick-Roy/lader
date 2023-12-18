import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const Qagen = () => {

const navigate = useNavigate();

  useEffect(() => {
    const loggedin = localStorage.getItem("token");
    if (!loggedin) {
      navigate("/login");
    }
  }, []);  //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>Qagen</div>
  )
}

export default Qagen