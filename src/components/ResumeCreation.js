import React, { useState, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Απόφοιτος τμήματος παιδαγωγικών ΕΚΠΑ
// Απόφοιτος τμήματος παιδαγωγικών Εθνικο και Καποδιστριακο Πανεπηστιμιο Αθηνων

import { Typography, Slider, Box, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import './ResumeCreation.css';

import AddingElementsSection from'./AddingElementsSection.js';
import SelectDropDownOptions from'./SelectDropDownOptions.js';
import RecommendationsSection from './RecommendationsSection.js';

import { AuthContext } from '../context/AuthContext';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";

const marks = [
  { value: 0, label: <Typography variant="body2">Έτη<br />εμπειρίας</Typography> },
  { value: 1, label: '< 1 Έτη' },
  { value: 2, label: '2 Έτη' },
  { value: 3, label: '3 Έτη' },
  { value: 4, label: '4 Έτη' },
  { value: 5, label: '5 Έτη' },
  { value: 6, label: '6 Έτη' },
  { value: 7, label: '7 Έτη' },
  { value: 8, label: '8 Έτη' },
  { value: 9, label: '9 Έτη' },
  { value: 10, label: '10 + Έτη' },
];

function valuetext(value) {
  return value === 10 ? '10+' : `${value}`;
}

const ResumeCreation = () => {

    const handleDisabled = () => {

      var button = document.getElementById('submit_button');
      if (button === null)
      {
        return;
      }
      let enabled = ((fullname !== '') && (/^[a-zA-Z\u0370-\u03FF\s]+$/.test(fullname)) && (fullname.length >= 3) && 
        (age !== '') && (age >= 18 && age <= 60) && 
        (degrees.length > 0) && (gender !== '') && (workexperience === 0 || (workexperience > 0 && typeexperience.length > 0)));
      
        // console.log('Enabled:', enabled);
      
      if (enabled)
      {
        button.disabled = false;
        button.classList.remove("disabled");
      }
      else
      {
        button.disabled = true;
        button.classList.add("disabled");
      }

      setButtonDisabled(!enabled);
    };

    const [uid, setUid] = useState(null); 

    const auth = getAuth();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        } else {
          console.log("No user is signed in.");
        }
      });

      return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);
    // console.log("uid: ", uid);

    useEffect(() => {
      if (uid) 
      { 
        handleDisabled(); 
      }
    }, [uid]);

    const { user } = useContext(AuthContext);

    const [fullname, setFullName] = useState('');

    const [age, setAge] = useState('');

    const [degrees, setDegrees] = useState([]);

    const [workexperience, setWorkExperience] = useState(0);

    const [skills, setSkills] = useState([]);

    const [typeexperience, setTypeExperience] = useState([]);

    const [gender, setGender] = useState('');

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [showTooltip, setShowTooltip] = useState(false);

    async function setdata(data, userid) 
    {
      
      if (userid === null) 
      {
        return;
      }
    
      const db = getFirestore();
      let parsedData = JSON.parse(data);
      
      var key = userid + ":mode:" + parsedData.mode;

      if (parsedData.mode === "submit")
      {
        const userCollectionRef = collection(db, "resumes");
        const q = query(userCollectionRef, where("__name__", ">=", userid), where("__name__", "<", userid + "\uf8ff"));

        const querySnapshot = await getDocs(q);

        const pr= [];
        querySnapshot.forEach((doc) => {
          pr.push(deleteDoc(doc.ref));
        });
        await Promise.all( pr  );
      }
    
      setDoc(doc(db, 'resumes', key), parsedData)
        .then(() => { })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    }

    useEffect(() => {
      // console.log("document loaded");
      const form = window.document.getElementsByTagName('main')[0];
      // console.log("form: ", form);
      
      const validators = {
        full_name: [
          (value) => value.trim().length >= 5 || "Έχετε συμπληρώσει λίγους χαρακτήρες",
          (value) => /^[a-zA-Z\u0370-\u03FF\s]+$/.test(value) || "Συμπληρώστε μόνο χαρακτήρες",
        ],
        age: [
          (value) => (value >= 18 && value <= 60) || "Θα πρέπει να είστε από 18 μέχρι 60",
        ]
      };
    
      form.addEventListener('input', (e) => {
        const field = e.target;
        console.log("element to change: ", field);
        const errorSpan = document.getElementById(`${field.id}_error`);
    
        if (validators[field.id]) {
          const errors = validators[field.id]
            .map((validator) => validator(field.value))
            .filter((result) => result !== true);
      
          if (errors.length > 0) {
            errorSpan.textContent = errors[0];
            field.classList.add("invalid");
          } else {
            errorSpan.textContent = "";
            field.classList.remove("invalid");
          }
        }
      });
    }, []); 
    
    const handleSubmit = (e) => {
      var sbmButton = e.target;
      if (!sbmButton.matches('button')) 
      {
          sbmButton = e.target.closest('button');
      }
      
      const formData = {};
      formData['full_name'] =  fullname;
      formData['age'] = age;
      formData['work_experience'] = workexperience;
      formData['skills'] = skills;
      formData['type_experience'] = typeexperience;
      console.log("mesa handlersubmit: ", fullname);
      formData['gender'] = gender;
      formData['degrees'] = degrees;
      // Process selectedFiles to store their metadata (name and type)
      const selectedFilesMetadata = selectedFiles.map(file => ({
        name: file.name,  // Store file name
        type: file.type,  // Store file type (optional)
      }));
      console.log("Selected Files Metadata:", selectedFilesMetadata);
      formData['selectedFiles'] = selectedFilesMetadata;
      formData['mode'] = sbmButton.dataset.mode;
  
      setdata(JSON.stringify(formData), uid);

      window.scrollTo(0, 0);

      const handleScroll = () => {
        if (window.scrollY === 0) 
        {
          window.removeEventListener('scroll', handleScroll);
          if (sbmButton.dataset.mode === 'submit')
          {
            navigate('/HomePageBabysitter/ShowFinalizedResume');
          }
          
        }
      };
      window.addEventListener('scroll', handleScroll);

    };

    const navigate = useNavigate();

    const data_json = 5;

    const handleBackButton = async () => {     
        try {
            navigate('/HomePageBabysitter');
        } catch (error) {
            console.error('Error while handling back button:', error);
           
        }
    };

    useEffect(() => {
      handleDisabled();
    }, [fullname, age, typeexperience, workexperience, degrees, gender]);

    
    if (!user) return null;
    // console.log(user);

    return (

        <div className="ResumeCreation ResumeCreation-body" style={{ fontFamily: 'sans-serif' }}>
            
            {/* Breadcrumb Section */}
            <Breadcrumb style={{ paddingLeft: '1.25rem', marginTop: '10px' }}>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter' }}>Αρχική Νταντάς</Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter/ResumeCreation' }}>Δημιουργία Βιογραφικού</Breadcrumb.Item>
            </Breadcrumb>

            {data_json && data_json.mode === 'submit' && (
              <h1 id="title2-Resume">Προεπισκόπηση Βιογραφικού</h1> 
            )}

            
              <h1 id="title1-Resume">Δημιουργία Βιογραφικού</h1> 
          

            {/* <h1 id="title">Δημιουργία Βιογραφικού</h1> */}

            {data_json && data_json.mode === 'submit' ? (
              <section
                style={{
                  marginBottom: '1rem',
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '20px',
                  }}
              >
                <img 
                  src="/content/icons/checked_icon.png" 
                  alt="Save Icon" 
                  className="AdCreation-icon"
                  style={{ width: "4.2rem", height: "4.2rem" }}
                />
                <span
                  style={{
                    backgroundColor: '#76BF5E', 
                    padding: '10px',
                    height: '3rem',
                    borderRadius: '5px',
                    margin: '1rem 0',
                    color: '#000',
                    fontWeight: 'bold',
                    border: '2px solid #000',
                    flex: 1,
                    }}
                  >
                    Το παρών Βιογραφικό έχει οριστικοποιηθεί.
                </span>
              </section>
            ) : null }

            <main className="ResumeCreation-form-container">

                {/* Section: Προσωπικά Στοιχεία */}
                <section className="ResumeCreation-section-of-forum">
                  <div className="ResumeCreation-section-header">
                    <img
                      src="/content/icons/personal_info_icon.png"
                      alt="Personal Info Icon"
                      className="ResumeCreation-section-icon"
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <h2>Προσωπικά Στοιχεία</h2>
                  </div>
                  <div className="ResumeCreation-form-group">
                    <label htmlFor="FullName">Ονοματεπώνυμο*</label>
                    {data_json && data_json.mode === 'submit' ? (   
                       <span>{fullname}</span>
                    ) : (
                      <TextField
                        id="full_name"
                        variant="outlined"
                        fullWidth
                        name="FullName"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                        inputProps={{
                          maxLength: 50,
                        }}
                        style={{ width: '18rem' }}
                        placeholder="Επώνυμο Όνομα"
                        required
                      />
                    )}
                    <span class="error-message" id="full_name_error"></span>
                  </div>
                  <div className="ResumeCreation-form-group">
                    <label htmlFor="age">
                      Ηλικία*<br />
                      <span style={{ fontWeight: 'normal', fontFamily: 'Arial, sans-serif' }}>Θα πρέπει να είστε άνω των 18</span>
                    </label>
                    {data_json && data_json.mode === 'submit' ? (
                       <span>{age}</span>
                    ) : (
                      <TextField
                        id="age"
                        variant="outlined"
                        fullWidth
                        name="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value === '' ? null : Number(e.target.value))}
                        inputProps={{
                          id: "age",
                          min: 18,
                          max: 60,
                          step: 1,
                        }}
                        style={{ width: '18rem' }}
                        placeholder="π.χ. 18"
                        required
                      />
                    )}
                    <span class="error-message" id="age_error"></span>
                  </div>
                  
                  <SelectDropDownOptions 
                    gender={gender}
                    setGender={setGender}
                    json_file_name={"/data/gender.json"}
                    label_text={"Φύλο*"}
                    label_id={"gender"}
                    mode={data_json !== null ? data_json.mode : null}
                    required
                  />
                </section>


                {/* Section: Πτυχία/Δεξιότητες */}
                <section className="ResumeCreation-section-of-forum">
                  <div className="ResumeCreation-section-header">
                    <img 
                      src="/content/icons/degrees_skills.png" 
                      alt="Degrees Skills Icon" 
                      className="ResumeCreation-section-icon" 
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <h2>Πτυχία/Δεξιότητες</h2>
                  </div>
                  <div className="ResumeCreation-form-group">
                      <label htmlFor="degrees">
                        Πτυχία*<br />
                        <span style={{ fontWeight: 'normal', fontFamily: 'Arial, sans-serif' }}>Τουλάχιστον θα πρέπει να δηλώσετε ότι έχετε απολυτήριο λυκείου</span>
                      </label>
                    {data_json && data_json.mode === 'submit' ? (
                       degrees.map((element, index) => (
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
                      ))
                    ) : (
                      <AddingElementsSection
                        elements={degrees}
                        setElements={setDegrees}
                        id="degree"
                      />
                    )}
                  </div>

                  <div className="ResumeCreation-form-group">
                    <label htmlFor="skills">Δεξιότητες</label>
                    {data_json && data_json.mode === 'submit' ? (
                       skills.map((element, index) => (
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
                      ))
                    ) : (
                      <AddingElementsSection
                        elements={skills}
                        setElements={setSkills}
                      />
                    )}
                  </div>
                </section>


                {/* Section: Προϋπηρεσία */}
                <section className="ResumeCreation-section-of-forum">
                  <div className="ResumeCreation-section-header">
                    <img 
                      src="/content/icons/work_experience.png" 
                      alt="Work Experience Icon" 
                      className="ResumeCreation-section-icon" 
                      style={{ width: "2.75rem", height: "2.75rem" }}
                    />
                    <h2>Προϋπηρεσία</h2>
                  </div>

                  
                  <div className="ResumeCreation-form-group">

                  {data_json && data_json.mode === 'submit' ? (
                      <div>
                        <label htmlFor="Work_Experience" style={{ marginBottom: '5px' }}>
                          Χρόνια εμπειρίας ως Νταντά:
                        </label>
                        <span>{workexperience + " Έτη"}</span>
                      </div>
                    ) : (
                      <div style={{ marginLeft: '30px', width: '700px' }}>
                          <label htmlFor="Work_Experience" style={{ marginBottom: '30px' }}>
                            Πόσα χρόνια εμπειρίας ως Νταντά έχετε ?
                          </label>
                          <div style={{ marginLeft: '30px', width: '700px' }}>
                            <Slider
                                id="Work_Experience"
                                value={workexperience}
                                onChange={(e, newValue) => setWorkExperience(newValue)}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-always"
                                step={1}
                                marks={marks}
                                valueLabelDisplay="on"
                                max={10}
                                valueLabelFormat={(value) => (value === 10 ? '10+' : value)}
                                sx={{
                                    '& .MuiSlider-thumb': {
                                        borderRadius: '1px',
                                    },
                                }}
                            />
                          </div>
                      </div>
                    )}
                  </div>


                  {(workexperience > 0) ? (

                    <div className="AdCreation-form-group">
                      {((data_json === null || data_json.mode !== 'submit') || (data_json.mode === 'submit' && (typeexperience.length > 0))) && (
                        <label htmlFor="Where_Work_Experience" style={{ marginTop: '60px' }}>
                          Πoυ έχετε εργαστεί ως Νταντά*
                        </label>
                      )}
                      
                      {data_json && data_json.mode === 'submit' ? (
                          typeexperience.map((element, index) => (
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
                          ))
                      ) : (
                        <AddingElementsSection
                          elements={typeexperience}
                          setElements={setTypeExperience}
                        />
                      )}
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

                    {data_json && data_json.mode === 'submit' ? (
                        selectedFiles.map((element, index) => (
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
                      ))
                      ) : (
                        <RecommendationsSection
                          elements={selectedFiles}
                          setElements={setSelectedFiles}
                        />
                      )}

                  </div>
              </section>

                
              <section className={data_json && data_json.mode === 'submit' 
                    ? "ResumeCreation-button-customization_finalized_forum" 
                    : "ResumeCreation-buttons-container"}>
                <a
                  href="/HomePageBabysitter"
                  className="ResumeCreation-button-customization"
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleBackButton(); 
                }}
                >
                  Επιστροφή
                </a>

              {data_json && data_json.mode === 'submit' ? (
                  null
              ) : (
            
                    <div className="tooltip-container"
                      onMouseEnter={() => setShowTooltip(true)} 
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <Button id='submit_button'
                          className="ResumeCreation-button-customization"
                          variant="contained"
                          sx={{
                              // #35c704
                              // #30B802
                              // #2FB003
                              backgroundColor: '#2FAE05',
                              textTransform: 'none',
                              boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.3)',
                              '&:hover': {
                                  // #30B802
                                  // #2EB003
                                  // #2CAA01
                                  backgroundColor: '#279302',
                                  // #268C04
                                  // #2CA403
                                  // #299C02
                                  // #289702
                              },
                          }}
                          onClick={handleSubmit}
                          data-mode="submit"
                
                      >
                          <span className="ResumeCreation-second-button">Οριστικοποίηση</span>
                      </Button>
                      {buttonDisabled && showTooltip && (
                            <div className="tooltip">
                                Πρέπει να συμπληρωθούν όλα τα πεδία με * 
                            </div>
                      )}
                    </div>
              
              )}
              
            </section>
          </main>
            
        </div>   
        
    );
}

export default ResumeCreation;