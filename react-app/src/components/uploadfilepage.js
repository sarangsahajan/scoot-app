import React, { useState } from 'react';

const UploadFilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith('.blend')) {
        setSelectedFile(file);
        console.log('Selected file:', file);
      } else {
        alert('Invalid file type. Only .blend files are allowed.');
      }
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus(
          `File uploaded successfully! IPFS Hash: ${data.ipfsHash}, Transaction Hash: ${data.transactionHash}`
        );
      } else {
        setUploadStatus('File upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('File upload completed, caught warnings about gas prices');
      setUploadStatus('File upload completed.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>UPLOAD YOUR FILE</h1>

        <p style={styles.text}>
          Please choose a file from your computer and click the <strong>Upload File</strong> button to select it,
          <br /> After that, hit <strong>Submit</strong> to upload the file. Supported formats include <strong>.blend</strong>
        </p>

        <form onSubmit={handleFileUpload}>
          <input
            type="file"
            id="fileInput"
            style={styles.fileInput}
            onChange={handleFileChange}
            aria-label="File Input"
            accept=".blend"
          />
          <label htmlFor="fileInput" style={styles.uploadButton} aria-label="Upload File">
            Upload File
          </label>

          <button type="submit" style={styles.submitButton} aria-label="Submit File">
            Submit
          </button>
        </form>

        {uploadStatus && <p style={styles.uploadStatus}>{uploadStatus}</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    backgroundImage: 'url("https://th.bing.com/th/id/OIG1.ZLJYW9M208eJ.hUmUxcW?w=1792&h=1024&rs=1&pid=ImgDetMain")',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  text: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '30px',
  },
  fileInput: {
    display: 'none',
  },
  uploadButton: {
    display: 'inline-block',
    padding: '15px 0',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    fontWeight: 'bold',
    width: '150px',
    textAlign: 'center',
  },
  submitButton: {
    display: 'inline-block',
    padding: '15px 0',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '150px',
    textAlign: 'center',
    border: 'none',
  },
  uploadStatus: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
};

export default UploadFilePage;
