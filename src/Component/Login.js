// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const BASE_URL='http://localhost:5000'
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/login`, { username, password });
            localStorage.setItem('token', res.data.token);
navigate('/dashboard');
            toast.success("Logged in successfully!");  // Success toast
        } catch (err) {
            console.error('Error in login:', err.response ? err.response.data.message : err.message);
            toast.error(`Login failed: ${err.response ? err.response.data.message : err.message}`);  // Error toast
        }
    };
    

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f4f4f4'
            }}
        >
            <Typography variant="h4" gutterBottom>LOGIN</Typography>
            <form
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '300px',
                    gap: '20px',
                    textAlign: 'center'  // Center-align content
                }}
            >
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    sx={{ marginBottom: '20px' }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button style={{ marginTop: "10px",marginLeft:"400px",width:"200px",height:"60px" }} variant="contained" color="primary" type="submit">Login</Button>
            </form>
        </Container>
    );
}

export default Login;
