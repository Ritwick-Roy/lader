import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl, getModelUrl } from "../../utils";


const Docan = () => {
  const [refresh, setRefresh] = useState();
  const [token, setToken] = useState("");
  const [file, setFile] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const navigate = useNavigate();
  const [processedFile, setProcessedFile] = useState(null);

  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedin = localStorage.getItem("token");
    setToken(loggedin);
    console.log(loggedin);
    axios
      .get(`${getBaseUrl()}/api/user`, {
        headers: {
          "x-auth-token": loggedin,
        },
      })
      .then((result) => {
        setUser(result.data);
        console.log(result.data);
      });
  }, [refresh]);

  useEffect(() => {
    const loggedin = localStorage.getItem("token");
    if (!loggedin) {
      navigate("/login");
    }
    setToken(loggedin);
    console.log(token);
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${getModelUrl()}/api/docan`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Once processed, set the processed file state
      setProcessedFile(response.data.marked_pdf);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Docan</h1>
      <h3>Upload file:</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      {processedFile && (
        <div>
          <p>Processed File:</p>
          <iframe src={`data:application/pdf;base64,${processedFile}`} width="100%" height="600px"></iframe>
        </div>
      )}
    </div>
  );
};

export default Docan;
