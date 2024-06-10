import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/footer";
import Section from "../components/Section";
import Properties from "../components/properties";
import { RiStarSLine, RiStarSFill } from "react-icons/ri";
import SimpleSection from "../components/SimpleSection";
import { useSelector } from "react-redux";

const Home = ({userId}) => {
  const [avis, setAvis] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  console.log('user',userId)
  // console.log('userId',userId._id)
  const { currentUser } = useSelector((state) => state.user);
  console.log('currentUser',currentUser)
  const userID=currentUser.user._id;
  console.log('userID',userID)



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
    try {
      const response = await axios.post("http://localhost:5000/api/v4/avis/avis", {
        contenu: newComment,
        note: newRating,
        utilisateur:userID// Update this as needed
      });
      console.log('response data',response.data)
      setAvis([...avis, response.data.data.avis]);
      console.log('avis',avis)
      setNewComment("");
      setNewRating(0);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);

    }
  };

  return (
    <div>
      <style>
        {`
          body {
            background-color:#F5F5FA; /* Fond gris */
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
            marginLeft : "50px";
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
          }

          .comment-form select, .comment-form button {
            padding: 10px;
            margin-right: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
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
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Écrivez votre commentaire ici"
              required
            />
            <div>
              <select
                value={newRating}
                onChange={(e) => setNewRating(parseInt(e.target.value))}
                required
              >
                <option value="">Choisissez une note</option>
                <option value="1">1 étoile</option>
                <option value="2">2 étoiles</option>
                <option value="3">3 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="5">5 étoiles</option>
              </select>
              <button type="submit">Soumettre</button>
            </div>
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