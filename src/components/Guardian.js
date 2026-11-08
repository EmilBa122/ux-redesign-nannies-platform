import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Guardian.css';
import nan1 from '../assets/nan1.jpg';
import nan2 from '../assets/nan2.jpg';
import nan3 from '../assets/nan3.jpg';
import nan4 from '../assets/nan4.jpg';
import nan5 from '../assets/nan5.jpg';
import nan6 from '../assets/nan6.jpg';
import nan7 from '../assets/nan7.jpg';


import areasData from './areas.json';

export const nannies = [
  { id: 1, name: 'Θεοδώρα Χ.', ageOfChild: '0-6 μηνών', region: 'Ιλίσια', timeOfWork: 'Ολική', job: 'Παιδαγωγός', imageUrl: nan1, availableFrom: new Date('2024-6-29'), availableTo: new Date('2024-12-31'), fee: '10 ευρώ',phone: "6981111111", email: "theodoraX@gmail.com" },
  { id: 2, name: 'Θωμάς Γ.', ageOfChild: '7-12 μηνών', region: 'Κεραμεικός', timeOfWork: 'Μερική', job: 'Νηπιαγωγός', imageUrl: nan2, availableFrom: new Date('2024-02-01'), availableTo: new Date('2024-08-31'), fee: '8 ευρώ', phone: "6982222222", email: "thomasG@gmail.com" },
  { id: 3, name: 'Ιωάννα Ε.', ageOfChild: '13-18 μηνών', region: 'Πατήσια', timeOfWork: 'Ολική', job: 'Βρεφονηπιοκόμος', imageUrl: nan3, availableFrom: new Date('2024-03-01'), availableTo: new Date('2024-09-30'), fee: '12 ευρώ', phone: "6983333333", email: "ioannaE@gmail.com" },
  { id: 4, name: 'Ελένη Π.', ageOfChild: '0-6 μηνών', region: 'Πλάκα', timeOfWork: 'Ολική', job: 'Παιδαγωγός', imageUrl: nan4, availableFrom: new Date('2024-06-01'), availableTo: new Date('2024-12-31'), fee: '15 ευρώ', phone: "6984444444", email: "elenhP@gmail.com" },
  { id: 5, name: 'Ειρήνη Α.', ageOfChild: '7-12 μηνών', region: 'Κουκάκι', timeOfWork: 'Μερική', job: 'Νηπιαγωγός', imageUrl: nan5, availableFrom: new Date('2024-04-01'), availableTo: new Date('2024-12-31'), fee: '10 ευρώ', phone: "6985555555", email: "iriniA@gmail.com" },
  { id: 6, name: 'Γιώργος Ρ.', ageOfChild: '13-18 μηνών', region: 'Γκάζι', timeOfWork: 'Μερική', job: 'Παιδαγωγός', imageUrl: nan6, availableFrom: new Date('2024-05-01'), availableTo: new Date('2024-12-31') , fee: '14 ευρώ', phone: "6989999999", email: "giorgosR@gmail.com"},
  { id: 7, name: 'Παρασκευή Κ.', ageOfChild: '13-18 μηνών', region: 'Ιλίσια', timeOfWork: 'Μερική', job: 'Παιδαγωγός', imageUrl: nan7, availableFrom: new Date('2024-01-01'), availableTo: new Date('2024-12-31'), fee: '11 ευρώ', phone: "6987777777", email: "paraskeviK@gmail.com" }
];

