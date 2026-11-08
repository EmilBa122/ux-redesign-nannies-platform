import React from 'react'; 
import { Container, Row, Col } from 'react-bootstrap'; 
import './Footer.css'; 
import { Link } from 'react-router-dom'

function Footer() { 
    return ( 
<footer className="footer"> 
    <Container> 
        <Row> 
            <Col md={2}> 
                <h5>Κηδεμόνας</h5> 
                <ul className="list-unstyled">
                    <li><Link to='/Κηδεμόνας' className="text-white">Κηδεμόνας</Link></li> 
                    <li><Link to='/Οδηγίες κηδεμόνα' className="text-white">Οδηγίες</Link></li> 
                    <li><Link to='/Κριτήρια επιλεξιμότητας κηδεμόνα' className="text-white">Κριτήρια επιλεξιμότητας</Link></li> 
                </ul>  
            </Col>  
            <Col md={2}> 
                <h5 as = {Link} to='/HomePageBabysitter'>Νταντά</h5> 
                <ul className="list-unstyled"> 
                    <li><Link to='/HomePageBabysitter' className="text-white">Νταντά</Link></li> 
                    <li><Link to='/Οδηγίες νταντάς' className="text-white">Οδηγίες</Link></li> 
                    <li><Link to='/Κριτήρια επιλεξιμότητας νταντάς' className="text-white">Κριτήρια επιλεξιμότητας</Link></li>
                    <li><Link to='/Σημαντικές πληροφορίες για νταντά' className="text-white">Σημαντικές πληροφορίες</Link></li> 
                </ul>  
            </Col>    
            <Col md={2}> 
                <h5>Σχετικά</h5> 
                <ul className="list-unstyled"> 
                <li><Link to='/Συχνές ερωτήσεις' className="text-white">Συνχές ερωτήσεις</Link></li>   
                </ul> 
            </Col>          
            <Col md={2}> 
                <h5>Επικοινωνία</h5> 
                <p>Email: info@dantades.gr</p> 
                <p>Τηλέφωνο: +30 210 1234567</p> 
                <p>Διεύθυνση: 123 Street Name, Athens, Greece</p> 
            </Col> 
            <Col md={2}> 
                <h5>Ακολουθήστε μας</h5> 
                <ul className="list-unstyled"> 
                    <li><a href="https://www.facebook.com" className="text-white">Facebook</a></li> 
                    <li><a href="https://www.twitter.com" className="text-white">Twitter</a></li> 
                    <li><a href="https://www.instagram.com" className="text-white">Instagram</a></li> 
                </ul> 
            </Col> 

        </Row> 
        <Row> 
            <Col className="text-center mt-3"> 
                <p>&copy; 2024 Νταντάδες της Γειτονιάς. All Rights Reserved.</p> 
            </Col> 
        </Row> 
    </Container> 
    </footer>
    ); 
} 

export default Footer;