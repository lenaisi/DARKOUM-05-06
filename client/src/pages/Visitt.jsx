import React from 'react';
import { Link } from 'react-router-dom';
import ThreeSixtyViewer from '../components/ThreeSixtyViewer';

const Visitt = () => {
  const buttonStyle = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "orange",
    color: "white",
    borderRadius: "5px",
    fontSize: "18px",
    fontWeight: "bold",
  };

  return (
    <div>
      <h1>Visite 3D</h1>
      <ThreeSixtyViewer />
      <Link to="/search" style={buttonStyle}>
        <span>Retour à la recherche</span>
      </Link>
    </div>
  );
};

export default Visitt;
