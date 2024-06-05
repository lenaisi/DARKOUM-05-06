import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaLocationDot, FaHeart } from "react-icons/fa6";
import Navbar from '../components/Navbar1';
import Footer from '../components/footer';
import { IoArrowBackCircle } from "react-icons/io5";
import notFoundImage from "../assets/notfound.png"; 


  const MyFavorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/auth/${userId}`
        );
        setFavorites(response.data.favorites);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const removeFavorite = async (favoriteId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/auth/favorites/remove",
        { userId, houseId: favoriteId },
        { withCredentials: true }
      );

      setFavorites(favorites.filter(favorite => favorite._id !== favoriteId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const cardStyle = {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    width: "calc(33.33% - 20px)", 
    maxWidth: "300px",
    position: "relative", 
    display: "flex", 
    justifyContent: "space-between" 
  };

  const cardContentStyle = {
    padding: "20px",
    flexGrow: 1 
  };

  const titleStyle = {
    fontSize: "18px",
    marginBottom: "10px"
  };

  const infoStyle = {
    marginBottom: "5px",
    display: "flex", 
    alignItems: "center" 
  }

  const heartIconStyle = {
    cursor: "pointer",
    color: "#F27438" 
  };

  const locationIconStyle = {
    marginRight: "5px",
    color: "#F27438" 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />

      {favorites.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '800px', padding: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', borderRadius: '10px', background: 'white' }}>
            <img src={notFoundImage} style={{ width: '300px', height: 'auto', marginRight: '20px' }} alt="Not found" />
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Aucun favori trouvé pour l'instant.</p>
              <p>Vous n'avez pas encore ajouté de biens à votre liste de favoris. Les biens que vous ajouterez à votre liste de favoris seront affichés ici.</p>
              <div style={{ textAlign: "right" }}>
      <a href="/search"  style={{ color: "#F27438",fontWeight: "bold", textDecoration: "none",}}
      >
        <IoArrowBackCircle style={{ display: "inline-block", verticalAlign: "middle" }} />
        &nbsp; Retour à la recherche </a>
    </div>

            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "200px", margin: "20px", position: "relative" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Mes Biens Favoris</h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {favorites.map((favorite) => (
              <div key={favorite._id} style={cardStyle}>
                <Link to={`/HouseDetails/${favorite._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={cardContentStyle}>
                    <h2 style={titleStyle}>{favorite.title}</h2>
                    <p style={infoStyle}>
                      <FaLocationDot style={locationIconStyle} />
                      {favorite.wilaya}
                    </p>
                    <p style={infoStyle}>{favorite.price} DA </p>
                  </div>
                </Link>
                <FaHeart
                  style={heartIconStyle}
                  onClick={() => removeFavorite(favorite._id)}
                />
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: "20px", right: "20px", display: "flex", alignItems: "center" }}>
            <IoArrowBackCircle style={{ fontSize: "20px", marginRight: "5px", color: "#F27438" }} />
            <Link to="/search" style={{ fontSize: "20px", fontWeight: "bold", color: "#F27438", textDecoration: "none" }}>Retour à la recherche</Link>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyFavorites;
