import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'; // React Router for navigation

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';

import { AuthContext } from '../context/AuthContext';

import { getFirestore, doc, getDoc } from 'firebase/firestore';

function Header() {

  const { user, setUser } = useContext(AuthContext); 
  const auth = getAuth();
  const navigate = useNavigate();

  const firestore = getFirestore();

  const [role, setRole] = useState(null);
  const [uid, setUid] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        const userRef = doc(firestore, 'users', user.uid);
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setRole(docSnap.data().role);
            } else {
              console.log("No such user document!");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data: ", error);
          });
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });
      return () => unsubscribe(); 
  }, [auth, setUser]);

  const handleSignOut = async () => {
      await signOut(auth);
      setUser(null); 
      navigate('/');
  };

  let temp = '';
    
  if (user)
  {
    if (role !== 'Κηδεμόνας')
    {
      temp = '/HomePageBabysitter';
    }
    else 
    {
      temp = '/Κηδεμόνας';
    }
  }


  const handleUserClick = () => {
    navigate("/Προφίλ"); 
  };

  return (
    <header>
      <Navbar expand="lg" className="navbar-bg">
        <Container fluid className="navbar-container">
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            Ντανταδες της Γειτονιας
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="navbar-links my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" className="nav-link">Αρχικη</Nav.Link>

              <NavDropdown title="Κηδεμονας" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/Κηδεμόνας">Κηδεμόνας</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Οδηγίες κηδεμόνα">Οδηγίες</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Κριτήρια επιλεξιμότητας κηδεμόνα">
                  Κριτήρια επιλεξιμότητας
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Νταντα" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/HomePageBabysitter">Νταντά</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Οδηγίες νταντάς">Οδηγίες</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Κριτήρια επιλεξιμότητας νταντάς">
                  Κριτήρια επιλεξιμότητας
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Σημαντικές πληροφορίες για νταντά">
                  Νταντά: Σημαντικές πληροφορίες
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            


            <div className="navbar-buttons">
              {user ? (
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center user-info me-3"
                    onClick={handleUserClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <FaUserCircle size={24} className="me-2" />
                    <span>{user.email}</span>
                  </div>
                  <Button
                    variant="danger"
                    onClick={handleSignOut}
                    className="logout-button"
                  >
                    Αποσύνδεση
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline-primary" as={Link} to="/login" className="login-button">Σύνδεση</Button>
                  <Button variant="outline-success" as={Link} to="/signup" className="signup-button ms-2">Εγγραφή</Button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header> 
  );
}

export default Header;
