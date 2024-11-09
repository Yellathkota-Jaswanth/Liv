import React, { useContext, useState } from 'react'
import { Button, TextField, Typography, Container } from '@mui/material'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import http from '../../utils/http'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setuserType] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.post('/auth/register', { name, email, password, userType });
            await login(email, password);
            navigate('/dashboard'); // Redirect to feed page after successful registration
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" align="center" gutterBottom> Register </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </TextField>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </TextField>
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </TextField>
                <TextField
                    label="UserType"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userType}
                    onChange={(e) => setuserType(e.target.value)}>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
            </form>
        </Container>
    )
}

export default Register