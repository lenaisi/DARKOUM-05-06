import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaLocationDot, FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar1';
import Footer from '../components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = ({ userId }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [hoveredHouse, setHoveredHouse] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get("http://localhost:5000/api/v1/auth/houses");
        setHouses(response.data);
        console.log("Fetched houses:", response.data); // Log fetched houses
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/auth/${userId}`);
        setFavorites(response.data.favorites.map((fav) => fav._id));
      } catch (err) {
        console.error("Erreur lors de la récupération des favoris:", err);
      }
    };

    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = async (houseId) => {
    try {
      if (favorites.includes(houseId)) {
        await axios.post(
          "http://localhost:5000/api/v1/auth/favorites/remove",
          { userId, houseId },
          { withCredentials: true }
        );
        setFavorites(favorites.filter((fav) => fav !== houseId));
        toast.error("Ce bien a été supprimé de vos favoris !");
      } else {
       const response= await axios.post(
        `http://localhost:5000/api/v1/auth/favorites/add/${userId}`,
          {  houseId },
          { withCredentials: true }
        );
        setFavorites([...favorites, houseId]);
        toast.success("Ce bien a été ajouté à votre liste de favoris !");
        console.log ('response.data',response.data,);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris:", err);
      toast.error("Une erreur est survenue lors de la mise à jour des favoris.");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
        <Navbar />
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>Chargement en cours...</div>
        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "50px", color: "#F27438" }} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const groupedHouses = houses.reduce((acc, house) => {
    if (!acc[house.typeBien]) {
      acc[house.typeBien] = [];
    }
    acc[house.typeBien].push(house);
    return acc;
  }, {});

  return (
    <div 
      style={{
        backgroundColor: "#f0f0f0",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        paddingTop: "120px",
      }}
    >
      <Navbar />
      <ToastContainer />

      <h1
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Nos biens disponibles
      </h1>

      {Object.keys(groupedHouses).map((category) => (
        <div key={category} style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              marginBottom: "20px",
              textTransform: "capitalize",
            }}
          >
            {category}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {groupedHouses[category].map((house) => {
              const imageUrls = house.images ? house.images.map(image => image.url) : [];

              return (
                <div
                  key={house._id}
                  style={{
                    width: "400px",
                    height: "400px",
                    boxShadow: hoveredHouse === house ? "0 0 20px rgba(0, 0, 0, 0.3)" : "0 0 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                    transition: "box-shadow 0.3s",
                  }}
                  onMouseEnter={() => setHoveredHouse(house)}
                  onMouseLeave={() => setHoveredHouse(null)}
                >
                  <Link
                    to={`/HouseDetails/${house._id}`}
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    <div style={{ height: "250px", overflow: "hidden" }}>
                      {imageUrls.length > 0 && (
                        <img
                          src={imageUrls[0]}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          alt="House"
                        />
                      )}
                    </div>
                    <div style={{ padding: "15px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        {house.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "5px", color: "#F27438" }}>
                            <FaLocationDot />
                          </span>
                          <span>{house.wilaya}</span>
                        </div>
                        <span style={{ marginTop: "10px", color: "#000" }}>
                          {house.price} DA
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleFavorite(house._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      backgroundColor: "white", // Ensure the heart is on a white background
                      borderRadius: "50%", // Optional: Make the background of the heart circular
                      padding: "5px", // Optional: Add some padding to the heart background
                    }}
                  >
                    {favorites.includes(house._id) ? (
                      <FaHeart style={{ color: "#F27438" }} />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}
      >
        <Link
          to="/myfavorites"
          style={{
            backgroundColor: "#F27438",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            padding: "10px  20px",
            borderRadius: "5px",
            textDecoration: "none",
            marginLeft: "600px",
            marginTop: "100px",
          }}
        >
          Accéder à mes favoris
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
