import React from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { isAuthenticated } = useAuth();

    const handleCheckout = () => {
        if (isAuthenticated) {
            window.location.href = '/checkout';
        } else {
            window.location.href = '/login?redirect=/checkout';
        }
    };

    if (cartItems.length === 0) {
        return (
            <Container className="py-5 text-center">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <Link to="/products">
                    <Button variant="primary" size="lg">Browse Products</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h1 className="mb-4">Shopping Cart</h1>
            
            <Row>
                <Col md={8}>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    style={{ width: '70px', height: '70px', objectFit: 'cover', marginRight: '15px' }}
                                                />
                                                <div>
                                                    <h6 className="mb-1">{item.name}</h6>
                                                    <small className="text-muted">{item.category}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>
                                            <select 
                                                className="form-select form-select-sm"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                                style={{ width: '70px' }}
                                            >
                                                {[...Array(item.countInStock || 10).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                onClick={() => removeFromCart(item._id)}
                                            >
                                                ✕
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="mt-3">
                        <Link to="/products">
                            <Button variant="outline-primary">
                                ← Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </Col>
                
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Order Summary</Card.Title>
                            
                            <div className="mb-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal:</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Shipping:</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Tax (10%):</span>
                                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <strong>Total:</strong>
                                    <strong className="text-primary">${(cartTotal + 5 + cartTotal * 0.1).toFixed(2)}</strong>
                                </div>
                            </div>
                            
                            <div className="d-grid gap-2">
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    onClick={handleCheckout}
                                    className="mb-2"
                                >
                                    Proceed to Checkout
                                </Button>
                                
                                <Link to="/checkout" className="d-grid">
                                    <Button variant="outline-secondary">
                                        Secure Checkout
                                    </Button>
                                </Link>
                            </div>
                            
                            <div className="mt-4">
                                <p className="small text-muted text-center">
                                    <i className="bi bi-shield-check me-1"></i>
                                    Secure payment · 30-day return policy
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;