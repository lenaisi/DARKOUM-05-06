import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/footer";
import Section from "../components/Section";
import Properties from "../components/properties";
import { RiStarSLine, RiStarSFill } from "react-icons/ri";
import SimpleSection from "../components/SimpleSection";
import { useSelector } from "react-redux";
import Rating from "react-rating-stars-component"; // Import the rating component

const Home = ({ userId }) => {
  const [avis, setAvis] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [commentError, setCommentError] = useState(""); // State for comment error message
  const [ratingError, setRatingError] = useState(""); // State for rating error message

  const { currentUser } = useSelector((state) => state.user);
  const userID = currentUser.user._id;

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v4/avis/avis");
        setAvis(response.data.data.avis);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      }
    };

    fetchAvis();
  }, []);

  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= note) {
        stars.push(<RiStarSFill key={i} style={{ color: "#F27438" }} />);
      } else {
        stars.push(<RiStarSLine key={i} style={{ color: "#F27438" }} />);
      }
    }
    return stars;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (newComment.trim() === "") {
      setCommentError("Commentaire vide. Veuillez écrire un commentaire.");
      isValid = false;
    } else {
      setCommentError("");
    }

    if (newRating === 0) {
      setRatingError("Veuillez noter avant de soumettre.");
      isValid = false;
    } else {
      setRatingError("");
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v4/avis/avis", {
        contenu: newComment,
        note: newRating,
        utilisateur: userID,
      });
      setAvis([...avis, response.data.data.avis]);
      setNewComment("");
      setNewRating(0);
      setCommentError(""); // Clear error message on successful submission
      setRatingError(""); // Clear error message on successful submission
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            background-color: #F5F5FA; /* Fond gris */
          }

          .avis-container {
            padding: 20px;
            background-color: black;
            color: white;
            margin-bottom: 50px;
          }

          .avis-title {
            font-size: 30px;
            margin-bottom: 20px;
            font-family: __Montserrat_901710,__Montserrat_Fallback_901710;
            font-style: normal;
            marginLeft: "50px";
          }

          .avis-card {
            background-color: white;
            color: black;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .stars {
            display: flex;
          }

          .user-name {
            margin-top: 5px;
            font-weight: bold;
          }

          .simpleSection {
            margin-top: -50px; /* Fait monter le composant */
            margin-bottom: 50px; /* Ajoute de l'espace en bas */
            display: flex;
            justify-content: center;
          }

          .comment-form {
            background-color: white;
            color: black;
            padding: 20px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .comment-form textarea {
            width: 100%;
            height: 80px;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            resize: none; /* Empêche le redimensionnement */
            font-family: Arial, sans-serif; /* Police améliorée */
            font-size: 14px; /* Taille de police plus grande */
          }

          .comment-form .rating-container {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }

          .comment-form .error-message {
            color: red;
            margin-bottom: 10px;
          }

          .comment-form button {
            padding: 10px 20px;
            background-color: #F27438;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .comment-form button:hover {
            background-color: #d0632b;
          }
        `}
      </style>

      <div className="navbar">
        <Navbar1 />
      </div>

      <div
        className="title-container"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <h1
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            marginTop: "90px",
            fontFamily: "Amiri, sans-serif",
            fontWeight: "bold",
          }}
        >
          Annonces immobilières en Algérie
        </h1>
        <p
          style={{
            fontSize: "15px",
            marginBottom: "30px",
            fontFamily: "Amiri, sans-serif",
            fontWeight: "bold",
          }}
        >
          Darkoum est la plateforme idéale pour trouver votre bien immobilier en
          Algérie! Pour toutes vos recherches utilisez le filtre ci-dessous:
        </p>
      </div>

      <div className="section">
        <Section />
      </div>

      <div className="properties">
        <Properties />
      </div>

      <div className="simpleSection">
        <SimpleSection />
      </div>

      <div className="space-between-sections"></div>

      <div className="avis-container">
        <h2 className="avis-title">
          Darkoum, c'est vous qui en parlez le mieux ...
        </h2>
        <div className="avis-cards">
          {avis.map((avisItem, index) => (
            <div key={index} className="avis-card">
              <h3>{avisItem.contenu}</h3>
              <div className="stars">{renderStars(avisItem.note)}</div>
              <div className="user-name">
                Par {avisItem.utilisateur ? avisItem.utilisateur.nomComplet : "Utilisateur inconnu"}
              </div>
            </div>
          ))}
        </div>

        <div className="comment-form">
          <h3>Ajouter un commentaire</h3>
          <form onSubmit={handleSubmit}>
            {commentError && <div className="error-message">{commentError}</div>}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Écrivez votre commentaire ici"
              required
            />
            {ratingError && <div className="error-message">{ratingError}</div>}
            <div className="rating-container">
              <Rating
                count={5}
                onChange={(newRating) => setNewRating(newRating)}
                size={24}
                activeColor="#F27438"
              />
            </div>
            <button type="submit">Soumettre</button>
          </form>
        </div>
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
