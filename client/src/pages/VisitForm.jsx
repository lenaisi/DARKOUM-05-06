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
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.nomComplet || !formData.email || !formData.phoneNumber) {
                throw new Error('Veuillez remplir tous les champs obligatoires.');
            }
            if (!validateEmail(formData.email)) {
                throw new Error('Veuillez saisir une adresse e-mail valide.');
            }
            const response = await axios.post('http://localhost:5000/api/v3/formvisit/create', formData);
            console.log('Réponse du serveur :', response);
            navigate('/confirmation')
           
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
        }
    };
        
    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '500px' }}> 
                    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
                        <h2 style={{ ...styles.formTitle, ...styles.centerText, fontSize: '24px' }}>Demande de Visite</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}> 
                            <div style={styles.formGroup}>
                                <label style={{ ...styles.label, marginLeft: '50px' ,marginTop:'20px'}}>Nom Complet *:</label>
                                <input type="text" name="nomComplet" value={formData.nomComplet} onChange={handleChange} required />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={{ ...styles.label, marginLeft: '50px' }}>Email *:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={{ ...styles.label, marginLeft: '50px' }}>Téléphone *:</label>
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                            </div>
                            <div style={styles.formGroup}>
    <label style={{ ...styles.label, marginLeft: '50px' }}>Message:</label>
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
        alignItems: 'center',
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
        width: '100px',
        marginRight: '20px',
        fontWeight: 'bold',
    },
};

export default VisitForm;
