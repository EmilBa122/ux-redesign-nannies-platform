import React, { useState,  useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ResumeCreation.css';

import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';

import './AdCreation.css';

import { AuthContext } from '../context/AuthContext';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ShowFinalizedResume = () => {

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

    const [degrees, setDegrees] = useState([]);

    const [workexperience, setWorkExperience] = useState('');

    const [skills, setSkills] = useState([]);

    const [typeexperience, setTypeExperience] = useState([]);

    const [gender, setGender] = useState('');

    const [selectedFiles, setSelectedFiles] = useState([]);

    // The below function retrieves data from a document from the resumes collection for a given userid
    async function getdata(userid) 
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
            // console.log('show finalized data: ', data);
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
            setFullName(data_json_temp.full_name || '');
            setAge(data_json_temp.age || '');
            setWorkExperience(data_json_temp.work_experience || 0);
            setSkills(data_json_temp.skills || []);
            setTypeExperience(data_json_temp.type_experience || []);
            setDegrees(data_json_temp.degrees || []);
            setGender(data_json_temp.gender || '');
            setSelectedFiles(data_json_temp.selectedFiles || []);
        }
    }, [userdata]); 

    if (!user) return null;

    return (

        <div className="AdCreation AdCreation-body" style={{ fontFamily: 'sans-serif' }}>
            
            {/* Breadcrumb Section */}
            <Breadcrumb style={{ paddingLeft: '1.25rem', marginTop: '10px' }}>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter' }}>Αρχική Νταντάς</Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter/ShowFinalizedResume' }}>Προβολή Βιογραφικού</Breadcrumb.Item>
            </Breadcrumb>

            <h1 id="title1-Resume">Προεπισκόπηση Βιογραφικού</h1> 


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
                  <div className="AdCreation-form-group">
                    <label htmlFor="age">Φύλο</label>
                    <span>{gender}</span>
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

                {/* Section: Συστάσεις */}
                <section className="ResumeCreation-section-of-forum">
                  <div className="ResumeCreation-section-header">
                    <img 
                      src="/content/icons/recommendations_icon.png" 
                      alt="Work Experience Icon" 
                      className="ResumeCreation-section-icon" 
                      style={{ width: "2.75rem", height: "3rem" }}
                    />
                    <h2>Συστάσεις</h2>
                  </div>

                  <div className="ResumeCreation-form-group">
                        {selectedFiles.map((element, index) => (
                          <Chip
                              key={index}
                              label={element.name} 
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


              <section className="ResumeCreation-button-customization_finalized_forum">
                  <a
                    href="/HomePageBabysitter"
                    className="ResumeCreation-button-customization"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/HomePageBabysitter');
                  }}
                  >
                    Επιστροφή
                  </a>

              </section>

            </main>
            
        </div>   
        
    );
}

export default ShowFinalizedResume;