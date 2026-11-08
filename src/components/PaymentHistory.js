import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Breadcrumb, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PaymentHistory.css';
import profileImage from '../assets/parent.jpg'; 

const PaymentHistory = () => {

  const payments = [
    { date: '12/5/2024', nan: 'Θεόδωρο Γ.', parent: 'Κωνταντίνος Π.', voucher: 'C1234567' },
    { date: '10/12/2024', nan: 'Γιάννης Π.', parent: 'Κωνταντίνος Π.',voucher: 'C3456789' },
    { date: '6/20/2024', nan: 'Ιωάννα Γ.', parent: 'Κωνταντίνος Π.', voucher: 'C4567890' },
    { date: '4/15/2024', nan: 'Νικόλαος Σ.', parent: 'Κωνταντίνος Π.', voucher: 'C5678901' },
    { date: '2/10/2024', nan: 'Ελένη Τ.', parent: 'Κωνταντίνος Π.', voucher: 'C6789012' },
    { date: '1/5/2023', nan: 'Μαρία Λ.', parent: 'Κωνταντίνος Π.', voucher: 'C7890123' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Container className="payment-history-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προφίλ' }}>Προφίλ</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Ιστορικό' }}>Ιστορικό</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προβολή ιστορικού πληρωμών' }}>Ιστορικό πληρωμών</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
      
        <Col md={4}>
          <Card className="sidebar-card">
            <Card.Img variant="top" src={profileImage} alt="Profile" className="sidebar-image" />
            <Card.Body>
                <h5 className="profile-name">Κωνσταντίνος Π.</h5>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    <Link to="/Προσωπικά στοιχεία" style={{ textDecoration: 'none' }}>Προσωπικά στοιχεία</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Link to="/Ιστορικό" style={{ textDecoration: 'none' }}>Ιστορικό</Link>
                    </ListGroup.Item>
              
                    <ListGroup.Item style={{ paddingLeft: '150px' }}>
                    <Link 
                        to="/Προβολή ιστορικού πληρωμών" 
                        className="shaded-link"
                    >
                        Ιστορικό πληρωμών
                    </Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ paddingLeft: '150px' }}>
                    <Link to="/Προβολή ιστορικού δηλώσεων" style={{ textDecoration: 'none' }}>Ιστορικό δηλώσεων</Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ paddingLeft: '150px' }}>
                    <Link to="/Προβολή ιστορικού συμφωνητικών" style={{ textDecoration: 'none' }}>Ιστορικό δυμφωνητικών</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Link to="/Μηνύματα" style={{ textDecoration: 'none' }}>Μηνύματα</Link>
                    </ListGroup.Item> 
                </ListGroup>
                </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="content-card">
            <Card.Body>
              <Card.Title>Ιστορικό πληρωμών</Card.Title>
              <Row>
                {currentPayments.map((payment, index) => (
                  <Col md={12} className="mb-3" key={index}>
                    <Card>
                      <Card.Body>
                        <p><strong>Ημερομηνία πληρωμής:</strong> {payment.date}</p>
                        <p><strong>Κηδεμόνας:</strong> {payment.parent}</p>
                        <p><strong>Νταντά:</strong> {payment.nan}</p>
                        <p><strong>Voucher:</strong> {payment.voucher}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="d-flex justify-content-between mt-3">
                <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1}>
                  Προηγούμενο
                </Button>
                <Button variant="secondary" onClick={handleNext} disabled={currentPage === totalPages}>
                  Επόμενο
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentHistory;
