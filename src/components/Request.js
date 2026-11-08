import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import { nannies } from './Guardian';
import './Request.css';

const Request = () => {
  const { id } = useParams();
  const [nanny, setNanny] = useState(null);
  const [voucher, setVoucher] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const selectedNanny = nannies.find((n) => n.id === parseInt(id));
    setNanny(selectedNanny);
  }, [id]);

  const handlePayment = () => {
    const generatedVoucher = `VOUCHER-${Math.floor(1000 + Math.random() * 9000)}`;
    setVoucher(generatedVoucher);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Επιτυχής υποβολή');
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); // Message disappears after 5 seconds
  };

  if (!nanny) {
    return <div>Δεν υπάρχουν δεδομένα για την νταντά.</div>;
  }

  return (
    <Container 
    className="request-page mt-5"
    style = {{
      marginBottom : "50px",
    }}>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Κηδεμόνας' }}>Κηδεμόνας</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/nanny/${nanny.id}` }}>{nanny.name}</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/Request/${nanny.id}` }}>Δήλωση</Breadcrumb.Item>
      </Breadcrumb>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center mb-4">Δήλωση</h3>

              <Row>
                <Col md={4} className="text-center">
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

                <Col md={8}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4 d-flex align-items-center">
                      <Form.Label className="me-3">Ιδιωτικό Συμφωνητικό:</Form.Label>
                      <Button variant="outline-primary">Προσθήκη</Button>
                    </Form.Group>

                    <Form.Group className="mb-4 d-flex align-items-center">
                      <Form.Label className="me-3">Πιστοποίηση ολοκλήρωσης εργασίας:</Form.Label>
                      <Button variant="outline-primary">Προσθήκη</Button>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Voucher</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ο κωδικός θα εμφανιστεί εδώ, μετά την πληρωμή"
                        value={voucher}
                        readOnly
                        className="text-center"
                      />
                    </Form.Group>

                    <Row className="mb-4 mt-4">
                      <Col>
                      <Link to = {`/EndCollab/${nanny.id}`}>
                        <Button variant="secondary" className="w-100 cancel-btn">
                          Λήξη/Ανανέωση συνεργασίας
                        </Button>
                      </Link>
 
                      </Col>
                      <Col>
                        <Button
                          variant="success"
                          className="w-100 submit-btn"
                          onClick={handlePayment}
                        >
                          Πληρωμή
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>

              <hr className="my-4" />

              <div className="text-center">
                <Link to={`/nanny/${nanny.id}`}>
                  <button type="button" className="cancel-btn me-3"> {/* Add `me-3` here */}
                    Ακύρο
                  </button>
                </Link>

                <button
                  type="submit"
                  className="submit-btn ms-3"  
                  onClick={handleSubmit}
                >
                  Υποβολή
                </button>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Request;
