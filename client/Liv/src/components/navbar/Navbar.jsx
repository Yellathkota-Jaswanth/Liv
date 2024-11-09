import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Dashboard from '../pages/Dashboard'

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' style={{ flexGrow: 1 }}>
                    Liv
                </Typography>
                {user ? (
                    <>
                        <Button color='inherit' component={Link} to="/profile">Profile</Button>
                        <Button color='inherit' component={Link} to="/dashboard">Dashboard</Button>
                        <Button color='inherit' component={Link} to="/appointments">Appointments</Button>







                        <Button color='inherit' onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color='inherit' component={Link} to="/login">Login</Button>
                        <Button color='inherit' component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar