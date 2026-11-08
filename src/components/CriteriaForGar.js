import React from 'react';
import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Instructions.css'

function CriteriaForGar() {
  return (
    <Container className="instructions-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Κριτήρια επιλεξιμότητας κηδεμόνα' }}>Κηδεμόνας: Κριτήρια επιλεξιμότητας</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="my-4 page-title">Κηδεμονας: Κριτηρια επιλεξιμοτητας</h2>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Δικαίωμα συμμετοχής για την απόκτηση voucher έχουν:</Card.Title>
              <ul className="instruction-list">
                <li className="checkmark">✔ Μητέρες φυσικές, θετές ή ανάδοχες, με βρέφος ή νήπιο, που εργάζονται είτε στο δημόσιο είτε στον ιδιωτικό τομέα, με οποιαδήποτε μορφή απασχόλησης, συμπεριλαμβανομένων και των αυτοαπασχολούμενων και ελεύθερων επαγγελματιών.</li>
                <li className="checkmark">✔ Μητέρες φυσικές, θετές ή ανάδοχες, με βρέφος ή νήπιο, που είναι εγγεγραμμένες στα μητρώα της Δ.ΥΠ.Α. (πρώην ΟΑΕΔ) ως άνεργες.</li>
                <li className="checkmark">✔ Πατέρες φυσικοί, θετοί ή ανάδοχοι, που ασκούν την αποκλειστική γονική μέριμνα βρέφους ή νηπίου και εργάζονται είτε στο δημόσιο είτε στον ιδιωτικό τομέα με οποιαδήποτε μορφή απασχόλησης, συμπεριλαμβανομένων και των αυτοαπασχολούμενων και ελεύθερων επαγγελματιών.</li>
                <li className="checkmark">✔ Κάθε πρόσωπο στο οποίο έχει ανατεθεί, με δικαστική απόφαση ή εισαγγελική διάταξη, η αποκλειστική επιμέλεια βρέφους ή νηπίου, που εργάζεται είτε στο δημόσιο είτε στον ιδιωτικό τομέα, με οποιαδήποτε μορφή απασχόλησης, συμπεριλαμβανομένων και των αυτοαπασχολούμενων και ελεύθερων επαγγελματιών.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="instruction-card mb-4">
            <Card.Body>
              <Card.Title className="info-card-title">Επιπλέον προϋποθέσεις:</Card.Title>
              <ul className="instruction-list">
                <li className="checkmark">✔ Το ετήσιο ατομικό εισόδημά σας να μην υπερβαίνει το ποσό των 24.000 € για το φορολογικό έτος 2022 (για εισοδήματα που αποκτήθηκαν από 01/01/2022 έως 31/12/2022).</li>
                <li className="checkmark">✔ Να είστε εργαζόμενη/ος ή άνεργη εγγεγραμμένη στα μητρώα της ΔΥΠΑ (Προσοχή! η ανεργία αφορά μόνο στη μητέρα που υποβάλλει αίτηση).</li>
                <li className="checkmark">✔ Να μην τελείτε υπό καθεστώς άδειας μητρότητας ή άδειας πατρότητας ή άδειας ανατροφής τέκνου ή γονικής άδειας ή ειδικής παροχής προστασίας μητρότητας του άρθρου 36 του ν. 4808/2021 (ΦΕΚ/Α/101) ή να μην έχετε διακόψει ή αναστείλει την επαγγελματική σας δραστηριότητα.</li>
                <li className="checkmark">✔ Να έχετε ανήλικο τέκνο δύο (2) μηνών έως δύο (2) ετών και έξι (6) μηνών.</li>
                <li className="checkmark">✔ Η διεύθυνση διαμονής σας να είναι εντός των Δήμων που συμμετέχουν στην Πιλοτική εφαρμογή της Δράσης.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CriteriaForGar;
