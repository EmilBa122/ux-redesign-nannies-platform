import React from 'react';
import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Instructions.css'

function InformationsForNan() {
  return (
    <Container className="instructions-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Σημαντικές πληροφορίες για νταντά' }}>Νταντά: Σημαντικές πληροφορίες</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="my-4 page-title">Νταντα: Σημαντικες πληροφοριες</h2>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Οι νταντάδες, σε ποια ασφάλιση υπάγονται;</Card.Title>
              <Card.Text className="instruction-text">
                Οι νταντάδες υπάγονται στην ασφάλιση του e-ΕΦΚΑ και αμείβονται με εργόσημο από το πρόσωπο με το οποίο συνάπτουν ιδιωτικό συμφωνητικό. [βλέπε υπ' αριθμ. 6457/27.01.2022 ΚΥΑ, άρθρο 10 παρ. 2 (ΦΕΚ 205/Β’)]. Οι ασφαλισμένοι με εργόσημο δικαιούνται τις ίδιες παροχές όπως και οι λοιποί ασφαλισμένοι.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Πώς καταβάλλονται τα χρήματα στις νταντάδες;</Card.Title>
              <Card.Text className="instruction-text">
                Οι κηδεμόνες πρέπει να καταβάλλουν την αμοιβή που έχει οριστεί στο μεταξύ τους ιδιωτικό συμφωνητικό στην νταντά, εκδίδοντας εργόσημο. Η ονομαστική αξία του εργόσημου πρέπει να είναι τουλάχιστον ίση με την αξία του voucher που δικαιούται ο/η κηδεμόνας.
                Η νταντά υποδεικνύει τον τραπεζικό λογαριασμό στον οποίο ο/η κηδεμόνας καταβάλει την αμοιβή, κατά τη λήξη κάθε μήνα παροχής των υπηρεσιών.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Ποιο είναι το ποσό του voucher που καλύπτει το πρόγραμμα;</Card.Title>
              <Card.Text className="instruction-text">
                Το ποσό του voucher ανέρχεται στα:
              </Card.Text>
              <ul className="instruction-list">
                <li className="checkmark">✔ 500 € μηνιαίως, εφόσον ο/η κηδεμόνας εργάζεται σε καθεστώς πλήρους απασχόλησης ή είναι ελεύθερος επαγγελματίας ή αυτοαπασχολούμενη/ος, ή</li>
                <li className="checkmark">✔ 300 € μηνιαίως, εφόσον ο/η κηδεμόνας εργάζεται σε καθεστώς μερικής απασχόλησης ή εκ περιτροπής απασχόλησης ή είναι εγγεγραμμένη ως άνεργη στο μητρώο ανεργίας της Δ.ΥΠ.Α. (η ανεργία αφορά μόνο στη μητέρα που υποβάλλει αίτηση) ή λαμβάνει, μέσω άλλης δράσης voucher για συμμετοχή σε βρεφονηπιακούς σταθμούς ή αντίστοιχες δομές.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Τί κάνει μια νταντά;</Card.Title>
              <ul className="instruction-list">
                <li className="checkmark">✔ Παρέχει υπηρεσίες φύλαξης και φροντίδας στα βρέφη και νήπια.</li>
                <li className="checkmark">✔ Η φροντίδα παρέχεται στο σπίτι του παιδιού ή στο σπίτι τις νταντάς κατόπιν συνεννόησης με τον κηδεμόνα.</li>
                <li className="checkmark">✔ Η παροχή υπηρεσιών από τις νταντάδες γίνεται τις ημέρες και ώρες που δηλώνουν διαθεσιμότητα, κατόπιν συνεννόησης με τον κηδεμόνα.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Πώς συνεργάζεστε με τους κηδεμόνες;</Card.Title>
              <Card.Text className="instruction-text">
                Εφόσον έρθετε σε επαφή με τον ενδιαφερόμενο κηδεμόνα, θα προχωρήσετε σε προσωπική συνεννόηση για τον τρόπο συνεργασίας σας. Αυτό θα αφορά τις ημέρες και ώρες φροντίδας του παιδιού, το πρόγραμμα που θα ακολουθείτε καθημερινά και τη διάρκεια της συνεργασίας.
                Εφόσον συμφωνήσετε να συνεργαστείτε, μπορείτε μέσω της πλατφόρμας να προχωρήσετε σε μια συμφωνία που θα υπογράψετε ηλεκτρονικά, με το πάτημα ενός κουμπιού, μέσα στην πλατφόρμα.
                Στο τέλος κάθε μήνα θα πληρώνεστε από το γονέα με εργόσημο.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InformationsForNan;
