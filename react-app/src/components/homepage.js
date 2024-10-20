import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [activeLink, setActiveLink] = useState('home');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div style={styles.page}>
      <div style={styles.navbar}>
        <div style={styles.navLinks}>
          <a
            href="#home"
            style={{
              ...styles.navButton,
              color: activeLink === 'home' ? '#007bff' : 'white',
            }}
            onClick={() => handleLinkClick('home')}
          >
            HOME
          </a>
          <a
            href="#about"
            style={{
              ...styles.navButton,
              color: activeLink === 'about' ? '#007bff' : 'white',
            }}
            onClick={() => handleLinkClick('about')}
          >
            ABOUT US
          </a>
          <a
            href="#services"
            style={{
              ...styles.navButton,
              color: activeLink === 'services' ? '#007bff' : 'white',
            }}
            onClick={() => handleLinkClick('services')}
          >
            SERVICES
          </a>
          <a
            href="#rewards"
            style={{
              ...styles.navButton,
              color: activeLink === 'rewards' ? '#007bff' : 'white',
            }}
            onClick={() => handleLinkClick('rewards')}
          >
            REWARDS
          </a>
        </div>

        <div style={styles.scootHeading}>
          SCOOT
        </div>

        <button onClick={handleSignIn} style={styles.signInButton}>
          Sign In
        </button>
      </div>

      <div style={styles.mainContainer}>
        <h1 style={styles.boldText}>UNLEASH THE FUTURE OF GPU RENDERING—FAST, SECURE, AND LIMITLESS!</h1>

        <p style={styles.lightText}>
          Accelerate your GPU rendering with our cutting-edge solution, providing secure, decentralized computing for faster and more cost-efficient 3D visuals. Harness global GPU resources for unmatched performance and scalability. Enjoy seamless, transparent rendering without the usual limitations!.
        </p>

        <div style={styles.buttonContainer}>
          <button onClick={handleGetStarted} style={styles.getStartedButton}>
            Get Started ➔
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/929/4/853/abstract-ae-plexus-wallpaper-preview.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
  },
  navLinks: {
    display: 'flex',
    flex: 1,
  },
  navButton: {
    margin: '0 15px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    textDecoration: 'none',
    transition: 'color 0.3s',
    textTransform: 'uppercase',
  },
  scootHeading: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '60px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)',
    letterSpacing: '5px',
    fontStyle: 'italic',
    fontFamily: "'Lobster', cursive",
  },
  signInButton: {
    marginLeft: 'auto',
    marginRight: '10%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  mainContainer: {
    backgroundColor: 'black',
    padding: '30px',
    borderRadius: '12px',
    position: 'absolute',
    top: '50%',
    left: '0',
    transform: 'translateY(-50%)',
    marginLeft: '50px',
    maxWidth: '600px',
  },
  boldText: {
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'white',
  },
  lightText: {
    fontSize: '30px',
    fontWeight: 'lighter',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  getStartedButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '15px 30px',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default HomePage;
