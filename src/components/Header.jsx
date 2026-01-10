import React from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaProductHunt, FaHome } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();

    const logoutHandler = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="shadow-sm">
            <Container>
                {/* Brand/Logo - Always Visible */}
                <LinkContainer to="/">
                    <Navbar.Brand className="fw-bold fs-4">
                        🛍️ E-Shop
                    </Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    
                    {/* ========== LOGGED IN USER ========== */}
                    {user ? (
                        <Nav>
                            {/* Home */}
                            <LinkContainer to="/">
                                <Nav.Link className="mx-2">
                                    <FaHome className="me-1" /> Home
                                </Nav.Link>
                            </LinkContainer>
                            
                            {/* Products */}
                            <LinkContainer to="/products">
                                <Nav.Link className="mx-2">
                                    <FaProductHunt className="me-1" /> Products
                                </Nav.Link>
                            </LinkContainer>
                            
                            {/* Cart with Badge */}
                            <LinkContainer to="/cart">
                                <Nav.Link className="mx-2">
                                    <FaShoppingCart className="me-1" /> Cart
                                    {itemCount > 0 && (
                                        <Badge pill bg="danger" className="ms-1">
                                            {itemCount}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            
                            {/* Profile */}
                            <LinkContainer to="/profile">
                                <Nav.Link className="mx-2">
                                    <FaUser className="me-1" /> Profile
                                </Nav.Link>
                            </LinkContainer>
                            
                            {/* Logout Button */}
                            <Button 
                                variant="outline-light" 
                                className="mx-2"
                                onClick={logoutHandler}
                            >
                                <FaSignOutAlt className="me-1" /> Logout
                            </Button>
                        </Nav>
                    ) : (
                        /* ========== NOT LOGGED IN ========== */
                        <Nav>
                            {/* Only show Login & Register */}
                            <LinkContainer to="/login">
                                <Nav.Link className="mx-2 btn btn-primary">
                                    <FaUser className="me-1" /> Sign In
                                </Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to="/register">
                                <Nav.Link className="mx-2 btn btn-primary">
                                    Register
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )}
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;