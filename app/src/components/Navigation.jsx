import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation({ cartItemsCount = 0 }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [bump, setBump] = useState(false);

    useEffect(() => {
        if (cartItemsCount > 0) {
            setBump(true);
            const t = setTimeout(() => setBump(false), 350);
            return () => clearTimeout(t);
        }
    }, [cartItemsCount]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar expand="lg" fixed="top" className="shadow-sm navbar-custom">
            <Container>
                <Navbar.Brand as={NavLink} to="/">MiniStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav className="align-items-center">
                        <Nav.Link as={NavLink} to="/cart" className="d-flex align-items-center cart-link">
                            <i className="bi bi-cart-fill cart-icon" aria-hidden="true"></i>
                            {cartItemsCount > 0 && (
                                <Badge pill bg="light" className={`cart-count ${bump ? 'bump' : ''}`}>
                                    {cartItemsCount}
                                </Badge>
                            )}
                        </Nav.Link>

                        {user ? (
                            <NavDropdown
                                title={<i className="bi bi-person-circle user-icon" aria-hidden="true"></i>}
                                id="user-menu"
                                align="end"
                            >
                                <NavDropdown.ItemText className="user-email">{user.email}</NavDropdown.ItemText>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={NavLink} to="/login" className="text-white">Ingresar</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
