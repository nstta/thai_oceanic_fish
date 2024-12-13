import React from 'react';
import './App.css';
import oceanicFishImage from './assets/img/banner.jpg';
import cameraIcon from './assets/img/camera_icon.png'; 
import uploadIcon from './assets/img/upload_icon.png';

function App() {
  return (
    <div className="App">
      {/* Header Section */}
      <header style={styles.header}>
        <img src={oceanicFishImage} alt="Thai Oceanic Fish" style={styles.bannerImage} />
        <h1 style={styles.title}>ThaiOceanicFish.com</h1>
      </header>

      {/* Content Section */}
      <main style={styles.content}>
        <h2 style={styles.subtitle}>ทำความรู้จักสัตว์น้ำหลากหลายชนิด</h2>
        <div style={styles.actionContainer}>
          {/* Take Picture */}
          <div style={styles.actionItem}>
            <img src={cameraIcon} alt="ถ่ายรูป" style={styles.icon} />
            <p style={styles.actionText}>ถ่ายรูป</p>
          </div>
          {/* Upload Picture */}
          <div style={styles.actionItem}>
            <img src={uploadIcon} alt="อัปโหลดรูปภาพ" style={styles.icon} />
            <p style={styles.actionText}>อัปโหลดรูปภาพ</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  header: {
    position: 'relative',
    textAlign: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
  },
  title: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  },
  content: {
    textAlign: 'center',
    padding: '20px',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '50px',
  },
  actionItem: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  icon: {
    width: '70px',
    height: '70px',
    marginBottom: '10px',
  },
  actionText: {
    fontSize: '1.2rem',
  },
};

export default App;
