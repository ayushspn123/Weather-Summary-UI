import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

const WeatherGraph = ({ records }) => {
    const chartRef = useRef(null);
console.log(records);
    // Prepare the data for the graph
    const labels = records.map((record, index) => `Record ${index + 1}`);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Average Temperature (°C)',
                data: records.map(record => record.averageTemp),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Max Temperature (°C)',
                data: records.map(record => record.maxTemp),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Min Temperature (°C)',
                data: records.map(record => record.minTemp),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
            },
        },
    };

    // Handle chart updates
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.chartInstance?.update();
        }
    }, [records]);

    return (
        <div style={{ position: 'relative', height: '40vh', width: '50vw' }}>
            <Bar ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default WeatherGraph;
