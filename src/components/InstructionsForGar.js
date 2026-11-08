import React from 'react';
import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Instructions.css'

function InstructionsForGar() {
  return (
    <Container className="instructions-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Οδηγίες κηδεμόνα' }}>Κηδεμoνας: Οδηγiες</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="my-4 page-title">Κηδεμονας: Οδηγιες</h2>
      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="instruction-title">
                Τα βήματα που πρέπει να ακολουθήσει ένας κηδεμόνας(*), με σκοπό την εύρεση νταντάς είναι τα εξής:
              </Card.Title>
              <ul className="instruction-list">
                <li className="checkmark">✔ Περιήγηση στον χώρο των νταντάδων.</li>
                <li className="checkmark">✔ Επιλογή ενός προσώπου με βάση παρεχόμενα φίλτρα (όπως ηλικία, επάγγελμα κ.ο.κ.).</li>
                <li className="checkmark">✔ Σύνδεση με τα προσωπικά του στοιχεία.</li>
                <li className="checkmark">✔ Αποστολή μηνύματος στη νταντά με σκοπό τον προγραμματισμό ραντεβού και συμφωνίας.</li>
                <li className="checkmark">✔ Λήψη μηνύματος επιβεβαίωσης από την νταντά.</li>
                <li className="checkmark">✔ “Υπογραφή” ιδιωτικού συμφωνητικού συνεργασίας μέσω της διεπαφής.</li>
                <li className="checkmark">✔ Πληρωμή μέσω voucher (μηνιαία).</li>
              </ul>
              <p className="footnote">(*) Εφόσον πληρεί τις προϋποθέσεις για απόκτηση voucher.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InstructionsForGar;
