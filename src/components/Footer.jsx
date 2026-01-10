import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <Container>
        <div className="text-center">
          <p>&copy; 2024 E-Shop. All rights reserved.</p>
          <p className="mb-0">MERN Stack E-Commerce Project</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;