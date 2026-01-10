import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const HomePage = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);
    const [productsLoading, setProductsLoading] = React.useState(true);

    useEffect(() => {
        // If user is logged in, fetch products
        if (user) {
            fetchProducts();
        }
    }, [user]);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/api/products?limit=4');
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setProductsLoading(false);
        }
    };

    // Show loading while checking auth
    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading...</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {user ? (
                // ===== LOGGED IN USER VIEW =====
                <>
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold">Welcome back, {user.name}!</h1>
                        <p className="lead">Ready to continue shopping?</p>
                    </div>

                    <h2 className="mb-4">Recommended For You</h2>
                    
                    {productsLoading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" />
                            <p className="mt-2">Loading products...</p>
                        </div>
                    ) : (
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} md={3} className="mb-4">
                                    <Card className="h-100 shadow-sm">
                                        <Card.Img 
                                            variant="top" 
                                            src={product.image} 
                                            alt={product.name}
                                            style={{ height: '200px', objectFit: 'contain' }}
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text className="text-muted">
                                                {product.description.substring(0, 60)}...
                                            </Card.Text>
                                            <div className="mt-auto">
                                                <h5 className="text-primary mb-3">${product.price}</h5>
                                                <Link to={`/product/${product._id}`} className="w-100">
                                                    <Button variant="outline-primary" className="w-100">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                    
                    <div className="text-center mt-5">
                        <Link to="/products">
                            <Button variant="primary" size="lg">Browse All Products</Button>
                        </Link>
                    </div>
                </>
            ) : (
                // ===== GUEST/NOT LOGGED IN VIEW =====
                <div className="text-center py-5">
                    <h1 className="display-4 fw-bold mb-4">Welcome to E-Shop</h1>
                    <p className="lead mb-5">Your one-stop destination for online shopping</p>
                    
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Card className="shadow">
                                <Card.Body className="p-5">
                                    <h2 className="mb-4">Get Started</h2>
                                    <p className="text-muted mb-4">
                                        Please login or register to browse our products and start shopping.
                                    </p>
                                    
                                    <div className="d-grid gap-3">
                                        <Link to="/login">
                                            <Button variant="primary" size="lg" className="w-100">
                                                Sign In to Your Account
                                            </Button>
                                        </Link>
                                        
                                        <Link to="/register">
                                            <Button variant="outline-primary" size="lg" className="w-100">
                                                Create New Account
                                            </Button>
                                        </Link>
                                    </div>
                                    
                                    <hr className="my-4" />
                                    
                                    <p className="text-muted small">
                                        By continuing, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default HomePage;
