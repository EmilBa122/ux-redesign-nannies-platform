import React, { useState, useRef, useEffect } from 'react';
import './PersonalInfoForm.css';  
import { useNavigate, Link } from 'react-router-dom';
import './History.css';
import { Container, Breadcrumb, Row, Col, Card, ListGroup } from 'react-bootstrap';
import profileImage from '../assets/parent.jpg'; 

const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    birthYear: '',
    gender: '',
    idNumber: '',
    taxNumber: '',
    amka: '',
    maritalStatus: '',
    isParent: '',
    documentNumber: '',
    taxIdNumber: '',
    region: '',
    city: '',
    street: '',
    streetNumber: '',
    postalCode: '',
    mobilePhone: '',
    landlinePhone: '',
    email: ''
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    landlinePhone: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobilePhoneRef = useRef(null);
  const landlinePhoneRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedData = localStorage.getItem('personalInfo');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrorMessages = { ...errorMessages };

   
    for (const key in newErrorMessages) {
      newErrorMessages[key] = '';
    }

   
    if (!formData.firstName) {
      newErrorMessages.firstName = 'Το Όνομα είναι υποχρεωτικό';
      hasError = true;
    }
    if (!formData.lastName) {
      newErrorMessages.lastName = 'Το Επώνυμο είναι υποχρεωτικό';
      hasError = true;
    }
    if (!formData.email) {
      newErrorMessages.email = 'Το Email είναι υποχρεωτικό';
      hasError = true;
    }

    
    if (!formData.mobilePhone || formData.mobilePhone.length !== 10 || isNaN(formData.mobilePhone)) {
      newErrorMessages.mobilePhone = 'Το κινητό τηλέφωνο πρέπει να έχει ακριβώς 10 ψηφία και να περιέχει μόνο αριθμούς';
      hasError = true;
    }

   
    if (formData.landlinePhone && (formData.landlinePhone.length !== 10 || isNaN(formData.landlinePhone))) {
      newErrorMessages.landlinePhone = 'Το σταθερό τηλέφωνο πρέπει να έχει ακριβώς 10 ψηφία και να περιέχει μόνο αριθμούς';
      hasError = true;
    }

    setErrorMessages(newErrorMessages);

    if (hasError) {
      if (newErrorMessages.firstName) {
        firstNameRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (newErrorMessages.lastName) {
        lastNameRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (newErrorMessages.email) {
        emailRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (newErrorMessages.mobilePhone) {
        mobilePhoneRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (newErrorMessages.landlinePhone) {
        landlinePhoneRef.current.scrollIntoView({ behavior: 'smooth' });
      }

      return;
    }

    localStorage.setItem('personalInfo', JSON.stringify(formData));

    setSuccessMessage('Επιτυχής υποβολή');

    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);   

    console.log(formData);
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/\D/g, '');  
    if (value.length <= 10) {
      setFormData({
        ...formData,
        [e.target.name]: value
      });
    }
  };

  return (
    <Container className="history-container mt-5">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προφίλ' }}>Προφίλ</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/Προσωπικά στοιχεία' }}>Προσωπικά στοιχεία</Breadcrumb.Item>
      </Breadcrumb>
      
      <Row>
        <Col md={4}>
          <Card className="sidebar-card">
            <Card.Img variant="top" src={profileImage} alt="Profile" className="sidebar-image" />
            <Card.Body>
              <h5 className="profile-name">Κωνσταντίνος Π.</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Link to="/Προσωπικά στοιχεία" className="shaded-link">Προσωπικά στοιχεία</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/Ιστορικό" style={{ textDecoration: 'none' }}>Ιστορικό</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/Μηνύματα" style={{ textDecoration: 'none' }}>Μηνύματα</Link>
                </ListGroup.Item> 
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <form className="personal-info-form" onSubmit={handleSubmit}>
            <h2>Προσωπικά στοιχεία</h2>
            
            <div className="form-group">
              <label>Όνομα: <span className="required">*</span></label>
              <input
                ref={firstNameRef}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errorMessages.firstName ? 'invalid' : ''}
              />
              {errorMessages.firstName && <p className="error-message">{errorMessages.firstName}</p>}
            </div>

            <div className="form-group">
              <label>Επώνυμο: <span className="required">*</span></label>
              <input
                ref={lastNameRef}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errorMessages.lastName ? 'invalid' : ''}
              />
              {errorMessages.lastName && <p className="error-message">{errorMessages.lastName}</p>}
            </div>

            <div className="form-group">
              <label>Όνομα πατέρα:</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Όνομα μητέρας:</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Έτος γέννησης:</label>
              <input
                type="text"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Φύλο:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Επιλέξτε</option>
                <option value="Male">Άνδρας</option>
                <option value="Female">Γυναίκα</option>
              </select>
            </div>

            <div className="form-group">
              <label>Αριθμός ταυτότητας:</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Αριθμός Φορολογικού Μητρώου (Α.Φ.Μ.):</label>
              <input
                type="text"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>ΑΜΚΑ:</label>
              <input
                type="text"
                name="amka"
                value={formData.amka}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Οικογενειακή ατάσταση:</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Επιλέξτε</option>
                <option value="Married">Έγγαμος</option>
                <option value="Single">Ανύπαντρος</option>
                <option value="Other">Άλλο</option>
              </select>
            </div>

            <div className="form-group">
              <label>Αριθμός Δελτίου Ταυτότητας:</label>
              <input
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Αριθμός Ταυτότητας Φορολογικού Μητρώου:</label>
              <input
                type="text"
                name="taxIdNumber"
                value={formData.taxIdNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Περιοχή:</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Πόλη:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Οδός:</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Αριθμός οδού:</label>
              <input
                type="text"
                name="streetNumber"
                value={formData.streetNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ταχυδρομικός κώδικας:</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Κινητό τηλέφωνο: <span className="required">*</span></label>
              <input
                ref={mobilePhoneRef}
                type="text"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handlePhoneInput}
                className={errorMessages.mobilePhone ? 'invalid' : ''}
              />
              {errorMessages.mobilePhone && <p className="error-message">{errorMessages.mobilePhone}</p>}
            </div>

            <div className="form-group">
              <label>Σταθερό τηλέφωνο:</label>
              <input
                ref={landlinePhoneRef}
                type="text"
                name="landlinePhone"
                value={formData.landlinePhone}
                onChange={handlePhoneInput}
                className={errorMessages.landlinePhone ? 'invalid' : ''}
              />
              {errorMessages.landlinePhone && <p className="error-message">{errorMessages.landlinePhone}</p>}
            </div>

            <div className="form-group">
              <label>Email: <span className="required">*</span></label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errorMessages.email ? 'invalid' : ''}
              />
              {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate('/Προφίλ')}>Ακύρο</button>
              <button type="submit" className="submit-btn">Υποβολή</button>   
            </div>

            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalInfoForm;
