import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Breadcrumb, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './History.css';
import profileImage from '../assets/parent.jpg'; 

const Messages = () => {
  
  const messages = [
    { title: 'Πραγματοποιήθηκε πληρωμή', date: '12/5/2024' },
    { title: 'Πραγματοποιήθηκε δήλωση', date: '11/5/2024' },
    { title: 'Καταχωρήθηκε συμφωνητικό', date: '11/5/2024'},
    { title: 'Πραγματοποιήθηκε πληρωμή', date: '10/12/2024' },
    { title: 'Πραγματοποιήθηκε δήλωση', date: '9/12/2024' },
    { title: 'Καταχωρήθηκε συμφωνητικό', date: '9/12/2024'},
    { title: 'Πραγματοποιήθηκε πληρωμή', date: '6/20/2024' },
    { title: 'Πραγματοποιήθηκε δήλωση', date: '5/10/2024' },
    { title: 'Καταχωρήθηκε συμφωνητικό', date: '5/10/2024'},
    { title: 'Πραγματοποιήθηκε πληρωμή', date: '4/15/2024' },
    { title: 'Πραγματοποιήθηκε δήλωση', date: '3/15/2024' },
    { title: 'Καταχωρήθηκε συμφωνητικό', date: '3/15/2024'},
    { title: 'Πραγματοποιήθηκε πληρωμή', date: '2/10/2024' },
    { title: 'Πραγματοποιήθηκε δήλωση', date: '1/10/2024' },
    { title: 'Καταχωρήθηκε συμφωνητικό', date: '1/10/2024'},
    { title: 'Πραγματοποιήθηκε πληρωμή', date: '1/5/2024' },
    { title: 'Πραγματοποιήθηκε δήλωση', date: '12/5/2023' },
    { title: 'Καταχωρήθηκε συμφωνητικό', date: '12/5/2023'},
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;


  const totalPages = Math.ceil(messages.length / itemsPerPage);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMessages = messages.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Container className="history-container mt-5">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προφίλ' }}>Προφίλ</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Μηνύματα' }}>Μηνύματα</Breadcrumb.Item>
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
      
                    <ListGroup.Item> 
                    <Link 
                        to="/Μηνύματα" 
                        className="shaded-link"
                    >
                        Μηνύματα
                    </Link> 
                    </ListGroup.Item> 
                </ListGroup>
                </Card.Body>

          </Card>
        </Col>

        <Col md={8}>
          <Card className="content-card">
            <Card.Body>
              <Card.Title>Μηνύματα</Card.Title>
              <Row>
                {currentMessages.map((message, index) => (
                  <Col md={12} className="mb-3" key={index}>
                    <Card>
                      <Card.Body>
                        <p><strong>{message.title}</strong> </p>
                        <p><strong>Ημερομηνία:</strong> {message.date}</p>
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

export default Messages;