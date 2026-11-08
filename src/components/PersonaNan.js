import React, { useState, useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap'; 
import nanny from '../assets/nanny.jpg'
import { Link } from 'react-router-dom'
import './Home.css'

import { AuthContext } from '../context/AuthContext';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function PersonaNan() { 

    const { user } = useContext(AuthContext);

    const [role, setRole] = useState(null);
    const [uid, setUid] = useState(null); 

    const auth = getAuth();
    const firestore = getFirestore();

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

    console.log("role:", role);

    let temp = '';
    
    if (user)
    {
      if (role !== 'Κηδεμόνας')
      {
        temp = '/HomePageBabysitter';
      }
      else 
      {
        temp = '/signup';
      }
    }
    else
    {
      temp = '/login';
    }

    return (    
        <Link to={temp} className="text-decoration-none persona-link">
        <Card className="mb-3 persona-card shadow-sm">
          <div className="persona-image-container">
            <Card.Img
              variant="top"
              src={nanny}
              alt="HomePageBabysitter"
              className="persona-image"
            />
          </div>
          <Card.Body className="text-center">
            <Card.Title className="persona-title">Νταντά</Card.Title>
            <Card.Text className="persona-description">
              Συμπληρώστε,εύκολα, τα στοιχεία σας και ανεβάστε την πρώτη σας αγγελία. 
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
   
} 

export default PersonaNan;

 