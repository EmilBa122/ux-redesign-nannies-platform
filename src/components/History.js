import React from 'react';
import { Container, Row, Col, Card, ListGroup, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './History.css';
import profileImage from '../assets/parent.jpg'; 

const History = () => {
  return (
    <Container className="history-container mt-5">
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προφίλ' }}>Προφίλ</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Ιστορικό' }}>Ιστορικό</Breadcrumb.Item>
        </Breadcrumb>
      <Row>
     
        <Col md={4}>
          <Card className="sidebar-card">
            <Card.Img
              variant="top"
              src={profileImage}
              alt="Profile"
              className="sidebar-image"
            />
            <Card.Body className="text-center">
              <h5 className="profile-name">Κωνσταντίνος Π.</h5>
              <ListGroup variant="flush" className="mt-3">
                <ListGroup.Item>
                  <Link to="/Προσωπικά στοιχεία" className="text-decoration-none">Προσωπικά στοιχεία</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/Ιστορικό" className="shaded-link">Ιστορικό</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/Μηνύματα" className="text-decoration-none">Μηνύματα</Link>
                </ListGroup.Item> 
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
 
  
        <Col md={8}>
          <Row className="gy-3">
         
            <Col md={12}>
              <Card className="content-card">
                <Card.Body>
                  <Card.Title>
                    <Link to="/Προβολή ιστορικού πληρωμών" className="text-decoration-none">
                      Προβολή ιστορικού πληρωμών
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>

         
            <Col md={12}>
              <Card className="content-card">
                <Card.Body>
                  <Card.Title>
                    <Link to="/Προβολή ιστορικού δηλώσεων" className="text-decoration-none">
                      Προβολή ιστορικού δηλώσεων
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>

        
            <Col md={12}>
              <Card className="content-card">
                <Card.Body>
                  <Card.Title>
                    <Link to="/Προβολή ιστορικού συμφωνητικών" className="text-decoration-none">
                      Προβολή ιστορικού συμφωνητικών
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default History;
