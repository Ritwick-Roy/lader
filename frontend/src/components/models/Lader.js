import axios from "axios";
import React, { useState } from "react";
import { getModelUrl } from "../../utils";


const Lader = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${getModelUrl()}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Lader</h1>      
      {!loading && (<>
        <h3>Upload file:</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Submit</button>
      </>)}
      {loading && (<div>Loading...</div>)}
    </div>
  );
};

export default Lader;
