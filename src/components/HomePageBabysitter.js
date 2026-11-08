import React, { useState, useContext, useEffect } from "react"; 

import { useNavigate } from 'react-router-dom';

import { Breadcrumb } from 'react-bootstrap';
import {  Link } from 'react-router-dom';

import { Box, Rating } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import './HomePageBabysitter.css';

import { AuthContext } from '../context/AuthContext';

import { getFirestore, getDoc, doc } from "firebase/firestore";

const HomePageBabysitter = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [ratings, setRatings] = useState([]);

    const [averageRating, setAverageRating] = useState(0);

    const [starCounts, setStarCounts] = useState({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    });

    // https://stackoverflow.com/questions/54363595/extract-day-month-year-from-a-yyyy-dd-mm-string-in-javascript
    // https://dev.to/lavary/convert-a-ddmmyyyy-string-to-a-date-object-in-javascript-35o3
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day); // Months are zero-indexed
    };

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch('/data/ratings.json');
                if (response.ok) {
                    const data = await response.json();
                    const sortedRatings = data.user_rating.sort((a, b) => {
                        return parseDate(b.date) - parseDate(a.date);
                    });
                    setRatings(sortedRatings);
                    let sum = 0;
                    const starDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                    data.user_rating.forEach(rate => {
                        sum = sum + rate.rating;
                        starDistribution[rate.rating] = starDistribution[rate.rating] + 1;
                    })
                    const avg = sum / data.user_rating.length;
                    setAverageRating(avg);
                    // console.log(avg, sum);
                    setStarCounts(starDistribution);
                } else {
                console.error('Failed to fetch areas');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRatings();  
        
    }, []); 

    const [userdata, setUserData] = useState(null);
    const [userdataresume, setUserDataResume] = useState(null);

    const firestore = getFirestore();

    useEffect(() => {
        if (user) {
            const userRef = doc(firestore, 'users', user.uid);
            getDoc(userRef)
              .then((docSnap) => {
                if (docSnap.exists()) {
                  
                  getdataFinalizedAd(user.uid).then((data) => {
                    if (data) {
                      setUserData(data);
                    } else {
                      console.log('No data found or error occurred.');
                    }
                  });

                  getdataFinalizedResume(user.uid).then((data) => {
                    if (data) {
                      setUserDataResume(data);
                    } else {
                      console.log('No data found or error occurred.');
                    }
                  });
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
  
      }, []);
    
    async function getdataFinalizedAd(userid) 
    {
        if (userid === null) 
        {
          return null;
        }
      
        const db = getFirestore();
      
        try {
            var docRef = doc(db, 'job_applications', userid + ":mode:submit");
            var docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                var data = docSnap.data();
                console.log(data);
                return data;
            }
            else
            {
              return null;
            }
        } catch (error) {
          console.error('Error retrieving data:', error);
          return null;
        }
    }

    async function getdataFinalizedResume(userid) 
    {
        if (userid === null) 
        {
            return null;
        }
    
        const db = getFirestore();
    
        try {
            var docRef = doc(db, 'resumes', userid + ":mode:submit");
            var docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                var data = docSnap.data();
                console.log(data);
                return data;
            }
            else
            {
                return null;
            }
        } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
        }
    }

    if (!user) return null;

    return (
        <div className="HomePageBabysitter HomePageBabysitter-body" style={{ fontFamily: 'sans-serif' }}>

            {/* Breadcrumb Section */}
            <Breadcrumb style={{ paddingLeft: '1.25rem', marginTop: '10px' }}>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter' }}>Αρχική Νταντάς</Breadcrumb.Item>
            </Breadcrumb>
            
            <div>
                
                {/* Main Container */}
                <main className="HomePageBabysitter-container">
                    {/* Left Section */}
                    <section className="HomePageBabysitter-left-section">
                        <h2 id="welcome-message">Καλωσόρισες <b>{user.email}</b></h2>
                        <div className="HomePageBabysitter-section-box">
                            <h3 >Θέλω να δημιουργήσω/τροποποιήσω καινούργιο/α ....</h3>
                            <div className="HomePageBabysitter-button-container">
                                <button 
                                    className="HomePageBabysitter-icon-button"
                                    onClick={() => navigate('/HomePageBabysitter/ResumeCreation')}
                                >
                                    <img src="/content/icons/resume_icon.png" alt="Resume Icon" className="HomePageBabysitter-icon" />
                                    <span className="HomePageBabysitter-button-text">Βιογραφικό</span>
                                </button>
                                <button 
                                    className="HomePageBabysitter-icon-button" 
                                    onClick={() => navigate('/HomePageBabysitter/AdCreation')}
                                >
                                    <img src="/content/icons/ad_icon.png" alt="Ad Icon" className="HomePageBabysitter-icon"/>
                                    <span className="HomePageBabysitter-button-text">Αγγελία</span>
                                </button>
                            </div>
                        </div>
                
                        <div className="HomePageBabysitter-section-box">
                            <h3>Θέλω να δώ το/την ....</h3>
                            <div className="HomePageBabysitter-button-container">
                                <button 
                                    className="HomePageBabysitter-icon-button"
                                    onClick={() => {
                                        if (userdataresume != null) // This checks for both null and undefined
                                        {
                                            navigate('/HomePageBabysitter/ShowFinalizedResume');
                                        } 
                                        else 
                                        {
                                            navigate('/HomePageBabysitter/ResumeCreation');
                                        }
                                    }}
                                >
                                    <img src="/content/icons/resume_icon.png" alt="Resume Icon" className="HomePageBabysitter-icon"/>
                                    <span className="HomePageBabysitter-button-text">Βιογραφικό</span>
                                </button>
                                <button 
                                    className="HomePageBabysitter-icon-button"
                                    onClick={() => {
                                        if (userdata != null) // This checks for both null and undefined
                                        {
                                            navigate('/HomePageBabysitter/ShowFinalizedAd');
                                        } 
                                        else 
                                        {
                                            navigate('/HomePageBabysitter/AdCreation');
                                        }
                                    }}   
                                >
                                    <img src="/content/icons/ad_icon.png" alt="Ad Icon" className="HomePageBabysitter-icon"/>
                                    <span className="HomePageBabysitter-button-text">Αγγελία</span>
                                </button>
                                
                                <button className="HomePageBabysitter-icon-button">
                                    <img src="/content/icons/deal_icon.png" alt="Deal Icon" className="HomePageBabysitter-icon"/>
                                    <span className="HomePageBabysitter-button-text">Συμφωνικό</span>
                                </button>
                            </div>
                        </div>
                    
                        <div className="HomePageBabysitter-section-box">
                            <h3>Προβολή Ιστορικού ....</h3>
                            <div className="HomePageBabysitter-button-container">
                                <button className="HomePageBabysitter-icon-button">
                                    <img src="/content/icons/payings_icon.png" alt="Payings History Icon" className="HomePageBabysitter-icon"/>
                                    <span className="HomePageBabysitter-button-text">Πληρωμών</span>
                                </button>
                                <button className="HomePageBabysitter-icon-button">
                                    <img src="/content/icons/deals_history_icon.png" alt="Deals History Icon" className="HomePageBabysitter-icon"/>
                                    <span className="HomePageBabysitter-button-text">Συμφωνικών</span>
                                </button>
                                <button className="HomePageBabysitter-icon-button">
                                    <img src="/content/icons/jobs_history_icons.png" alt="Jobs History Icon" className="HomePageBabysitter-icon"/>
                                    <span className="HomePageBabysitter-button-text">Αιτήσεων</span>
                                </button>
                            </div>
                        </div>
                    </section>
            
                    {/* Right Section */}
                    <section className="HomePageBabysitter-right-section">
                        {/* <div className="HomePageBabysitter-calendar-box">
                            <h3>Ημερολόγιο</h3>
                        </div> */}
                
                        <div className="HomePageBabysitter-ratings-box">
                            {/* Average Rating Section */}
                            <Box sx={{ 
                                display: "flex", 
                                flexDirection: 'column', 
                                // marginBottom: "2rem",
                                alignItems: "center",
                            }}>
                                <h2 style={{ fontSize: '1.7rem', marginBottom: '2rem' }}>
                                    Αξιολογήσεις 
                                </h2>
                                <h2 style={{ }}>
                                    {averageRating.toFixed(1)}
                                </h2>
                                <Rating value={parseFloat(averageRating)} precision={0.1} readOnly sx={{ fontSize: "2rem" }}/>
                                <p style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
                                    {ratings.length} Κριτικές
                                </p>

                                <a
                                    href="/HomePageBabysitter/RatingsSection"
                                    className="ResumeCreation-button-customization"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/HomePageBabysitter/RatingsSection');
                                    }}
                                    >
                                    Προβολή Κριτικών ....
                                </a>
                            </Box>
                        </div>
                    </section>
                </main>
            </div>
        
            {/* Additional Boxes */}
            <section className="below-section">
                <h4>Εξήγηση Βασικών Εργαλείων</h4>
                <section className="extra-section">
                    <div className="extra-box" style={{ lineHeight: '1.6' }}>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                            <li>Τα μηνύματα ενδιαφέροντος</li>
                            <li>Οι αιτήσεις συνεργασίας</li>
                            <li>Οι μηνιαίες πληρωμές μέσω κωδικών voucher</li>
                            <li>Τα συμφωνητικά που θα σας στέλνουν για να υπογράφετε</li>
                        </ul>
                        <p>
                            Θα μπορείτε να τα δείτε όλα αυτά όταν πατήσετε το:
                        </p>
                        <p>
                            <span style={{ fontSize: '24px' }}><AccountCircleIcon /></span> (προφίλ εικονίδιο βρίσκεται πάνω δεξιά)
                        </p>
                        <p>
                            και στην συνέχεια πατήσετε «Μηνύματα».
                        </p>
                    </div>
                    {/* <div className="extra-box">
                        <h5>Στο κομμάτι Ημερολόγιο</h5>
                        <p>Στις ημέρες με μπλε κουκίδες αντιστοιχούν προγραμματισμένα ραντεβού με τις κηδεμόνες.</p>
                        <p>Μπορείτε να τα τροποποιήσετε ή και να προγραμματίσετε νέα.</p>
                    </div> */}
                </section>
            </section>
        </div>
    );
}

export default HomePageBabysitter;