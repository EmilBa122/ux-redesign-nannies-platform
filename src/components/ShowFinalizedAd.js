import React, { useState, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';

import './AdCreation.css';

import AvailabilitySection from'./AvailabilitySection.js';

import { AuthContext } from '../context/AuthContext';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const daysOfWeek = [
  "Δευτέρα",
  "Τρίτη",
  "Τετάρτη",
  "Πέμπτη",
  "Παρασκευή",
  "Σάββατο",
  "Κυριακή",
];

const hoursOfDay = [
  "6 - 9 πμ", 
  "9 - 12 πμ", 
  "12 - 3 μμ", 
  "3 - 6 μμ", 
  "6 - 9 μμ",
];

const ShowFinalizedAd = () => {

    const [uid, setUid] = useState(null); 
    const [userdata, setUserData] = useState(null);

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
                // if the document exists I call the function getdata() to retrieve the data from this document
                getdata(user.uid).then((data) => {
                  if (data) {
                    setUserData(data);
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
      });

      return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);

    const { user } = useContext(AuthContext);

    const [fullname, setFullName] = useState('');

    const [age, setAge] = useState('');

    const [phonenumber, setPhoneNumber] = useState('');

    const [charge, serCharge] = useState('');

    const [email, setEmail] = useState('');

    const [employmenttype, setEmploymentType] = useState('');

    const [schedule, setSchedule] = useState(() => {
      const schedule = new Array(hoursOfDay.length); 
      for (let i = 0; i < hoursOfDay.length; i++) 
      {
        schedule[i] = new Array(daysOfWeek.length);
        for (let j = 0; j < daysOfWeek.length; j++) 
        {
          schedule[i][j] = false; 
        }
      }
      return schedule;
    });

    const [hosting, setHosting] = useState('');

    const [description, setDescription] = useState('');

    const [degrees, setDegrees] = useState([]);

    const [workexperience, setWorkExperience] = useState('');

    const [serviceareas, setServiceAreas] = useState([]);

    const [skills, setSkills] = useState([]);

    const [typeexperience, setTypeExperience] = useState([]);

    // The below function retrieves data from a document from the job_applications collection for a given userid 
    async function getdata(userid) 
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
            if (data.schedule) {
              var scheduleArray = [];
              for (var key of Object.keys(data.schedule).sort()) {
                scheduleArray.push(data.schedule[key]);
              }
              data.schedule = scheduleArray;
            }
            console.log('show finalized data: ', data);
           return data;

          }
          else
          {
            // navigate('/HomePageBabysitter/AdCreation');
          }
      } catch (error) {
        // navigate('/HomePageBabysitter/AdCreation');
      }
    }

    const handleSubmit = (e) => {
        var data = userdata;
        if (data !== null && data.mode === 'submit')
        {
          console.warn("You can not submit a finalized document");
          return;
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        const data_json_temp = userdata;
   
        if (data_json_temp) 
        {
            // console.log(data_json_temp);
            setFullName(data_json_temp.full_name || '');
            setAge(data_json_temp.age || '');
            setPhoneNumber(data_json_temp.phone_number || '');
            setEmail(data_json_temp.email || '');
            serCharge(data_json_temp.charge || '');
            setHosting(data_json_temp.hosting || '');
            setDescription(data_json_temp.description || '');
            setEmploymentType(data_json_temp.employment_type || '');
            setWorkExperience(data_json_temp.work_experience || 0);
            setSkills(data_json_temp.skills || []);
            setTypeExperience(data_json_temp.type_experience || []);
            setServiceAreas(data_json_temp.service_areas || []);
            setDegrees(data_json_temp.degrees|| []);
        }
    }, [userdata]); 

    useEffect(() => {
      const data_json_temp = userdata;
      if (data_json_temp === null)
      {
        return;
      }
      if (employmenttype === "Μερική" || employmenttype === "Περιστασιακή") 
      {
        if (data_json_temp && data_json_temp.schedule) 
        {
          setSchedule(data_json_temp.schedule);
        }
      }
    }, [employmenttype]);

    if (!user) return null;

    const handleButtonClick = () => {
      navigate('/HomePageBabysitter');
    };

    return (

        <div className="AdCreation AdCreation-body" style={{ fontFamily: 'sans-serif' }}>
        
            {/* Breadcrumb Section */}
            <Breadcrumb style={{ paddingLeft: '1.25rem', marginTop: '10px' }}>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter' }}>Αρχική Νταντάς</Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter/ShowFinalizedAd' }}>Προβολή Αγγελίας</Breadcrumb.Item>
            </Breadcrumb>
            
            
            <section id="go-back-button-container">
                <button 
                  className="AdCreation-icon-button"
                  onClick={handleButtonClick}
                >
                    <img src="/content/icons/go_back_icon.png" alt="Go Back Icon" className="AdCreation-icon"/>
                    <span className="AdCreation-button-text">Επιστροφή Αρχικό Μενού Babysiiter</span>
                </button>
            </section>

        
            <h1 id="title1">Προεπισκόπηση Αγγελίας</h1> 


            <main className="AdCreation-form-container">

                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img
                      src="/content/icons/personal_info_icon.png"
                      alt="Personal Info Icon"
                      className="AdCreation-section-icon"
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <h2>Προσωπικά Στοιχεία</h2>
                  </div>
                  <div className="AdCreation-form-group">
                    <label htmlFor="FullName">Ονοματεπώνυμο</label>
                    <span>{fullname}</span>
                  </div>
                  <div className="AdCreation-form-group">
                    <label htmlFor="age">Ηλικία</label>
                    <span>{age + " χρονών"}</span>
                  </div>
                </section>


                {/* Section: Στοιχεία Επικοινωνίας */}
                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img 
                      src="/content/icons/contact_icon.png" 
                      alt="Contact Icon" 
                      className="AdCreation-section-icon"
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <h2>Στοιχεία Επικοινωνίας</h2>
                  </div>
                  <div className="AdCreation-form-group">
                    <label htmlFor="phone">Τηλέφωνο Επικοινωνίας</label>
                    <span>{phonenumber}</span>
                  </div>
                  <div className="AdCreation-form-group">
                    <label htmlFor="email">Email</label>
                    <span>{email}</span>
                  </div>
                </section>


                {/* Section: Πτυχία/Δεξιότητες */}
                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img 
                      src="/content/icons/degrees_skills.png" 
                      alt="Degrees Skills Icon" 
                      className="AdCreation-section-icon" 
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <h2>Πτυχία/Δεξιότητες</h2>
                  </div>
                  <div className="AdCreation-form-group">
                    {degrees.length > 0 && (
                        <label htmlFor="degrees">Πτυχία</label>
                    )}
                    {degrees.map((element, index) => (
                        <Chip
                            key={index}
                            label={element}
                            sx={{
                            textAlign: "left",
                            padding: "8px 16px", 
                            fontSize: "1rem", 
                            marginRight: "0.5rem", 
                            marginBottom: "1rem", 
                            }}
                        />
                    ))}
                  </div>

                  <div className="AdCreation-form-group">
                    {(skills.length > 0) && (
                      <label htmlFor="skills">Δεξιότητες</label>
                    )}
                    {skills.map((element, index) => (
                        <Chip
                            key={index}
                            label={element}
                            sx={{
                            textAlign: "left",
                            padding: "8px 16px", 
                            fontSize: "1rem", 
                            marginRight: "0.5rem", 
                            marginBottom: "1rem", 
                            }}
                            />
                    ))}
                  </div>
                </section>


                {/* Section: Προϋπηρεσία */}
                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img 
                      src="/content/icons/work_experience.png" 
                      alt="Work Experience Icon" 
                      className="AdCreation-section-icon" 
                      style={{ width: "2.75rem", height: "2.75rem" }}
                    />
                    <h2>Προϋπηρεσία</h2>
                  </div>

                  
                  <div className="AdCreation-form-group">
                        <label htmlFor="Work_Experience" style={{ marginBottom: '5px' }}>
                          Χρόνια εμπειρίας ως Νταντά:
                        </label>
                        <span>{workexperience + " Έτη"}</span>
                  </div>

                  {(workexperience > 0) ? (
                    <div className="AdCreation-form-group">
                        <label htmlFor="Where_Work_Experience" style={{ marginTop: '60px' }}>
                          Έχω εργαστεί ως Νταντά σε:
                        </label>
                        {typeexperience.map((element, index) => (
                        <Chip
                            key={index}
                            label={element}
                            sx={{
                            textAlign: "left",
                            padding: "8px 16px", 
                            fontSize: "1rem", 
                            marginRight: "0.5rem", 
                            marginBottom: "1rem", 
                            }}
                            />
                        ))}
                    </div>
                  ) : (
                    null
                  )}
                </section>
              

                {/* Section: Περιγραφή */}
                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img 
                      src="/content/icons/description_icon.png" 
                      alt="Description Icon" 
                      className="AdCreation-section-icon" 
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <h2>Περιγραφή</h2>
                  </div>
                    <div className="AdCreation-form-group">
                       <span>{description}</span>
                    </div>
                </section>


                {/* Section: Χρέωση Υπηρεσιών */}
                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img 
                      src="/content/icons/charge.png" 
                      alt="Charge Icon" 
                      className="AdCreation-section-icon" 
                      style={{ width: "3rem", height: "3rem" }}
                    />
                    <h2>Χρέωση Υπηρεσιών</h2>
                  </div>
                  <div className="AdCreation-form-group">
                    <label htmlFor="charge">Τιμή/Ώρα</label>
                    <span>{charge + "€"}</span>
                  </div>
                </section>


                {/* Section: Διαθεσιμότητα */}
                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img 
                      src="/content/icons/availability.png" 
                      alt="Availability Icon" 
                      className="AdCreation-section-icon" 
                      style={{ width: "2.7rem", height: "2.5rem" }}
                    />
                    <h2>Διαθεσιμότητα</h2>
                  </div>
                  <AvailabilitySection
                    employmenttype={employmenttype}
                    setEmploymentType={setEmploymentType}
                    schedule={schedule}
                    setSchedule={setSchedule}
                    daysOfWeek={daysOfWeek} 
                    hoursOfDay={hoursOfDay}
                    mode={userdata !== null ? userdata.mode : null}
                  />
                </section>


                {/* Section: Περιοχές Εξυπηρέτησης */}
                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img 
                      src="/content/icons/service_areas.png" 
                      alt="Service Areas Icon" 
                      className="AdCreation-section-icon" 
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <h2>Περιοχές Εξυπηρέτησης</h2>
                  </div>
                 
                  <div className="AdCreation-form-group">   
                    {serviceareas.map((element, index) => (
                        <Chip
                        key={index}
                        label={element}
                        sx={{
                            textAlign: "left",
                            padding: "8px 16px", 
                            fontSize: "1rem", 
                            marginRight: "0.5rem", 
                            marginBottom: "1rem", 
                        }}
                        />
                    ))}    
                  </div>
                </section>
                  

                {/* Section: Επιπλέον Πληροφορίες< */}
                <section className="AdCreation-section-of-forum">
                  <div className="AdCreation-section-header">
                    <img 
                      src="/content/icons/additional_infos_icon.png" 
                      alt="Additional Infos Icon" 
                      className="AdCreation-section-icon" 
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <h2>Επιπλέον Πληροφορίες</h2>
                  </div>
                  <div className="AdCreation-form-group">
                    <label htmlFor="hosting">Δυνατότητα φιλοξενείας παιδίου στο σπίτι μου:</label>            
                    <span>{hosting === "true" ? 'Ναι' : 'Όχι'}</span>
                  </div>          
                </section>
            </main>
            
        </div>   
        
    );
}

export default ShowFinalizedAd;