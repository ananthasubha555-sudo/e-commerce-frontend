import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import API from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            console.log(`🛒 Fetching REAL product ${id}...`);
            
            const { data } = await API.get(`/products/${id}`);
            
            console.log('✅ Product data:', data.product);
            
            if (data.success) {
                setProduct(data.product);
            } else {
                setError('Product not found');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to load product');
        } finally {
            setLoading(false);
        }
    };

    const addToCartHandler = () => {
        if (product) {
            addToCart(product, quantity);
            alert(`Added ${quantity} × ${product.name} to cart!`);
        }
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading real product data...</p>
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    <Alert.Heading>Product Not Found</Alert.Heading>
                    <p>{error || 'The product you are looking for does not exist.'}</p>
                    <Button onClick={() => navigate('/products')}>
                        <FaArrowLeft className="me-2" />
                        Back to Products
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Button 
                variant="outline-secondary" 
                className="mb-4"
                onClick={() => navigate('/products')}
            >
                <FaArrowLeft className="me-2" />
                Back to Products
            </Button>
            
            <Row>
                {/* REAL PRODUCT IMAGE */}
                <Col md={6}>
                    <div className="product-image-container mb-4">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="img-fluid rounded shadow"
                            style={{ 
                                maxHeight: '500px',
                                width: '100%',
                                objectFit: 'contain',
                                backgroundColor: '#f8f9fa',
                                padding: '20px'
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/500x500';
                            }}
                        />
                    </div>
                    
                    <div className="d-flex gap-2 mb-4">
                        <Button 
                            variant="outline-primary"
                            onClick={() => window.open(product.image, '_blank')}
                        >
                            🔍 View Full Image
                        </Button>
                    </div>
                </Col>
                
                {/* REAL PRODUCT DETAILS */}
                <Col md={6}>
                    <div className="mb-3">
                        <Badge bg="secondary" className="me-2">{product.category}</Badge>
                        <Badge bg="info">{product.brand}</Badge>
                    </div>
                    
                    <h1 className="mb-3">{product.name}</h1>
                    
                    <div className="mb-4">
                        <div className="d-flex align-items-center mb-2">
                            <div className="text-warning me-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} 
                                        className={i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'}
                                    />
                                ))}
                            </div>
                            <span className="me-3">
                                <strong>{product.rating}</strong> / 5
                            </span>
                            <span className="text-muted">
                                ({product.numReviews || 0} reviews)
                            </span>
                        </div>
                    </div>
                    
                    <h2 className="text-primary mb-4">
                        ${product.price}
                        <small className="text-muted fs-6 ms-2">
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </small>
                    </h2>
                    
                    <div className="mb-4">
                        <h5>Description</h5>
                        <p className="lead">{product.description}</p>
                    </div>
                    
                    {product.countInStock > 0 && (
                        <div className="mb-4">
                            <h6>Quantity</h6>
                            <div className="d-flex align-items-center">
                                <Button 
                                    variant="outline-secondary"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    −
                                </Button>
                                <span className="mx-3 fs-5">{quantity}</span>
                                <Button 
                                    variant="outline-secondary"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={quantity >= product.countInStock}
                                >
                                    +
                                </Button>
                                <span className="ms-3 text-muted">
                                    Max: {product.countInStock} available
                                </span>
                            </div>
                        </div>
                    )}
                    
                    <div className="d-flex gap-3 mb-5">
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className="flex-grow-1"
                        >
                            <FaShoppingCart className="me-2" />
                            Add to Cart
                        </Button>
                        
                        <Button 
                            variant="outline-primary" 
                            size="lg"
                            onClick={() => navigate('/checkout')}
                            disabled={product.countInStock === 0}
                        >
                            Buy Now
                        </Button>
                    </div>
                    
                    <div className="product-info">
                        <h6>Product Information</h6>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><strong>Category</strong></td>
                                    <td>{product.category}</td>
                                </tr>
                                <tr>
                                    <td><strong>Brand</strong></td>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <td><strong>Stock</strong></td>
                                    <td>
                                        {product.countInStock > 0 ? (
                                            <span className="text-success">
                                                {product.countInStock} units available
                                            </span>
                                        ) : (
                                            <span className="text-danger">Out of stock</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Rating</strong></td>
                                    <td>{product.rating} stars ({product.numReviews || 0} reviews)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
            
            <style jsx="true">{`
                .product-image-container {
                    border: 1px solid #dee2e6;
                    border-radius: 10px;
                    overflow: hidden;
                    background: white;
                }
                .product-info table {
                    background: #f8f9fa;
                    border-radius: 8px;
                }
                .product-info table td {
                    border: none;
                    padding: 10px 15px;
                }
            `}</style>
        </Container>
    );
};

export default ProductDetailPage;