function Guardian() {
  const [ageOfChild, setAgeOfChild] = useState([]);
  const [region, setRegion] = useState('');
  const [timeOfWork, setTimeOfWork] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [job, setJob] = useState([]);
  const [filteredNannies, setFilteredNannies] = useState(nannies);
  
  const [currentPage, setCurrentPage] = useState(1);
  const nanniesPerPage = 6;
  
  
  const areas = areasData.areas;

  const handleCheckboxChange = (setter, value) => {
    setter((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleFilter = () => {
    const filtered = nannies.filter((nanny) => {
      const ageMatch = ageOfChild.length === 0 || ageOfChild.includes(nanny.ageOfChild);
      const regionMatch = region === '' || nanny.region === region;
      const timeMatch = timeOfWork === '' || nanny.timeOfWork === timeOfWork;
      const jobMatch = job.length === 0 || job.includes(nanny.job);
      
      const availabilityMatch = 
        (!startDate || nanny.availableFrom <= startDate) && 
        (!endDate || nanny.availableTo >= endDate);

      return ageMatch && regionMatch && timeMatch && jobMatch && availabilityMatch;
    });

    setFilteredNannies(filtered);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setAgeOfChild([]); 
    setRegion(''); 
    setTimeOfWork(''); 
    setStartDate(null); 
    setEndDate(null); 
    setJob([]); 
    setFilteredNannies(nannies); 
    setCurrentPage(1);  
  };

  const indexOfLastNanny = currentPage * nanniesPerPage;
  const indexOfFirstNanny = indexOfLastNanny - nanniesPerPage;
  const currentNannies = filteredNannies.slice(indexOfFirstNanny, indexOfLastNanny);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(filteredNannies.length / nanniesPerPage);

  return (
    <Container className="guardian-container">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Κηδεμόνας' }}>Κηδεμόνας</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="text-center">Επιλέξτε νταντά</h2>
      <Row>
        <Col md={4}>
          <Card className="filter-card">
            <Card.Body>
              <Form>
                <Form.Group controlId="ageOfChild">
                  <Form.Label>Ηλικία παιδιού</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="0-6 μηνών"
                    onChange={() => handleCheckboxChange(setAgeOfChild, '0-6 μηνών')}
                    checked={ageOfChild.includes('0-6 μηνών')}
                    className="custom-checkbox"
                  />
                  <Form.Check
                    type="checkbox"
                    label="7-12 μηνών"
                    onChange={() => handleCheckboxChange(setAgeOfChild, '7-12 μηνών')}
                    checked={ageOfChild.includes('7-12 μηνών')}
                    className="custom-checkbox"
                  />
                  <Form.Check
                    type="checkbox"
                    label="13-18 μηνών"
                    onChange={() => handleCheckboxChange(setAgeOfChild, '13-18 μηνών')}
                    checked={ageOfChild.includes('13-18 μηνών')}
                    className="custom-checkbox"
                  />
                  <Form.Check
                    type="checkbox"
                    label="18+ μηνών"
                    onChange={() => handleCheckboxChange(setAgeOfChild, '18+ μηνών')}
                    checked={ageOfChild.includes('18+ μηνών')}
                    className="custom-checkbox"
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="region">
                  <Form.Label>Περιοχή διαμονής</Form.Label>
                  <Form.Control
                    as="select"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="region-select with-down-arrow"
                  >
                    <option value="">Όλες</option>
                    {areas.map((area, index) => (
                      <option key={index} value={area}>{area}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <br />
                <Form.Group controlId="timeOfWork">
                  <Form.Label>Τύπος απασχόλησης</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Πλήρης"
                    name="timeOfWork"
                    value="Πλήρης"
                    onChange={(e) => setTimeOfWork(e.target.value)}
                    checked={timeOfWork === 'Πλήρης'}
                    className="custom-radio"
                  />
                  <Form.Check
                    type="radio"
                    label="Μερική"
                    name="timeOfWork"
                    value="Μερική"
                    onChange={(e) => setTimeOfWork(e.target.value)}
                    checked={timeOfWork === 'Μερική'}
                    className="custom-radio"
                  />  
                </Form.Group>
                <br />
                <Form.Group controlId="calendar">
                  <Form.Label>Διαθεσιμότητα</Form.Label>
                  <br />
                  <div className="datepicker-container">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      isClearable
                      placeholderText="Ημερομηνία έναρξης"
                      className="form-control with-calendar-icon"
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      isClearable
                      placeholderText="Ημερομηνία λήξης"
                      className="form-control with-calendar-icon"
                    />
                  </div>
                </Form.Group>


                <br />
                <Form.Group controlId="job">
                  <Form.Label>Σπουδές</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Βρεφονηπιοκόμος"
                    onChange={() => handleCheckboxChange(setJob, 'Βρεφονηπιοκόμος')}
                    checked={job.includes('Βρεφονηπιοκόμος')}
                    className="custom-checkbox"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Νηπιαγωγός"
                    onChange={() => handleCheckboxChange(setJob, 'Νηπιαγωγός')}
                    checked={job.includes('Νηπιαγωγός')}
                    className="custom-checkbox"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Παιδαγωγός"
                    onChange={() => handleCheckboxChange(setJob, 'Παιδαγωγός')}
                    checked={job.includes('Παιδαγωγός')}
                    className="custom-checkbox"
                  />
                </Form.Group>
                <br />

                <Button variant="link" onClick={handleClearFilters} className="mt-2">
                  Καθαρισμός επιλογών
                </Button>
                <Button variant="primary" onClick={handleFilter}>
                  Αναζήτηση
                </Button> 
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className="mb-5">
          <Row className='nanny-grid'>
            {currentNannies.map((nanny) => (
              <Col md={4} key={nanny.id}>
                <Card className="nanny-card">
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
          <Row>
            <Col className="d-flex justify-content-between">
              <Button variant="secondary" onClick={prevPage} disabled={currentPage === 1}>
                Προηγούμενη
              </Button>
              <Button variant="secondary" onClick={nextPage} disabled={currentPage === totalPages}>
                Επόμενη
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Guardian;
