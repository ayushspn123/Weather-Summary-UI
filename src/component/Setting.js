import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Modal, Snackbar, Alert, Box } from '@mui/material';
import axios from 'axios';

const SettingContainer = styled.div`
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
`;

const ModalContainer = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
`;

const ThresholdSettings = ({ setThreshold }) => {
    const [openModal, setOpenModal] = useState(false);
    const [thresholdValue, setThresholdValue] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const handleChange = (event) => {
        setThresholdValue(event.target.value);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (thresholdValue) {
            try {
                // Make API call to backend to set the threshold
                const response = await axios.post('http://localhost:3000/weather/threshold', {
                    threshold: parseFloat(thresholdValue),
                });

                if (response.data.success) {
                    setThreshold(thresholdValue);
                    setSnackbarMessage(`Threshold set to ${thresholdValue}°C`);
                    setSnackbarSeverity('success');
                } else {
                    setSnackbarMessage(response.data.message);
                    setSnackbarSeverity('error');
                }
            } catch (error) {
                console.error("Error setting threshold:", error);
                setSnackbarMessage('Failed to set threshold. Please try again.');
                setSnackbarSeverity('error');
            }
        } else {
            setSnackbarMessage('Please enter a valid threshold');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        handleCloseModal();
    };

    return (
        <SettingContainer>
            <h3>Temperature Settings</h3>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Set Threshold
            </Button>
            
            {/* Modal for Threshold Input */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <ModalContainer>
                    <h4>Set Temperature Threshold</h4>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Temperature Threshold (°C)"
                            type="number"
                            value={thresholdValue}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Set Threshold
                        </Button>
                    </form>
                </ModalContainer>
            </Modal>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SettingContainer>
    );
};

export default ThresholdSettings;
