import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../utils/api';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            console.log('🛒 Fetching REAL products...');
            
            const { data } = await API.get('/api/products');
            
            console.log('✅ Products loaded:', data.products.length);
            
            if (data.success) {
                setProducts(data.products);
                
                // Log sample products to verify real data
                data.products.slice(0, 3).forEach(p => {
                    console.log(`📦 ${p.name} - $${p.price} - ${p.image}`);
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">🛍️ Product From E-Shop</h1>
            
            {error && (
                <Alert variant="warning">{error}</Alert>
            )}
            
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                    <p className="mt-2">Loading real products...</p>
                </div>
            ) : (
                <>
                    <p className="mb-4">
                        Showing <strong>{products.length}</strong> belows are available in our Shop
                    </p>
                    
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} lg={3} md={4} sm={6} className="mb-4">
                                <Card className="h-100 shadow-sm">
                                    {/* REAL PRODUCT IMAGE */}
                                    <Card.Img 
                                        variant="top" 
                                        src={product.image} 
                                        alt={product.name}
                                        style={{ 
                                            height: '250px', 
                                            objectFit: 'contain',
                                            padding: '15px',
                                            backgroundColor: '#f8f9fa'
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x300';
                                        }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fs-6">{product.name}</Card.Title>
                                        <Card.Text className="text-muted small mb-2">
                                            {product.category} • {product.brand}
                                        </Card.Text>
                                        <Card.Text className="text-muted small">
                                            {product.description?.substring(0, 80)}...
                                        </Card.Text>
                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                {/* REAL PRODUCT PRICE */}
                                                <h4 className="text-primary mb-0">
                                                    ${product.price}
                                                </h4>
                                                <div>
                                                    <span className="badge bg-success me-1">
                                                        ⭐ {product.rating}
                                                    </span>
                                                    <span className={`badge ${product.countInStock > 0 ? 'bg-info' : 'bg-danger'}`}>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link to={`/product/${product._id}`} className="w-100">
                                                <Button variant="primary" className="w-100">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    
                    {products.length === 0 && (
                        <Alert variant="info" className="text-center">
                            <h5>No products found</h5>
                            <p>Try refreshing the page or check your connection</p>
                            <Button onClick={fetchProducts}>Retry</Button>
                        </Alert>
                    )}
                </>
            )}
        </Container>
    );
};

export default ProductListPage;
