import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PersonaNan from './PersonaNan';
import PersonaGar from './PersonaGar';
import SideImage from '../assets/backImage.jpg';   
import HomeIcon from '@mui/icons-material/Home';
import './Home.css';
import { nannies } from './Guardian';   

function Home() {
  return (
    <>
    
      <section className="hero-section">
        <Link to="/" className="home-icon">
          <HomeIcon fontSize="large" />  
        </Link>
        <img
          src={SideImage}
          alt="Side Image"
          className="img-fluid"   
        />
        <div className="hero-text">
          <Row>
            <Col xs={12} md={6} className="hero-text-col">
              <h1>Βρείτε την ιδανική νταντά για το παιδί σας!</h1>
              <p>Η καλύτερη επιλογή για τη φροντίδα και ασφάλεια των παιδιών σας. Επαγγελματίες νταντάδες με εμπειρία και αγάπη για τα παιδιά.</p>
            </Col>
          </Row>
        </div>
      </section>
 
      <Container className="main-content mt-5">
        <Row className="text-center justify-content-center">
          <Col xs={12} md={6} lg={2} className="d-flex justify-content-center align-items-center">
            <PersonaGar />
          </Col>
          <Col xs={12} md={6} lg={2} className="d-flex justify-content-center align-items-center">
            <PersonaNan />
          </Col>
        </Row>
      </Container>

     
      <section className="how-it-works py-5">
        <Container>
          <h2 className="section-title">Πώς δουλεύει</h2>
          <Row className="steps-row">
            <Col md={4} className="step-col">
              <div className="step">
                <div className="step-icon">1</div>
                <h3 className="step-title">Βρείτε τη νταντά που σας ταιριάζει</h3>
                <p className="step-description">Δείτε ποιοί είναι κοντά σας, τι εμπειρία έχει, τι υπηρεσίες προσφέρει και επιλέξτε την καλύτερη για τις ανάγκες σας.</p>
              </div>
            </Col>
            <Col md={4} className="step-col">
              <div className="step">
                <div className="step-icon">2</div>
                <h3 className="step-title">Κάντε αίτηση</h3>
                <p className="step-description">Απλά και εύκολα, κάντε δήλωση, μετά από σύντομη επικοινωνία με τη νταντά.</p>
              </div>
            </Col>
            <Col md={4} className="step-col">
              <div className="step">
                <div className="step-icon">3</div>
                <h3 className="step-title">Η φύλαξη ξεκινάει</h3>
                <p className="step-description">Η νταντά σας θα φροντίσει το παιδί σας με αγάπη και εμπειρία, στέλνοντας σας τακτική ενημέρωση.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

     
      <section className="nannies-section py-5">
        <Container>
          <h2 className="section-title">Κάποιες διαθέσιμες νταντάδες</h2>
          <Row>
            {nannies.slice(0, 3).map((nanny) => (
              <Col key={nanny.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                <Card className="nanny-card" style={{ maxWidth: '18rem' }}>
                  <Card.Img variant="top" src={nanny.imageUrl} alt={nanny.name} />
                  <Card.Body>
                    <Card.Title>{nanny.name}</Card.Title>
                    <Card.Text>
                      Τιμή/Ώρα: {nanny.fee}
                      <br />
                      Περιοχή: {nanny.region}
                      <br />
                    </Card.Text>
                    <Link to={`/nanny/${nanny.id}`}>
                      <Button variant="primary">Περισσότερα</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;

 