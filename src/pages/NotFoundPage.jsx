import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Container className="text-center py-5">
            <h1 className="display-1 text-muted">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead mb-4">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/">
                <Button variant="primary" size="lg">
                    Go to Homepage
                </Button>
            </Link>
        </Container>
    );
};

export default NotFoundPage;