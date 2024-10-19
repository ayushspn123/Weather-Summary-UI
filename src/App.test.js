// src/component/__tests__/Summ.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For better assertions
import WeatherSummary from '../src/component/Summ';

describe('WeatherSummary Component', () => {
    const sampleSummary = {
        averageTemp: 25,
        maxTemp: 30,
        minTemp: 18,
        dominantCondition: 'Cloudy',
    };

    test('renders the WeatherSummary component without crashing', () => {
        render(<WeatherSummary summary={sampleSummary} />);
        expect(screen.getByText(/Daily Weather Summary/i)).toBeInTheDocument();
    });

    test('displays loading text when summary is empty', () => {
        render(<WeatherSummary summary={{}} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('displays correct average, max, and min temperatures', () => {
        render(<WeatherSummary summary={sampleSummary} />);
        expect(screen.getByText(/Average Temperature: 25 °C/i)).toBeInTheDocument();
        expect(screen.getByText(/Max Temperature: 30 °C/i)).toBeInTheDocument();
        expect(screen.getByText(/Min Temperature: 18 °C/i)).toBeInTheDocument();
    });

    test('displays the correct dominant condition', () => {
        render(<WeatherSummary summary={sampleSummary} />);
        expect(screen.getByText(/Dominant Condition: Cloudy/i)).toBeInTheDocument();
    });

    
});
