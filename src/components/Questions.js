import React from 'react';
import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Instructions.css'

function Questions() {
  return (
    <Container className="instructions-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Συχνές ερωτήσεις' }}>Συχνές ερωτήσεις</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="my-4 page-title">Συχνες ερωτησεις</h2>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Ποιο είναι το ποσό του «voucher» που καλύπτει το πρόγραμμα;</Card.Title>
              <Card.Text>
                Το ποσό του «voucher» ανέρχεται στα:
              </Card.Text>
              <ul className="instruction-list">
                <li className="checkmark">✔ 500 € μηνιαίως, εφόσον εργάζεστε με καθεστώς πλήρους απασχόλησης ή είστε ελεύθερος επαγγελματίας ή αυτοαπασχολούμενη/ος, ή</li>
                <li className="checkmark">✔ 300 € μηνιαίως, εφόσον εργάζεστε με καθεστώς μερικής απασχόλησης ή εκ περιτροπής απασχόλησης ή είστε εγγεγραμμένη ως άνεργη στο μητρώο ανεργίας της Δ.ΥΠ.Α. (η ανεργία αφορά μόνο στη μητέρα που υποβάλλει αίτηση) ή λαμβάνετε, μέσω άλλης δράσης voucher για συμμετοχή σε βρεφονηπιακούς σταθμούς ή αντίστοιχες δομές.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Τα προσωπικά δεδομένα που περιέχονται στην αίτησή μου προστατεύονται;</Card.Title>
              <Card.Text>
                Ναι, τα προσωπικά σας δεδομένα προστατεύονται σύμφωνα με το Ν. 4624/2019 (ΦΕΚ 137/Α/2019) «Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα, μέτρα εφαρμογής του Κανονισμού (ΕΕ) 2016/679 του Ευρωπαϊκού Κοινοβουλίου και του Συμβουλίου της 27ης Απριλίου 2016 για την προστασία των φυσικών προσώπων έναντι της επεξεργασίας δεδομένων προσωπικού χαρακτήρα και ενσωμάτωση στην εθνική νομοθεσία της Οδηγίας (ΕΕ) 2016/680 του Ευρωπαϊκού Κοινοβουλίου και του Συμβουλίου της 27ης Απριλίου 2016 και άλλες διατάξεις», όπως κάθε φορά ισχύει.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Υπάρχει δυνατότητα επικοινωνίας για επιπλέον διευκρινίσεις;</Card.Title>
              <Card.Text>
                Για οποιαδήποτε περαιτέρω διευκρίνιση κι επίλυση τυχόν προβλημάτων των ενδιαφερομένων, διατίθεται υπηρεσία Helpdesk (τηλ.: 210 3258 080, 210 3258 090, e-mail: ntantades@yeka.gr).
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Questions;
