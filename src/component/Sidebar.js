// src/component/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const SidebarContainer = styled.div`
    background:#2C3E50; ;
    padding: 20px;
    height: 100vh;
    width:20%
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const SidebarList = styled(List)`
    padding-top: 30px;
`;

const SidebarLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;
    font-weight: 500;
    &:hover {
        color: #ffde59;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
`;

const SidebarItem = styled(ListItem)`
    border-radius: 10px;
    margin-bottom: 15px;
    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transition: background 0.3s ease-in-out;
        cursor: pointer;
    }
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarList>
                <SidebarLink to="/">
                    <SidebarItem>
                        <ListItemIcon>
                            <DashboardIcon style={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </SidebarItem>
                </SidebarLink>

                <SidebarLink to="/threshold">
                    <SidebarItem>
                        <ListItemIcon>
                            <ThermostatIcon style={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Threshold" />
                    </SidebarItem>
                </SidebarLink>

                <SidebarLink to="/summary">
                    <SidebarItem>
                        <ListItemIcon>
                            <SummarizeIcon style={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Summary" />
                    </SidebarItem>
                </SidebarLink>

                <SidebarLink to="/graph">
                    <SidebarItem>
                        <ListItemIcon>
                            <ShowChartIcon style={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Graph" />
                    </SidebarItem>
                </SidebarLink>
            </SidebarList>
        </SidebarContainer>
    );
};

export default Sidebar;
