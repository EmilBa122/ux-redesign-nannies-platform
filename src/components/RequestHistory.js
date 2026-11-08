import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Breadcrumb, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './History.css';
import profileImage from '../assets/parent.jpg';


import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const RequestHistory = () => {
  const requests = [
    { date: '11/5/2024', nan: 'Θεόδωρο Γ.', parent: 'Κωνσταντίνος Π.', voucher: 'C1234567', status: 'Οριστική' },
    { date: '9/12/2024', nan: 'Γιάννης Π.', parent: 'Κωνσταντίνος Π.', voucher: 'C3456789', status: 'Οριστική' },
    { date: '5/20/2024', nan: 'Ιωάννα Γ.', parent: 'Κωνσταντίνος Π.', voucher: 'C4567890', status: 'Οριστική' },
    { date: '3/15/2024', nan: 'Νικόλαος Σ.', parent: 'Κωνσταντίνος Π.', voucher: 'C5678901', status: 'Οριστική' },
    { date: '1/10/2024', nan: 'Ελένη Τ.', parent: 'Κωνσταντίνος Π.', voucher: 'C6789012', status: 'Οριστική' },
    { date: '12/5/2023', nan: 'Μαρία Λ.', parent: 'Κωνσταντίνος Π.', voucher: 'C7890123', status: 'Οριστική' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [filter, setFilter] = useState('All');
  const [isParent, setIsParent] = useState(false);  

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(request => request.status === filter);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredRequests.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    setCurrentPage(1); 
  };

   
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);  
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === 'Κηδεμόνας') {
            setIsParent(true);  
          }
        }
      }
    });

    return () => unsubscribe();  
  }, []);
 
  const extendedRequests = isParent
    ? [
        ...currentRequests,
        { date: '1/14/2025', nan: 'Θωμάς Γ.', parent: 'Κωνσταντίνος Π.', voucher: 'C8901234', status: 'Προσωρινή' }
      ]
    : currentRequests;

  return (
    <Container className="payment-history-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προφίλ' }}>Προφίλ</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Ιστορικό' }}>Ιστορικό</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προβολή ιστορικού δηλώσεων' }}>Ιστορικό δηλώσεων</Breadcrumb.Item>
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
                  <Link to="/Προβολή ιστορικού δηλώσεων" className="shaded-link">Ιστορικό δηλώσεων</Link>
                </ListGroup.Item>
                <ListGroup.Item style={{ paddingLeft: '150px' }}>
                  <Link to="/Προβολή ιστορικού συμφωνητικών" style={{ textDecoration: 'none' }}>Ιστορικό συμφωνητικών</Link>
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
              <Card.Title>Ιστορικό δηλώσεων</Card.Title>
              <div className="d-flex justify-content-start mb-3">
                <Button 
                  variant={filter === 'Οριστική' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleFilterChange('Οριστική')}
                  className="me-2"
                >
                  Οριστικές
                </Button>
                <Button 
                  variant={filter === 'Προσωρινή' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleFilterChange('Προσωρινή')}
                  className="me-2"
                >
                  Προσωρινές
                </Button>
                <Button 
                  variant={filter === 'All' ? 'primary' : 'outline-primary'} 
                  onClick={() => handleFilterChange('All')}
                >
                  Όλες
                </Button>
              </div>
              <Row>
                {extendedRequests.map((request, index) => (
                  <Col md={12} className="mb-3" key={index}>
                    <Card>
                      <Card.Body>
                        <p><strong>Ημερομηνία δήλωσης:</strong> {request.date}</p>
                        <p><strong>Κηδεμόνας:</strong> {request.parent}</p>
                        <p><strong>Νταντά:</strong> {request.nan}</p>
                        <p><strong>Κατάσταση:</strong> {request.status}</p>
                        {request.status === 'Προσωρινή' && (
                          <Link to = {'/Request/2'}>
                          <Button  Linkvariant="warning">Επεξεργασία</Button>
                          </Link>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="d-flex justify-content-between mt-3">
                <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1}>
                  Προηγούμενο
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleNext} 
                  disabled={currentPage === Math.ceil(filteredRequests.length / itemsPerPage)}
                >
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

export default RequestHistory;
