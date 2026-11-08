import React, { useState, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Typography, Slider, Box, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import './AdCreation.css';

import AddingElementsSection from'./AddingElementsSection.js';
import ServiceAreasSection from'./ServiceAreasSection.js';
import AvailabilitySection from'./AvailabilitySection.js'
import { ContentCutOutlined } from '@mui/icons-material';

import { AuthContext } from '../context/AuthContext';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";

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

function valuetext(value) {
  return value === 10 ? '10+' : `${value}`;
}

const AdCreation = () => {

    const handleDisabled = () => {

      var button = document.getElementById('submit_button');
      if (button === null)
      {
        return;
      }

      let enabled = ((fullname !== '') && (/^[a-zA-Z\u0370-\u03FF\s]+$/.test(fullname)) && (fullname.length >= 3) &&
        (age !== '') && (age >= 18 && age <= 60) &&
        (serviceareas.length > 0) && 
        (degrees.length > 0) && 
        (hosting !== '') &&
        (email !== '') && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) &&
        (charge !== '') && !isNaN(Number(charge)) && Number(charge) > 0 &&
        (phonenumber !== '') && (/^\d{1,10}$/.test(phonenumber))&&
        (workexperience === 0 || (workexperience > 0 && typeexperience.length > 0)) &&
        (employmenttype === 'Ολική' || (employmenttype === 'Μερική' && schedule.some(day => day.some(slot => slot === true)))));
      
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
    const [userdata, setUserData] = useState(null);

    const auth = getAuth();

    const firestore = getFirestore();

    useEffect(() => {
     
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) 
        {
          setUid(user.uid);
         
          const userRef = doc(firestore, 'users', user.uid);
          getDoc(userRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                // if the document exists I call the function getdata() to retrieve the data from this document
                getdata(user.uid).then((data) => {
                  if (data) 
                  {
                    setUserData(data);
                  } 
                  else 
                  {
                    handleDisabled(); 
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

      return () => unsubscribe();
    }, []);
    
    const { user } = useContext(AuthContext);
    
    const [fullname, setFullName] = useState('');

    const [age, setAge] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);

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

    const [workexperience, setWorkExperience] = useState(0);

    const [serviceareas, setServiceAreas] = useState([]);

    const [skills, setSkills] = useState([]);

    const [typeexperience, setTypeExperience] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [showTooltip, setShowTooltip] = useState(false);

    // The below function retrieves data from a document from the job_applications collection for a given userid 
    async function getdata(userid) 
    {
      
      if (userid === null) 
      {
        return null;
      }
      
      const db = getFirestore();
     
      var docRef = doc(db, 'job_applications', userid + ":mode:save");
    
      try {
       
        var docSnap = await getDoc(docRef);
       
        if (docSnap.exists()) {
          
          var data = docSnap.data();
    
          if (data.schedule) 
          {
            var scheduleArray = [];
            for (var key of Object.keys(data.schedule).sort()) 
            {
              scheduleArray.push(data.schedule[key]);
            }
            data.schedule = scheduleArray;
          }

          return data;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
      }
    }

    // The below function saves or updates data on a document in the firestore for the job_applications collection for a given userid
    async function setdata(data, userid) 
    {
      
      if (userid === null) 
      {
        return;
      }
      
      const db = getFirestore();
      let parsedData = JSON.parse(data);
      if (parsedData.schedule && Array.isArray(parsedData.schedule)) 
      {
        const transformedSchedule = {};
     
        parsedData.schedule.forEach((row, rowIndex) => {
          transformedSchedule[`row_${rowIndex}`] = row;
        });
        
        parsedData.schedule = transformedSchedule;
      }
      var key = userid + ":mode:" + parsedData.mode;

      // In case the user submits this ad, we need to find all the documents in the job_applications collection 
      // that start with the user.uid and are either in 'save' or 'submit' mode, and delete them. 
      // This way, we will only have the most recent finalized ad for the user, and if the user 
      // wants to create a new ad later he/she would not have the old ad that was in 'save' mode
      // to display before it was finalized
      if (parsedData.mode === "submit")
      {
        const userCollectionRef = collection(db, "job_applications");
        
        const q = query(userCollectionRef, where("__name__", ">=", userid), where("__name__", "<", userid + "\uf8ff"));
       
        const querySnapshot = await getDocs(q);

        const pr= [];
        
        querySnapshot.forEach((doc) => {
          pr.push(deleteDoc(doc.ref));
        });
        await Promise.all( pr  );
      }
      
      setDoc(doc(db, 'job_applications', key), parsedData)
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
        ],
        phone_number: [
          (value) => /^\d{1,10}$/.test(value) || "Ο αριθμός τηλεφώνου πρέπει να περιέχει μόνο ψηφία και να έχει μήκος έως 10 ψηφία",
        ],
        email: [
          (value) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email",
        ],
        charge: [
          (value) => value > 0 || "Πρέπει να είναι αριθμός",
        ],
      };
      
      form.addEventListener("input", (e) => {
        const field = e.target;
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
      if (userdata !== null && userdata.mode === 'submit')
      {
        console.warn("You can not submit a finalized document");
        return;
      }
      var sbmButton = e.target;
      if (!sbmButton.matches('button')) 
      {
          sbmButton = e.target.closest('button');
      }
     
      const formData = {};
      formData['full_name'] = fullname;
      formData['age'] = age;
      formData['ad_photo'] = selectedFile;
      formData['phone_number'] = phonenumber;
      formData['email'] = email;
      formData['charge'] = charge;
      formData['hosting'] = hosting;
      formData['description'] = description;
      formData['employment_type'] = employmenttype;
      formData['schedule'] = schedule;
      formData['work_experience'] = workexperience;
      formData['skills'] = skills;
      formData['type_experience'] = typeexperience;
      formData['degrees'] = degrees;
      formData['service_areas'] = serviceareas;
      formData['mode'] = sbmButton.dataset.mode;

      setdata(JSON.stringify(formData), uid);

      window.scrollTo(0, 0);

      const handleScroll = () => {
        if (window.scrollY === 0) 
        {
          window.removeEventListener('scroll', handleScroll);
          if (sbmButton.dataset.mode === 'save')
          {
            window.location.href = window.location.origin + window.location.pathname;
          }
          else
          {
            navigate('/HomePageBabysitter/ShowFinalizedAd');
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      
    };

    const navigate = useNavigate();
    
    const data_json = userdata;

    useEffect(() => {
      const data_json_temp = userdata;
      if (data_json_temp) 
      {
        setFullName(data_json_temp.full_name || '');
        setAge(data_json_temp.age || '');
        if (data_json_temp.ad_photo !== "null")
        {
          setSelectedFile(data_json_temp.ad_photo);
        }
        setPhoneNumber(data_json_temp.phone_number || '');
        setEmail(data_json_temp.email || '');
        serCharge(data_json_temp.charge || '');
        setHosting(data_json_temp.hosting || '');
        setDescription(data_json_temp.description || '');
        setEmploymentType(data_json_temp.employment_type || '');
        setWorkExperience(data_json_temp.work_experience || 0);
        setSkills(data_json_temp.skills || []);
        setTypeExperience(data_json_temp.type_experience || []);
        setServiceAreas(data_json_temp.service_areas|| []);
        setDegrees(data_json_temp.degrees || []);
      }
      
    }, [userdata]); 

    useEffect(() => {

      const data_json_temp = userdata;
      if (employmenttype === "Μερική" || employmenttype === "Περιστασιακή") 
      {
        if (data_json_temp && data_json_temp.schedule) 
        {
          setSchedule(data_json_temp.schedule);
        }
      }

      // Reset the schedule when employmenttype is "Ολική" or "Εσωτερική"
      if (employmenttype === "Ολική" || employmenttype === "Εσωτερική") 
      {
        const resetSchedule = new Array(hoursOfDay.length);
        for (let i = 0; i < hoursOfDay.length; i++) 
        {
          resetSchedule[i] = new Array(daysOfWeek.length);
          for (let j = 0; j < daysOfWeek.length; j++) 
          {
            resetSchedule[i][j] = false;
          }
        }
        setSchedule(resetSchedule);
      }
    }, [employmenttype]);

    useEffect(() => {
      handleDisabled();
    }, [fullname, age, typeexperience, serviceareas, workexperience, degrees, hosting, employmenttype, email, charge, phonenumber, schedule]);

    const handleButtonClick = async () => {
      try {
        navigate('/HomePageBabysitter');
      } catch (error) {
        console.error('Error handling button click:', error);
      }
    };

    if (!user) return null;

    return (

        <div className="AdCreation AdCreation-body" style={{ fontFamily: 'sans-serif' }}>
            
          {/* Breadcrumb Section */}
          <Breadcrumb style={{ paddingLeft: '1.25rem', marginTop: '10px' }}>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter' }}>Αρχική Νταντάς</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter/AdCreation' }}>Δημιουργία Αγγελίας</Breadcrumb.Item>
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

            {data_json && data_json.mode === 'save' && (
              <h1 id="title2">Επεξεργασία Αγγελίας</h1> 
            )}

            {data_json && data_json.mode === 'submit' && (
              <h1 id="title2">Προεπισκόπηση Αγγελίας</h1> 
            )}

            {data_json === null && (
              <h1 id="title1">Δημιουργία Καινούργιας Αγγελίας</h1> 
            )}

            {data_json && data_json.mode === 'save' ? (
              <section
                style={{
                  marginBottom: '1rem',
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '20px',
                  }}
              > 
                <img 
                  src="/content/icons/save_icon.png" 
                  alt="Save Icon" 
                  className="AdCreation-icon"
                  style={{ width: "4.2rem", height: "4.2rem" }}
                />
                <span
                  style={{
                    backgroundColor: '#F98817', 
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
                    Η παρούσα Αγγελία έχει αποθηκευτεί προσωρινά.
                </span>
              </section>
            ) : null }


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
                    Η παρούσα Αγγελία έχει οριστικοποιηθεί.
                </span>
              </section>
            ) : null }


            <main className="AdCreation-form-container">

                {/* Section: Προσωπικά Στοιχεία */}
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
                  <div className="AdCreation-form-group">
                    <label htmlFor="age">
                      Ηλικία*<br />
                      <span style={{ fontWeight: 'normal', fontFamily: 'Arial, sans-serif' }}>Θα πρέπει να είστε άνω των 18</span>
                    </label>
                    {data_json && data_json.mode === 'submit' ? (
                       <span>{age + " χρονών"}</span>
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
                    <label htmlFor="phone">Τηλέφωνο Επικοινωνίας*</label>
                    {data_json && data_json.mode === 'submit' ? (
                       <span>{phonenumber}</span>
                    ) : (
                      <TextField
                        id="phone_number"
                        variant="outlined"
                        fullWidth
                        name="phone_number"
                        type="tel"
                        value={phonenumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        inputProps={{
                          maxLength: 10,
                        }}
                        style={{ width: '18rem' }}
                        placeholder="6971234567"
                        required
                      />
                    )}
                    <span class="error-message" id="phone_number_error"></span>
                  </div>
                  <div className="AdCreation-form-group">
                    <label htmlFor="email">Email*</label>
                    {data_json && data_json.mode === 'submit' ? (
                       <span>{email}</span>
                    ) : (
                      <TextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        inputProps={{
                          id: "email",
                          maxLength: 30,
                        }}
                        style={{ width: '18rem' }}
                        placeholder="myemail@gmail.com"
                        required
                      />
                    )}
                    <span class="error-message" id="email_error"></span>
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
                        type={"degrees"}
                        id="degree"
                      />
                    )}
                    <span class="error-message" id="degree_error"></span>
                  </div>

                  <div className="AdCreation-form-group">
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
                    )}
                  </div>

                  {(workexperience > 0) ? (

                    <div className="AdCreation-form-group">
                      {((data_json === null || data_json.mode !== 'submit') || (data_json.mode === 'submit' && (typeexperience.length > 0))) && (
                        <div>
                        <label htmlFor="Where_Work_Experience" style={{ marginTop: '60px' }}>
                          Πoυ έχετε εργαστεί ως Νταντά*
                        </label>
                        </div>
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
                          type={"workexperience"}
                          id="work_experience"
                        />
                      )}
                      <span class="error-message" id="work_experience_error"></span>
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
                  {data_json && data_json.mode === 'submit' ? (
                    <div className="AdCreation-form-group">
                       <span>{description}</span>
                      </div>
                  ) : (

                    <div className="AdCreation-form-group">
                      <TextField
                        variant="outlined"
                        multiline
                        rows={7}
                        fullWidth
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={
                          "Εδώ μπορείτε να προσθέσετε μια περιγραφή που θα φαίνεται στην αίτηση σας.\n" + 
                          "Η περιγραφή στην αίτηση δεν είναι υποχρεωτική."
                        }
                        inputProps={{
                          maxLength: 500,
                        }}
                        sx={{ width: '44rem' }}
                      />
                      <Typography variant="body2" color="textSecondary" align="right" id="AdCreation-character-count">
                        {`${description.length}/${500}`}
                      </Typography>          
                    </div>     
                  )}
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
                    <label htmlFor="charge">Τιμή/Ώρα*</label>
                    {data_json && data_json.mode === 'submit' ? (
                       <span>{charge + "€"}</span>
                    ) : (
                      <TextField
                        id="charge"
                        variant="outlined"
                        fullWidth
                        name="charge"
                        type="number"
                        value={charge}
                        onChange={(e) => serCharge(e.target.value === '' ? null : Number(e.target.value))}
                        inputProps={{
                          id: "charge",
                          min: 0,                
                          step: 0.5, 
                        }}
                        style={{ width: '18rem' }}
                        required
                      />
                    )}
                    <span class="error-message" id="charge_error"></span>
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
                    id="availability"
                    mode={data_json !== null ? data_json.mode : null}
                  />
                  <span class="error-message" id="availability_error"></span>
                    
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
                    {data_json && data_json.mode === 'submit' ? (
                        serviceareas.map((element, index) => (
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
                        <ServiceAreasSection
                          serviceareas={serviceareas}
                          setServiceAreas={setServiceAreas}
                          id="service_areas"
                        /> 
                      )}
                      <span class="error-message" id="service_areas_error"></span>
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
                    <label htmlFor="hosting">Δυνατότητα φιλοξενείας παιδίου στο σπίτι μου*</label>
                    {data_json && data_json.mode === 'submit' ? (
                       <span>{hosting === "true" ? 'Ναι' : 'Όχι'}</span>
                    ) : (
                 
                      <select
                        name="hosting"
                        id="additional_info"
                        style={{ width: '10rem', cursor: 'pointer' }}
                        value={hosting}
                        onChange={(e) => setHosting(e.target.value)} 
                        className="custom-select"
                        required
                      >
                        <option value="" disabled>
                          ---Επιλέξτε ένα---
                        </option>
                        <option value="true">Ναι</option>
                        <option value="false">Όχι</option>
                      </select>
                    )}
                    <span class="error-message" id="additional_info_error"></span>
                  </div>          
                </section>


                {data_json && data_json.mode === 'submit' ? (
                        null
                ) : (

                  <section className="AdCreation-buttons-container">
                    <Button id='save_button'
                        className="AdCreation-button-customization"
                        variant="contained"
                        sx={{
                            backgroundColor: '#F98817',
                            textTransform: 'none',
                            lineHeight: '1.2',
                            boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.3)',
                            '&:hover': {
                              // E67D14
                              // #EC8117
                                backgroundColor: '#E67D14',
                                // backgroundColor: '#049AC3',
                                //  #05A3CF
                                // #05A0CB
                            },
                        }}
                        onClick={handleSubmit}
                        data-mode="save"
                    >
                        <span>Προσωρινή<br />Αποθήκευση</span>
                    </Button>

                    <div className="tooltip-container"
                      onMouseEnter={() => setShowTooltip(true)} 
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <Button id='submit_button'
                          className="AdCreation-button-customization"
                          variant="contained"
                          sx={{
                              // #35c704
                              // #30B802
                              // #2FB003
                              textTransform: 'none',
                              backgroundColor: '#2FAE05',
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
                        <span className="AdCreation-second-button">Οριστικοποίηση</span>
                      </Button>
                      {buttonDisabled && showTooltip && (
                          <div className="tooltip">
                              Πρέπει να συμπληρωθούν όλα τα πεδία με * 
                          </div>
                      )}
                    </div>
                  </section>
                )}
                
            </main>
            
        </div>   
    );
}

export default AdCreation;
