import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import WeatherCard from './component/Weather';
import ThresholdSettings from './component/Setting';
import WeatherSummary from './component/Summ';
import WeatherGraph from './component/Graph';
import Sidebar from './component/Sidebar';
import { Container, Grid, Box, Typography, Paper, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import menu icon
import axios from 'axios';
import styled from 'styled-components';
import CityWeather from './component/YourCity';

// Styled components
const StyledContainer = styled(Container)``;

const MainContent = styled(Grid)`
    flex: 1; 
    display: flex;
    flex-direction: column;
    overflow: auto; 
`;

const Section = styled(Paper)`
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    height: 40%;
    margin-top: 2%;
`;

const WeatherSection = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px;
    gap: 15px;
    height: auto;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }

    @media (min-width: 600px) and (max-width: 960px) {
        flex-direction: row;
        justify-content: space-around;
    }

    @media (min-width: 960px) {
        justify-content: space-between;
    }
`;

const App = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [summary, setSummary] = useState({});
    const [record, setRecord] = useState([]);
    const [showGraph, setShowGraph] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

    const fetchWeatherData = async () => {
        const responses = await Promise.all(
            cities.map(city =>
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9738126f79522958fc1b46109ca99d73`)
            )
        );
        const weatherDetails = responses.map(res => ({
            city: res.data.name,
            temp: (res.data.main.temp - 273.15).toFixed(2),
            condition: res.data.weather[0].main,
        }));
        setWeatherData(weatherDetails);
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    useEffect(() => {
        const fetchWeatherSummary = async () => {
            try {
                const response = await axios.get('https://weather-summary.vercel.app/weather/summaries');
                const { averageTemp, maxTemp, minTemp, dominantCondition, records } = response.data.data[0];
                setRecord(records);
                setSummary({
                    averageTemp,
                    maxTemp,
                    minTemp,
                    dominantCondition,
                });
            } catch (error) {
                console.error('Error fetching weather summary:', error);
            }
        };
        fetchWeatherSummary();
    }, []);

    const handleShowGraph = () => {
        setShowGraph(true);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <Router>
            <>
                <Header />
                <Grid container spacing={4} style={{ flex: 1 }}>
                    <Grid item xs={12} md={3}>
                        {/* Show sidebar directly on medium and larger screens */}
                        <Box display={{ xs: 'none', md: 'block' }}>
                            <Sidebar />
                        </Box>

                        {/* Drawer for smaller screens */}
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            aria-label="menu" 
                            onClick={toggleDrawer} 
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="left"
                            open={isDrawerOpen}
                            onClose={toggleDrawer}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <Sidebar />
                        </Drawer>
                    </Grid>
                    <MainContent item xs={12} md={9}>
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <>
                                        <WeatherSection>
                                            {weatherData.map((weather, index) => (
                                                <WeatherCard key={index} weather={weather} />
                                            ))}
                                            <CityWeather />
                                        </WeatherSection>
                                    </>
                                } 
                            />
                            <Route 
                                path="/threshold" 
                                element={
                                    <Section>
                                        <ThresholdSettings setThreshold={setSummary} />
                                    </Section>
                                } 
                            />
                            <Route 
                                path="/summary" 
                                element={
                                    <Section>
                                        <WeatherSummary summary={summary} />
                                    </Section>
                                } 
                            />
                            <Route 
                                path="/graph" 
                                element={
                                    <Section>
                                        <WeatherGraph records={record} />
                                    </Section>
                                } 
                            />
                        </Routes>
                    </MainContent>
                </Grid>
            </>
        </Router>
    );
};

export default App;
