import { Container, Nav, Navbar, Button } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/devcamp-2.png'

function NavbarLanding() {
    const background = {
        backgroundColor: '#1E266D',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
        padding: 18,
        paddingLeft: '10%',
        paddingRight: '10%',
    }
    const font ={
        color: 'black',
        fontWeight: '500',
    }
    const brand = {
        fontSize: 24,
        fontWeight: '500',
        color: 'white'
    }

    return (
        <Navbar style={background} collapseOnSelect expand="lg" sticky="top" >
            <Container fluid>
            <Link to= "/">
                <Navbar.Brand style={brand}><img src={logo} alt="Logo DevCamp" /> DevCamp</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-center'>
                <Nav className="me-auto"></Nav>
                <Nav className="justify-content-center">
                    <Nav.Link className="me-3" style={font}>
                        <Link to="/login"> 
                            <Button className='py-2 px-4' variant='outline-primary' style={{borderColor: 'white', fontWeight: '500', color: 'white'}}> PESERTA </Button>
                        </Link>
                    </Nav.Link>
                </Nav>
                <Nav className='justify-content-center'>
                    <Nav.Link href='http://localhost:8055'>
                        {/* <Link to="http://localhost:8055"> */}
                            <Button className='py-2 px-4' style={{background: '', fontWeight: '500'}}>
                                PENGAJAR
                            </Button>
                        {/* </Link> */}
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarLanding;