import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Breadcrumb, Form, Modal } from 'react-bootstrap';
import { nannies } from './Guardian';
import './Request.css';

const EndCollab = () => {
  const { id } = useParams();
  const [nanny, setNanny] = useState(null); 
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);  

   
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const selectedNanny = nannies.find((n) => n.id === parseInt(id));
    setNanny(selectedNanny);
  }, [id]);

  const handleSubmit = () => {
    setShowModal(false);  
    setSuccessMessage('Επιτυχής λήξη συνεργασίας');
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);  
  };

  const handleRating = (star) => {
    setRating(star);  
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value); 
  };

  const handleShowModal = () => setShowModal(true);  
  const handleCloseModal = () => setShowModal(false);  

  if (!nanny) {
    return <div>Δεν υπάρχουν δεδομένα για την νταντά.</div>;
  }

  return (
    <Container 
      className="request-page mt-5"
      style={{ marginBottom: '50px' }}
    >
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Κηδεμόνας' }}>Κηδεμόνας</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/nanny/${nanny.id}` }}>{nanny.name}</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/Request/${nanny.id}` }}>Δήλωση</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/EndCollab/${nanny.id}` }}>Λήξη/Ανανέωση συνεργασίας</Breadcrumb.Item>
      </Breadcrumb>

      
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center mb-4">Λήξη/Ανανέωση συνεργασίας</h3>

              <Row className="text-center">
                <Col md={12}>
                  <Card.Img
                    variant="top"
                    src={nanny.imageUrl}
                    alt={nanny.name}
                    className="nanny-image"
                    style={{
                      width: '180px',
                      height: '300px',
                      marginBottom: '20px',
                      objectFit: 'cover',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      border: '4px solid #f0f0f0',
                      padding: '5px',
                    }}
                  />
                  <h5>{nanny.name || 'Δεν υπάρχει όνομα'}</h5>
                </Col>
              </Row>

              <hr />
             
              <Row>
                <Col md={12}>
                  <div className="critic-section">
                   
                    <Form>
                      <Form.Group controlId="reviewText">
                        <Form.Label>Κριτική</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={reviewText}
                          onChange={handleReviewChange}
                          placeholder="Γράψτε την κριτική σας εδώ..."
                        />
                      </Form.Group>

                      <Form.Group controlId="rating" className="mt-3">
                        <Form.Label>Βαθμολογία</Form.Label>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`star ${star <= rating ? 'filled' : ''}`}
                              onClick={() => handleRating(star)}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4 mt-4">
                <Col>
                  <Button
                    variant="secondary" 
                    className="w-100 cancel-btn"
                    onClick={handleShowModal}  
                  >
                    Λήξη συνεργασίας
                  </Button>
                </Col>
                <Col>
                  <Link to={`/Request/${nanny.id}`}>
                    <Button
                      type="submit"
                      className="submit-btn w-100"  
                    >
                      Ανανέωση συνεργασίας
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

  
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Επιβεβαίωση λήξης συνεργασίας</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Είστε σίγουροι ότι θέλετε να λήξετε τη συνεργασία με την {nanny.name};
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Όχι
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Ναι
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EndCollab;
