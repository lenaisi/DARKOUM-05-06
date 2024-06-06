import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const VisitForm = () => {
    const [formData, setFormData] = useState({
        nomComplet: '',
        email: '',
        phoneNumber: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [titleColor, setTitleColor] = useState('#000'); // État pour gérer la couleur du titre

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^(05|06|07)\d{8}$/;
        return regex.test(phoneNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Réinitialiser les erreurs
        const newErrors = {};

        if (!formData.nomComplet) {
            newErrors.nomComplet = 'Veuillez remplir le champ Nom Complet.';
        }
        if (!formData.email) {
            newErrors.email = 'Veuillez remplir le champ Email.';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Veuillez saisir une adresse e-mail valide.';
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Veuillez remplir le champ Téléphone.';
        } else if (!validatePhoneNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Veuillez saisir un numéro de téléphone valide (10 chiffres, commence par 05, 06 ou 07).';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v3/formvisit/create', formData);
            console.log('Réponse du serveur :', response);
            navigate('/confirmation');
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '500px', backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginBottom: '90px' }}>
                    <div>
                        <h2 
                            style={{ ...styles.formTitle, ...styles.centerText, fontSize: '24px', color: titleColor }} 
                            onMouseEnter={() => setTitleColor('orange')} 
                            onMouseLeave={() => setTitleColor('#000')}
                        >
                            Demande de Visite
                        </h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}> 
                            <div style={styles.formGroup}>
                                <label style={{ ...styles.label, marginTop: '20px' }}>Nom Complet *:</label>
                                <input type="text" name="nomComplet" value={formData.nomComplet} onChange={handleChange} required />
                                {errors.nomComplet && <p style={styles.errorText}>{errors.nomComplet}</p>}
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email *:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Téléphone *:</label>
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                                {errors.phoneNumber && <p style={styles.errorText}>{errors.phoneNumber}</p>}
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Message:</label>
                                <textarea 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    rows="4" 
                                    style={{ marginTop: '10px' }} 
                                    placeholder="Écrivez votre message ici " 
                                    required 
                                />
                            </div>
                            <div style={{ ...styles.buttonGroup, marginTop: '20px' }}>
                                <button type="button" style={styles.cancelButton}>Annuler</button>
                                <button type="submit" style={styles.sendButton}>Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    formTitle: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column', // Align items vertically
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        marginRight: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    sendButton: {
        backgroundColor: '#F27438',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    centerText: {
        textAlign: 'center',
    },
    label: {
        width: '150px', // Adjust the width if necessary
        marginRight: '20px',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px',
    }
};

export default VisitForm;
