import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import GiteIcon from '@mui/icons-material/Gite';
import FeedbackIcon from '@mui/icons-material/Feedback'; // Import the new icon

function Sidebar() {
    return (
        <div className="sidebar" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '200px',
            backgroundColor: '#000',
            padding: '20px',
            boxSizing: 'border-box',
            zIndex: "1",
        }}>
            <ul>
                <li style={{ listStyleType: 'none', padding: 0, marginBottom: '35px' }}>
                    <Link to="/admin" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
                        <WavingHandIcon /> Accueil
                    </Link>
                </li>
                <li style={{ marginBottom: '35px' }}>
                    <Link to="/users" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
                        <AccountCircleIcon /> Utilisateurs
                    </Link>
                </li>
                <li style={{ marginBottom: '35px' }}>
                    <Link to="/OurHomes" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
                        <HomeIcon /> Biens disponibles
                    </Link>
                </li>
                <li style={{ marginBottom: '35px' }}>
                    <Link to="/AddHomes" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
                        <GiteIcon /> Ajouter un bien
                    </Link>
                </li>
                <li style={{ marginBottom: '35px' }}>
                    <Link to="/DemandeVisit" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
                        <ListIcon /> Demandes de visites
                    </Link>
                </li>
                <li style={{ marginBottom: '35px' }}>
                    <Link to="/Avis" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
                        <FeedbackIcon /> Avis des utilisateurs
                    </Link>
                </li>
                <li style={{ marginBottom: '35px' }}>
                    <Link to="/logout" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
                        <LogoutIcon /> Déconnexion
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
