import React from 'react';
import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Instructions.css'

function CriteriaForNan() {
  return (
    <Container className="instructions-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Κριτήρια επιλεξιμότητας νταντάς' }}>Νταντά: Κριτήρια επιλεξιμότητας</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="my-4 page-title">Νταντα: Κριτηρια επιλεξιμοτητας</h2>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Διευκρινίσεις</Card.Title>
              <Card.Text className="instruction-text">
                Ποιοι έχουν δικαίωμα εγγραφής ως νταντά;
              </Card.Text>
              <ul className="instruction-list">
                <li className="checkmark">✔ Κατέχουν τουλάχιστον τον τίτλο σπουδών υποχρεωτικής εκπαίδευσης (μέχρι Γ’ Γυμνασίου).</li>
                <li className="checkmark">✔ Έχουν συμπληρώσει το 18ο έτος της ηλικίας τους.</li>
                <li className="checkmark">✔ Είναι Έλληνες ή αλλοδαποί πολίτες που διαμένουν νόμιμα στην Ελλάδα και έχουν πρόσβαση στην αγορά εργασίας.</li>
                <li className="checkmark">✔ Πληρούν τις προϋποθέσεις της υπ’ αριθμ: 41866/24-04-2023 Τροποποίησης της Πρόσκλησης Εκδήλωσης Ενδιαφέροντος προς υποψήφιους/ες Επιμελητές/τριες που είναι διαθέσιμη στην ιστοσελίδα του Έργου ntantades.gov.gr.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Μπορούν να εγγραφούν ως νταντάδες ακόμη:</Card.Title>
              <ul className="instruction-list">
                <li className="checkmark">✔ Εργαζόμενοι εφόσον το επιτρέπει το ωράριο εργασίας τους και σύμφωνα με την ισχύουσα νομοθεσία.</li>
                <li className="checkmark">✔ Συνταξιούχοι εφόσον ακολουθήσουν τα προβλεπόμενα από την ισχύουσα νομοθεσία για την εργασία των συνταξιούχων.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CriteriaForNan;
