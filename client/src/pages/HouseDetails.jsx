import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Navbar from '../components/Navbar1';
import Footer from '../components/footer';

const HouseDetails = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/admin/houses/${id}`);
        setHouse(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [id]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === house.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? house.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const createdAtDate = new Date(house.createdAt).toLocaleDateString();

  return (
    
    
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <div style={{ marginTop: "150px", fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <section style={{ marginBottom: "20px", position: "relative" }}>
          {house.images && house.images.length > 0 && (
            <div style={{ position: "relative" }}>
              <img
                src={house.images[currentImageIndex].url}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "10px"
                }}
                alt={`House ${currentImageIndex + 1}`}
              />
              <button
                onClick={handlePrevImage}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer"
                }}
              >
                <IoArrowBack size={24} />
              </button>
              <button
                onClick={handleNextImage}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer"
                }}
              >
                <IoArrowForward size={24} />
              </button>
            </div>
          )}
        </section>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#000", marginBottom: "10px" }}>{house.title}</h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <p style={{ fontSize: "18px", display: "flex", alignItems: "center", color: "#000", fontWeight: "bold" }}>
              <FaLocationDot style={{ marginRight: "5px", color: "#F27438" }} />
              {house.wilaya}
            </p>
            <p style={{ fontSize: "18px", color: "#000", fontWeight: "bold" }}>
              {house.price} DA
            </p>
          </div>
          <p style={{ fontSize: "18px", marginBottom: "10px", color: "#000" }}>
            <strong>Type de bien:</strong> {house.typeBien}
          </p>
          <p style={{ fontSize: "18px", marginBottom: "20px", color: "#000" }}>
            <strong>Type d'annonce:</strong> {house.typeAnnonce}
          </p>
          <p style={{ fontSize: "18px", marginBottom: "10px", color: "#000" }}>
            <strong>Ce bien été ajouté le </strong> {createdAtDate}
          </p>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#000", marginBottom: "10px" }}>Description</h2>
          <p style={{ fontSize: "18px", color: "#000" }}>{house.description}</p>
          <div style={{ marginTop: "20px" }}>
            <Link to={`/houses/${id}/visitt`} style={{ textDecoration: "none" }}>
              <button style={{ backgroundColor: "#F27438", color: "#FFF", padding: "10px 20px", marginRight: "10px", border: "none", borderRadius: "10px", cursor: "pointer" }}>
                Visite 3D
              </button>
            </Link>
            <Link to="/visit" style={{ textDecoration: "none" }}>
              <button style={{ backgroundColor: "#F27438", color: "#FFF", padding: "10px 20px", border: "none", borderRadius: "10px", cursor: "pointer" }}>
                Visite sur site
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/search" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IoArrowBackCircle style={{ fontSize: "24px", marginRight: "10px" }} />
          <span style={{ fontSize: "18px", color: "#000", fontWeight: "bold" }}>Retour à la recherche</span>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default HouseDetails;