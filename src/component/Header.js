import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import styled from 'styled-components';

// Styled component for the AppBar
const StyledAppBar = styled(AppBar)`
    background-color: "#2C3E50" /* Dark mode color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a soft shadow */
    transition: background-color 0.3s ease; /* Smooth background transition */
`;

// Styled Typography for better appearance
const StyledTypography = styled(Typography)`
    flex-grow: 1; /* Allows it to take up all available space */
    font-weight: bold; /* Make text bold */
    font-size: 1.5rem; /* Increase font size */
    color: #fff; /* Ensure text is readable on dark background */
`;

const Header = () => {
    const [theme, setTheme] = useState('light'); // Default to light theme

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <StyledAppBar position="static" style={{background:'#2C3E50'}}>
            <Toolbar>
                    <StyledTypography variant="h6">Weather Monitoring System</StyledTypography>
                <Button color="inherit" variant="outlined" style={{ marginLeft: '20px',background:'#2C3E50' }}>
                    Login
                </Button>
               
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;
