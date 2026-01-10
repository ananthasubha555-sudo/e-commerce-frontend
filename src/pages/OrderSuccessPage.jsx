import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaHome } from 'react-icons/fa';

const OrderSuccessPage = () => {
    const { id } = useParams();
    const orderId = id || localStorage.getItem('lastOrderId') || `ORD${Date.now()}`;

    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <div className="mb-3">
                    <FaCheckCircle className="text-success" size={80} />
                </div>
                <h1 className="text-success">Order Confirmed!</h1>
                <p className="lead">Thank you for your purchase.</p>
                <p className="text-muted">Order ID: <strong>{orderId}</strong></p>
            </div>

            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <Card.Title>🎉 Your Order is Being Processed</Card.Title>
                            
                            <div className="my-4">
                                <Alert variant="success">
                                    <Alert.Heading>What's Next?</Alert.Heading>
                                    <p>You will receive an order confirmation email shortly.</p>
                                    <p>Your items will be shipped within 1-2 business days.</p>
                                </Alert>
                            </div>
                            
                            <div className="mb-4">
                                <h5>Order Summary</h5>
                                <p className="text-muted">
                                    Order ID: <strong>{orderId}</strong><br />
                                    Date: <strong>{new Date().toLocaleDateString()}</strong><br />
                                    Status: <span className="badge bg-success">Confirmed</span>
                                </p>
                            </div>
                            
                            <div className="d-grid gap-2">
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    as={Link}
                                    to="/products"
                                    className="mb-2"
                                >
                                    <FaShoppingBag className="me-2" />
                                    Continue Shopping
                                </Button>
                                
                                <Button 
                                    variant="outline-secondary"
                                    as={Link}
                                    to="/"
                                >
                                    <FaHome className="me-2" />
                                    Back to Home
                                </Button>
                                
                                <Button 
                                    variant="outline-primary"
                                    onClick={() => window.print()}
                                    className="mt-2"
                                >
                                    📄 Print Receipt
                                </Button>
                            </div>
                            
                            <div className="mt-4">
                                <p className="small text-muted">
                                    Need help with your order?<br />
                                    Contact support@eshop.com or call +91 1234567890
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderSuccessPage;
