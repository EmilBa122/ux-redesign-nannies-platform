import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col, ListGroup, Breadcrumb, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { nannies } from './Guardian';
import './NannyDetails.css';

import { AuthContext } from '../context/AuthContext';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const NannyDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [nanny, setNanny] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState(null);
  const [uid, setUid] = useState(null);

  const auth = getAuth();
  const firestore = getFirestore();

  const reviews = [
    { name: 'Μαρία Τ.', text: 'Η φύλαξη ήταν υπέροχη!', rating: 5 },
    { name: 'Γιάννης Γ.', text: 'Πολύ επαγγελματίας. Προτείνω ανεπιφύλακτα.', rating: 4 },
    { name: 'Αναστασία Π.', text: 'Ήταν όλα φανταστικά με τα παιδιά. Είμαι απόλυτα ικανοποιημένη.', rating: 5 },
  ];

  useEffect(() => {
    const selectedNanny = nannies.find((n) => n.id === parseInt(id));
    setNanny(selectedNanny);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        const userRef = doc(firestore, 'users', user.uid);
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setRole(docSnap.data().role);
            } else {
              console.log("No such user document!");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data: ", error);
          });
      } else {
        console.log("No user is signed in.");
      }
    });
    return () => unsubscribe();
  }, [id]);

  const handleContactClick = () => {
    
    if (role !== 'Κηδεμόνας') {
      navigate('/signup');
    } else {
      setShowModal(true);  
    }
  };

  const handleDeclarationClick = () => {
  
    if (role !== 'Κηδεμόνας') {
      navigate('/signup');
    } else {
      navigate(`/Request/${nanny.id}`);  
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!nanny) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Κηδεμόνας' }}>Κηδεμόνας</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/nanny/${nanny.id}` }}>{nanny.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="nanny-details-container">
        <Row className="nanny-details-row">
          <Col md={3}>
            <Card className="nanny-details-card">
              <Card.Img
                variant="top"
                src={nanny.imageUrl}
                alt={nanny.name}
                className="nanny-image"
              />
              <Card.Body className="nanny-card-body">
                <Card.Title>{nanny.name}</Card.Title>
                <Card.Text>
                  <strong>Ηλικία:</strong> 25 ετών
                  <br />
                  <strong>Τοποθεσία:</strong> {nanny.region}
                  <br />
                  <strong>Τιμή/Ώρα:</strong> {nanny.fee}
                </Card.Text>
              </Card.Body>
              <div className="nanny-details-buttons">
                <Button variant="primary" onClick={handleContactClick} className="contact-button">
                  Επικοινωνία
                </Button>
                <br />
                <Button variant="secondary" className="mt-3 declaration-button" onClick={handleDeclarationClick}>
                  Δήλωση
                </Button>
              </div>
            </Card>

            <Card className="attributes-card mt-3">
              <Card.Body>
                <h5>Βιογραφικό - Αγγελία:</h5>
                <p>
                  <img src="/content/icons/resume_icon.png" alt="resume" className="image" />
                  <img src="/content/icons/ad_icon.png" alt="ad_icon" className="image" />
                </p>
                <h5>Εμπειρία φύλαξης παιδιών:</h5>
                <p>2+ έτη</p>
                <h5>Προσφέρω:</h5>
                <ul>
                  <li>Χειροτεχνίες</li>
                  <li>Ζωγραφική</li>
                  <li>Διάβασμα</li>
                </ul>
              </Card.Body>
            </Card>

            <Card className="reviews-card mt-4">
              <Card.Body>
                <h5>Κριτικές:</h5>
                <p>
                  <strong>4.0</strong> <span className="text-warning">★★★★☆</span>
                </p>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    5 Αστέρια: <strong>50%</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    4 Αστέρια: <strong>30%</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    3 Αστέρια: <strong>15%</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    2 Αστέρια: <strong>4%</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    1 Αστέρι: <strong>1%</strong>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="about-me-card mt-3">
              <Card.Body>
                <h5>Σχετικά με εμένα</h5>
                <ul>
                  <li>Είμαι {nanny.job}</li>
                  <li>Μιλάω Αγγλικά</li>
                  <li>Έχω δίπλωμα οδήγησης</li>
                  <li>Δεν καπνίζω</li>
                </ul>

                <h6>Διαθεσιμότητα</h6>
                Από: {nanny.availableFrom.toLocaleDateString('el-GR')}
                <br />
                Έως: {nanny.availableTo.toLocaleDateString('el-GR')}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="reviews-header-row">
          <h6 className="reviews-header">Μερικές κριτικές από χρήστες:</h6>
          <ListGroup variant="flush" className="reviews-list">
            {reviews.map((review, index) => (
              <ListGroup.Item key={index} className="review-item">
                <div className="review-header">
                  <strong>{review.name}</strong>
                  <div className="review-rating" style={{ marginLeft: '10px', color: '#f0ad4e' }}>
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Επικοινωνία με {nanny.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Email:</strong> {nanny.email}</p>
          <p><strong>Τηλέφωνο:</strong> {nanny.phone}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Κλείσιμο</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NannyDetails;
