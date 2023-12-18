import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../utils';

const Files = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const response = await axios.get(`${getBaseUrl()}/api/files`, config);
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileDownload = async (fileId, fileName) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
        responseType: 'blob',
      };
      const response = await axios.get(`${getBaseUrl()}/api/files/${fileId}`, config);

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFileDelete = async (fileId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.delete(`${getBaseUrl()}/api/files/${fileId}`, config);

      setFiles(files.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div>
      <h1>Files</h1>
      {files.map((file) => (
        <li key={file._id}>
          {file.filename}
          <button onClick={() => handleFileDownload(file._id, file.filename)}>Download</button>
          <button onClick={() => handleFileDelete(file._id)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default Files;
