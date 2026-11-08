import React from 'react';
import { Container, Row, Col, Card, Breadcrumb } from 'react-bootstrap';
import './Profile.css';
import { Link } from 'react-router-dom';
import profileImage from '../assets/parent.jpg'; 

const Profile = () => {
  return (
    <Container className="profile-container">
      <Row className="breadcrumb-row w-100 mb-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προφίλ' }}>Προφίλ</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <h2 className="profile-name">Κωνσταντίνος Π.</h2>
    
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={4} sm={6}>
          <Link to="/Προσωπικά στοιχεία" className="text-decoration-none">
            <Card className="profile-card">
              <Card.Body>
                <Card.Title>Προσωπικά στοιχεία</Card.Title>
                <Card.Text>
                  Δείτε και επεξεργαστείτε τα προσωπικά σας στοιχεία.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} sm={6}>
          <Link to="/Ιστορικό" className="text-decoration-none">
            <Card className="profile-card">
              <Card.Body>
                <Card.Title>Ιστορικό</Card.Title>
                <Card.Text>
                  Δείτε το ιστορικό των δραστηριοτήτων σας.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} sm={6}>
          <Link to="/Μηνύματα" className="text-decoration-none">
            <Card className="profile-card">
              <Card.Body>
                <Card.Title>Μηνύματα</Card.Title>
                <Card.Text>
                  Διαχειριστείτε τα εισερχόμενα και εξερχόμενα μηνύματά σας.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
