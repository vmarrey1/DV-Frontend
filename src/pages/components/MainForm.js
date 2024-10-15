
import "./MainForm.css";
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EnterFile() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
 
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
     
      const response = await axios.post('http://54.219.131.177/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('File uploaded successfully');
        navigate('/data')

      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('Failed to upload file', error);
    }
  };

  return (
    <Form className = "Data2" onSubmit={handleSubmit} >
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label className="labelformstyle">File Input</Form.Label>
        <Form.Control  
          className="controlstyle" 
          type="file"  
          onChange={handleFileChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
}

export default EnterFile;
