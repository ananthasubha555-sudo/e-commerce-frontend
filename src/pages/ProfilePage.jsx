import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <Container className="py-5 text-center">
                <p>Loading profile...</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h1 className="mb-4">My Profile</h1>
            
            <Card>
                <Card.Body>
                    <Card.Title>Profile Information</Card.Title>
                    
                    <div className="mb-3">
                        <strong>Name:</strong> {user.name}
                    </div>
                    
                    <div className="mb-3">
                        <strong>Email:</strong> {user.email}
                    </div>
                    
                    <div className="mb-3">
                        <strong>Account Type:</strong> {user.isAdmin ? 'Admin' : 'User'}
                    </div>
                    
                    <Button variant="outline-primary" className="me-2">
                        Edit Profile
                    </Button>
                    
                    <Button variant="danger" onClick={logout}>
                        Logout
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;