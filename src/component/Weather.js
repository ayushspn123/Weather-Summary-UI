import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import styled from 'styled-components';

// Styled components
const StyledCard = styled(Card)`
    background: linear-gradient(135deg, #e0f7fa 30%, #fce4ec 90%);
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    }
    padding: 15px;
    height:30%
`;

const WeatherIconWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
`;

const WeatherCard = ({ weather }) => {
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

    return (
        <StyledCard variant="outlined">
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
                    variant="body2" 
                    align="center" 
                    style={{ color: '#777', textTransform: 'capitalize' }}
                >
                    {weather.condition}
                </Typography>
            </CardContent>
        </StyledCard>
    );
};

export default WeatherCard;
