import React, { useEffect } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/devcamp-2.png'
import { Avatar, Box, Popper, Fade, Divider } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { fetchUser } from '../../reducers/user_reducer';
import { useDispatch, useSelector } from 'react-redux';

function NavbarDashboard() {
    const background = {
        backgroundColor: '#1E266D',
        // boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
        padding: 15,
        paddingLeft: '1%',
        paddingRight: '1%',
    }
    const font ={
        color: 'black',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#4361EE',
        borderRadius: 100,
        width: 'fit-content',
    }
    const brand = {
        fontSize: 24,
        fontWeight: '500',
        color: 'white'
    }

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <Navbar style={background} collapseOnSelect expand="lg" sticky="top" >
            <Container fluid >
            <Link to= "/peserta/dashboard">
                <Navbar.Brand style={brand}><img src={logo} alt="Logo DevCamp" /> DevCamp</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
            <Nav className="me-auto"></Nav>
                <Nav className="justify-content-center">
                    <Button onClick={handleClick} className="me-3" style={font}>
                        <Avatar src='../../assets/images/users/user-round.svg' />
                        <SettingsOutlinedIcon sx={{color: 'white', ml: 3}} />
                    </Button>
                    <Popper 
                        id={id} 
                        open={open} 
                        anchorEl={anchorEl} 
                        transition
                        popperOptions={{
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 20]
                                    }
                                }
                            ]
                        }}
                    >
                        {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box 
                                boxShadow={5}
                                sx={{ 
                                    p: 2, 
                                    bgcolor: 'background.paper', 
                                    mr: 6,
                                    borderRadius: 3, 
                                    width: 330,
                                }}
                            >
                                {user.map((user, index) => (

                                    <p style={{margin: 0}}><b>Selamat Datang</b>, {user.nama_lengkap}</p>
                                ))}
                                <p style={{color: 'grey', fontSize: '12px'}}>Peserta</p>
                                <Divider variant="middle" />
                                <Button variant='outline-warning' style={{width: '100%', textAlign: 'left', border: 'none', marginBottom: 15}}><SettingsOutlinedIcon /> Account Settings</Button>
                                <Button href='/' variant='outline-danger' style={{width: '100%', textAlign: 'left', border: 'none', marginBottom: 15}}><LogoutIcon /> Logout</Button>
                            </Box>
                        </Fade>
                        )}
                    </Popper>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarDashboard;