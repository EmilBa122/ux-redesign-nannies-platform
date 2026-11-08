import React from 'react';
import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Instructions.css'

function InstructionsForNan() {
  return (
    <Container className="instructions-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Οδηγίες νταντάς' }}>Νταντά: Οδηγίες</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="my-4 page-title">Νταντα: Οδηγιες</h2>
      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Text className="instruction-text">
                Τα βήματα που πρέπει να ακολουθήσει μια νταντά, με σκοπό την εύρεση εργασίας και πληρωμής από αυτόν τον ιστοχώρο είναι τα εξής:
              </Card.Text>
              <ol className="instruction-list">
                <li className="checkmark">✔ Σύνδεση ή Εγγραφή στον ιστοχώρο ως νταντά.</li>
                <li className="checkmark">
                  ✔ (Εάν έχετε φτιάξει ήδη μια Αγγελία αγνοείστε τα βήματα 2) - 5) συνεχίζεται στο 6) βήμα). Εάν έχετε συνδεθεί επιτυχώς ως νταντά στην αρχική οθόνη, θα σας εμφανίζονται διάφορες επιλογές που μπορείτε να κάνετε. Για να βρείτε δουλειά, θα πρέπει να φτιάξετε μια Αγγελία για να την δουν οι ενδιαφερόμενοι κηδεμόνες.
                </li>
                <li className="checkmark">✔ Πατώντας το κουμπί που βρίσκεται πάνω αριστερά μέσα στο κουτί “Θέλω να δημιουργήσω καινούργιο/α .... ”</li>
                <li className="checkmark">✔ Σας εμφανίζεται μια φόρμα με ήδη κάποια στοιχεία συμπληρωμένα. Στα πεδία που δεν είναι συμπληρωμένα, τα συμπληρώνετε εσείς με βάση τα στοιχεία σας.</li>
                <li className="checkmark">✔ Μόλις συμπληρώσετε όλα τα πεδία, πατήστε το κουμπί "οριστικοποίηση", που βρίσκεται κάτω δεξιά.</li>
                <li className="checkmark">✔ Περιμένετε μέχρι να σας έρθει ένα μήνυμα από κάποιον κηδεμόνα.</li>
                <li className="checkmark">✔ Όταν σας στείλει ένας κηδεμόνας μήνυμα, επικοινωνήστε μαζί του είτε τηλεφωνικά είτε μέσω email με σκοπό τον προγραμματισμό ραντεβού και συμφωνίας.</li>
                <li className="checkmark">✔ “Υπογραφή” ιδιωτικού συμφωνητικού συνεργασίας μέσω της διεπαφής.</li>
                <li className="checkmark">✔ Και στο τέλος του κάθε μήνα, θα πληρώνεστε από τον κηδεμόνα. Θα σας στέλνει μέσω της διεπαφής έναν κωδικό (το voucher).</li>
                <li className="checkmark">✔ Εξαργύρωση του κωδικού αυτού σε χρήματα μέσω της τράπεζάς σας.</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InstructionsForNan;

