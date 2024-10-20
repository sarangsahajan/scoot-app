import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    navigate('/uploadfilepage');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div style={styles.inputContainer}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>

          <p style={styles.signUpText}>
            <span style={styles.orText}>Or</span>
            <span onClick={handleSignUp} style={styles.signUpLink}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '30px',
    borderRadius: '10px',
    width: '350px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'white',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  icon: {
    marginRight: '10px',
    color: 'white',
    fontSize: '24px',
    minWidth: '30px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    fontSize: '16px',
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
    textAlign: 'center',
    marginBottom: '10px',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: '16px',
  },
  orText: {
    color: 'white',
  },
  signUpLink: {
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
};

export default SignInPage;
