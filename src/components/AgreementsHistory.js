import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Breadcrumb, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './History.css';
import profileImage from '../assets/parent.jpg'; 

const AgreementsHistory = () => {
  
  const agreements = [
    { date: '11/5/2024', nan: 'Θεόδωρο Γ.', parent: 'Κωνταντίνος Π.', voucher: 'C1234567' },
    { date: '9/12/2024', nan: 'Γιάννης Π.', parent: 'Κωνταντίνος Π.',voucher: 'C3456789' },
    { date: '5/20/2024', nan: 'Ιωάννα Γ.', parent: 'Κωνταντίνος Π.', voucher: 'C4567890' },
    { date: '3/15/2023', nan: 'Νικόλαος Σ.', parent: 'Κωνταντίνος Π.', voucher: 'C5678901' },
    { date: '1/10/2023', nan: 'Ελένη Τ.', parent: 'Κωνταντίνος Π.', voucher: 'C6789012' },
    { date: '12/5/2022', nan: 'Μαρία Λ.', parent: 'Κωνταντίνος Π.', voucher: 'C7890123' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  
  const totalPages = Math.ceil(agreements.length / itemsPerPage);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAgreements = agreements.slice(startIndex, startIndex + itemsPerPage);

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
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προβολή ιστορικού συμφωνητικών' }}>Ιστορικό δηλώσεων</Breadcrumb.Item>
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
                    <Link to="/Προβολή ιστορικού πληρωμών" style={{ textDecoration: 'none' }}>Ιστορικό πληρωμών</Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ paddingLeft: '150px' }}>
                    <Link to="/Προβολή ιστορικού δηλώσεων" style={{ textDecoration: 'none' }}>Ιστορικό δηλώσεων</Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ paddingLeft: '140px' }}>
                    <Link 
                        to="/Προβολή ιστορικού συμφωνητικών" 
                        className="shaded-link"
                    >
                        Ιστορικό συμφωνητικών
                    </Link>
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
              <Card.Title>Ιστορικό συμφωνητικών</Card.Title>
              <Row>
                {currentAgreements.map((agreement, index) => (
                  <Col md={12} className="mb-3" key={index}>
                    <Card>
                      <Card.Body>
                        <p><strong>Ημερομηνία συμφωνητικού:</strong> {agreement.date}</p>
                        <p><strong>Κηδεμόνας:</strong> {agreement.parent}</p>
                        <p><strong>Νταντά:</strong> {agreement.nan}</p>
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

export default AgreementsHistory;