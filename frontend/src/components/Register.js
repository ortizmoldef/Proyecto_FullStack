import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/register.scss';  // Asegúrate de importar correctamente el archivo SCSS

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({ username, password });
            const response = await axios.post('http://localhost:5000/api/register', { username, password });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.log('Error al registrar el usuario', error.response ? error.response.data : error);
        }
    };

    return (
        <div className={styles['register-container']}>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Usuario'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles['register-button']} type='submit'>Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
