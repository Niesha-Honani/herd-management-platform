import * as React from 'react'
import { Outlet, Link } from "react-router-dom"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
// Icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import LoyaltyIcon from '@mui/icons-material/Loyalty'
import AppsIcon from '@mui/icons-material/Apps';
import LandscapeIcon from '@mui/icons-material/Landscape';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main'
    },
    {
        segment: 'login',
        title: 'Login',
        icon: <LoginIcon />,
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Herd Management'
    },
    {
        segment: 'animals',
        title: 'Animals',
        icon: <LoyaltyIcon />,
    },
    {
        segment: 'herds',
        title: 'Herds',
        icon: <AppsIcon />,
    },
    {
        segment: 'ranches',
        title: 'Ranches',
        icon: <LandscapeIcon />
    }
]
const DRAWER_WIDTH = 240



export const DashboardShell = () => {
    const [open, setOpen] = React.useState(false)
    
    const toggleDrawer = () => {
        setOpen((prev) => !prev)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar sx={{width:'100%' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>Bonanza</Typography>
                </Toolbar>
            </AppBar>
            
            <Drawer 
                variant='temporary'
                open={open}
                onClose={toggleDrawer}
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                    },
                    '& .MuiBackdrop-root': {
                        mt: '64px',
                    },
                    zIndex: (theme) => theme.zIndex.appBar -1,
                }}
            >
                <Toolbar />
                <List>
                    {NAVIGATION.map((navigation, index) => {
                        if (navigation.kind === 'header') {
                            return(
                                <Typography
                                    key={index}
                                    variant="overline"
                                    sx={{ px: 2,  display: 'block', color: 'text.secondary' }}
                                    >
                                    {navigation.title}
                                </Typography>
                            )
                        }

                        if (navigation.kind === 'divider') {
                            return(
                                <Divider key={index} />
                            )
                        }
                        return(
                            <ListItemButton onClick={toggleDrawer} key={index} component={Link} to={`/${navigation.segment}`} >
                                <ListItemIcon>{navigation.icon}</ListItemIcon>
                                <ListItemText primary={navigation.title} />
                            </ListItemButton>
                        )
                    })}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p:3 }}>
               <Toolbar />
                <Outlet /> 
            </Box>
            
        </Box>
    )
}