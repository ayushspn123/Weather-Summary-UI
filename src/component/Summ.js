// src/component/Summ.js
import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { WbSunny, AcUnit, Cloud, Whatshot } from '@mui/icons-material';

// Styled components
const SummaryContainer = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 90%; /* Responsive width */
    max-width: 600px; /* Maximum width */
    margin: 20px auto; /* Centering */
`;

const SummaryItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; /* Center items */
    margin: 15px 0;
    font-size: 20px;
    font-weight: 500;

    & > svg {
        margin-right: 15px;
        color: #1976d2; /* You can change this to fit your theme */
        font-size: 28px; /* Icon size */
    }
`;

const GraphTitle = styled.h4`
    margin-top: 20px;
    color: #34495e; /* Darker color for better contrast */
`;

// Graph Data Preparation
const prepareGraphData = (summary) => {
    return [
        { name: 'Average', value: summary.averageTemp },
        { name: 'Max', value: summary.maxTemp },
        { name: 'Min', value: summary.minTemp },
    ];
};

const WeatherSummary = ({ summary }) => {
    if (!summary || Object.keys(summary).length === 0) {
        return <h1>Loading...</h1>;
    }

    // Prepare data for the graph
    const graphData = prepareGraphData(summary);

    return (
        <SummaryContainer>
            <h3 style={{ color: '#2c3e50' }}>Daily Weather Summary</h3>
            <SummaryItem>
                <WbSunny /> Average Temperature: {summary.averageTemp} °C
            </SummaryItem>
            <SummaryItem>
                <Whatshot /> Max Temperature: {summary.maxTemp} °C
            </SummaryItem>
            <SummaryItem>
                <AcUnit /> Min Temperature: {summary.minTemp} °C
            </SummaryItem>
            <SummaryItem>
                <Cloud /> Dominant Condition: {summary.dominantCondition}
            </SummaryItem>

            <GraphTitle>Temperature Graph</GraphTitle>
            <BarChart width={500} height={300} data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#34495e" />
                <YAxis stroke="#34495e" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
        </SummaryContainer>
    );
};

export default WeatherSummary;
