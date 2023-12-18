import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils/index";

const PatientDetails = () => {
  const [doctors, setDoctors] = useState({});
  const { patientId } = useParams();
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [token,setToken]=useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    const loggedin=localStorage.getItem("token");
    if(!loggedin)
    {
      navigate('/login');
    }
    setToken(loggedin);
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${getBaseUrl()}/api/appointment`, {
      patientId,
      date,
      description,
    },{headers:{
      'x-auth-token':token
    }});
    navigate("/appointments");
  };

  useEffect(() => {
    axios.get(`${getBaseUrl()}/api/doctor/` + patientId).then((res) => {
      setDoctors(res.data);
    });
  }, [patientId]);
  
  return (
    <div>
      <h1>Details of - {doctors.name} </h1>
      <div className="card" key={doctors.name}>
        <h2>doctor: {doctors.name}</h2>
        <p>Doctor: {doctors.email}</p>
        <p>Specialization: {doctors.specialization}</p>
      </div>
      <h1>Create Appointments</h1>
      <form onSubmit={handleSubmit}>
        <label>Preferred date:</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        ></input>
        <label>Description:</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientDetails;
