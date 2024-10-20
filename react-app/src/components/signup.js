import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log('Sign Up Form Submitted:', { username, email, password });
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Username:</label>
            <div style={styles.inputWrapper}>
              <FaUser style={styles.icon} />
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
                style={styles.inputWithIcon}
              />
            </div>
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Email:</label>
            <div style={styles.inputWrapper}>
              <FaEnvelope style={styles.icon} />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                style={styles.inputWithIcon}
              />
            </div>
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.icon} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                style={styles.inputWithIcon}
              />
            </div>
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Confirm Password:</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.icon} />
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required
                style={styles.inputWithIcon}
              />
            </div>
          </div>
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.linkText}>Already have an account? <Link to="/signin" style={styles.link}>Sign In</Link></p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/929/4/853/abstract-ae-plexus-wallpaper-preview.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '30px',
    borderRadius: '10px',
    width: '350px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: 'white',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    color: 'white',
    marginBottom: '5px',
    display: 'block',
    fontSize: '14px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0 10px',
    backgroundColor: 'white',
  },
  icon: {
    marginRight: '10px',
    color: 'black',
  },
  inputWithIcon: {
    flex: 1,
    padding: '10px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'white',
    color: '#333',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  linkText: {
    marginTop: '15px',
    color: 'white',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default SignUp;
