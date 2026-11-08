import React from 'react';
import { Card } from 'react-bootstrap';
import Parents from '../assets/parents.jpg';
import { Link } from 'react-router-dom';
import './Home.css';

function PersonaGar() {
  return (
    <Link to="/Κηδεμόνας" className="text-decoration-none persona-link">
      <Card className="mb-3 persona-card shadow-sm">
        <div className="persona-image-container">
          <Card.Img
            variant="top"
            src={Parents}
            alt="Κηδεμόνας"
            className="persona-image"
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title className="persona-title">Κηδεμόνας</Card.Title>
          <Card.Text className="persona-description">
            Βρείτε επαγγελματίες για τη φροντίδα και την υποστήριξη που χρειάζεστε.
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default PersonaGar;
