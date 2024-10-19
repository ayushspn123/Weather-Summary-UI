import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const StyledCard = styled(Card)`
    background: linear-gradient(135deg, #e0f7fa 30%, #fce4ec 90%);
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    padding: 25px;
    margin: 30px 0;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
    }
`;

const SearchWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    gap: 15px;
`;

const WeatherIconWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    border-radius: 50%;
    padding: 10px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
`;

const CityWeather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    const getWeatherIcon = (condition) => {
        const normalizedCondition = condition.toLowerCase();
        switch (normalizedCondition) {
            case 'clear':
                return <WbSunnyIcon style={{ fontSize: 60, color: '#FFD700' }} />;
            case 'rain':
                return <CloudIcon style={{ fontSize: 60, color: '#00BFFF' }} />;
            case 'snow':
                return <AcUnitIcon style={{ fontSize: 60, color: '#ADD8E6' }} />;
            default:
                return <CloudIcon style={{ fontSize: 60, color: '#A9A9A9' }} />;
        }
    };

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9738126f79522958fc1b46109ca99d73`
            );
            const data = response.data;
            const weatherDetails = {
                city: data.name,
                temp: (data.main.temp - 273.15).toFixed(2),
                condition: data.weather[0].main,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
            };
            setWeather(weatherDetails);
            showSnackbar('Weather data fetched successfully!', 'success');
        } catch (error) {
            console.error("Error fetching weather data:", error);
            showSnackbar('City not found. Please enter a valid city name.', 'error');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <SearchWrapper>
                <TextField 
                    label="Enter City" 
                    variant="outlined" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    style={{ width: '250px' }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={fetchWeatherData}
                    style={{ padding: '10px 20px', fontWeight: 'bold' }}
                >
                    Search
                </Button>
            </SearchWrapper>
            {weather && (
                <StyledCard>
                    <CardContent>
                        <Typography 
                            variant="h5" 
                            align="center" 
                            style={{ fontWeight: 'bold', color: '#333', marginBottom: 15 }}
                        >
                            {weather.city}
                        </Typography>
                        <WeatherIconWrapper>
                            {getWeatherIcon(weather.condition)}
                        </WeatherIconWrapper>
                        <Typography 
                            variant="h6" 
                            align="center" 
                            style={{ fontWeight: 'bold', marginBottom: 10, color: '#555' }}
                        >
                            {weather.temp} °C
                        </Typography>
                        <Typography 
                            variant="body1" 
                            align="center" 
                            style={{ color: '#777', textTransform: 'capitalize', fontSize: '1.1rem' }}
                        >
                            {weather.condition}
                        </Typography>
                        <Box mt={2} mb={1}>
                            <Typography variant="body2" align="center" style={{ color: '#444' }}>
                                Humidity: <strong>{weather.humidity}%</strong>
                            </Typography>
                            <Typography variant="body2" align="center" style={{ color: '#444' }}>
                                Wind Speed: <strong>{weather.windSpeed} m/s</strong>
                            </Typography>
                        </Box>
                    </CardContent>
                </StyledCard>
            )}
            <TemperatureConverter />
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={3000} 
                onClose={handleCloseSnackbar} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

// Temperature Conversion Component
const TemperatureConverter = () => {
    const [inputTemp, setInputTemp] = useState('');
    const [convertedTemps, setConvertedTemps] = useState({ celsius: '', fahrenheit: '', kelvin: '' });

    const convertTemperature = () => {
        const temp = parseFloat(inputTemp);
        if (isNaN(temp)) {
            alert("Please enter a valid number");
            return;
        }
        // Assuming the input is in Celsius
        setConvertedTemps({
            celsius: `${temp.toFixed(2)} °C`,
            fahrenheit: `${((temp * 9/5) + 32).toFixed(2)} °F`,
            kelvin: `${(temp + 273.15).toFixed(2)} K`
        });
    };

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h5" align="center" style={{ marginBottom: 15 }}>
                    Temperature Converter
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <TextField 
                        label="Enter Temperature (°C)" 
                        variant="outlined" 
                        value={inputTemp} 
                        onChange={(e) => setInputTemp(e.target.value)} 
                        style={{ width: '200px' }}
                    />
                    <Button variant="contained" color="primary" onClick={convertTemperature}>
                        Convert
                    </Button>
                    <Box mt={2}>
                        <Typography align="center">{convertedTemps.celsius}</Typography>
                        <Typography align="center">{convertedTemps.fahrenheit}</Typography>
                        <Typography align="center">{convertedTemps.kelvin}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default CityWeather;
