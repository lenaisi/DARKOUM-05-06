import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import home1 from "../assets/q11.jpeg" 
import home2 from "../assets/q12.jpeg"
import home3 from "../assets/q13.jpeg"

const Propertie = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleTitleHover = () => {
    setIsTitleHovered(true);
  };

  const handleTitleLeave = () => {
    setIsTitleHovered(false);
  };

  return (
    <div className="properties" style={{ marginTop: '50px' }}>
      <h2 
        className={`properties-title ${isTitleHovered ? 'orange' : ''}`} 
        style={{ marginBottom: '50px' }}
        onMouseEnter={handleTitleHover}
        onMouseLeave={handleTitleLeave}
      >
        Nos Services
      </h2>
      <div className="property-list">
        <div className="property-item">
          <Link to="" className="property-link">
            <div 
              className={`image-text-wrapper ${hoveredItem === 0 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={home1} alt="Visite virtuelle" className="property-image" />
              <div className="text-wrapper">
                <p className="property-title">Visite Virtuelle</p>
                <p className="property-description">
                  Explorez chaque recoin de votre future maison, où que vous soyez et à tout moment. Découvrez une nouvelle façon de visiter des propriétés avec notre application innovante.
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="property-item">
          <Link to="" className="property-link">
            <div 
              className={`image-text-wrapper ${hoveredItem === 1 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={home2} alt="Bon plan" className="property-image" />
              <div className="text-wrapper">
                <p className="property-title">Bon Plan</p>
                <p className="property-description">
                  Profitez de nos prix imbattables et trouvez votre prochain chez-vous à un coût qui défie toute concurrence. Ne manquez pas cette chance unique.
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="property-item">
          <Link to="" className="property-link">
            <div 
              className={`image-text-wrapper ${hoveredItem === 2 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={home3} alt="Votre maison" className="property-image" />
              <div className="text-wrapper">
                <p className="property-title">Votre Maison</p>
                <p className="property-description">
                  Découvrez des biens immobiliers d'une qualité exceptionnelle, avec une attention méticuleuse portée aux détails et un niveau de confort incomparable.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style>
        {`
          .properties {
            padding: 50px 0;
            text-align: center;
            background-color: #f5f5f5;
          }

          .properties-title {
            font-size: 3em;
            font-weight: bold;
            color: #333;
            transition: color 0.3s ease;
          }

          .properties-title.orange {
            color: orange;
          }

          .property-list {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
          }

          .property-item {
            margin: 20px;
            flex: 1;
            min-width: 280px;
            max-width: 320px;
          }

          .property-link {
            text-decoration: none;
            color: inherit;
          }

          .image-text-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .property-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 15px;
            transition: transform 0.3s ease;
          }

          .property-image:hover {
            transform: scale(1.05);
          }

          .text-wrapper {
            text-align: center;
          }

          .property-title {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
          }

          .property-description {
            font-size: 1em;
            color: #666;
            max-width: 300px;
            margin: 0 auto;
          }

          .image-text-wrapper.hovered .property-image {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
}

export default Propertie;
