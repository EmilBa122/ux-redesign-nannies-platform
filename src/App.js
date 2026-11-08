import React from 'react'
import './App.css'; 
import Header from './components/Header' 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Guardian from './components/Guardian' 
import InstructionsForGar from './components/InstructionsForGar'
import InstructionsForNan from './components/InstructionsForNan'
import CriteriaForNan from './components/CriteriaForNan'
import CriteriaForGar from './components/CriteriaForGar'
import InformationsForNan from './components/InformationsForNan'
import NoMatch from './components/NoMatch'
import Footer from './components/Footer'
import Questions from './components/Questions' 
import NannyDetails from './components/NannyDetails';
import Profile from './components/Profile';
import History from './components/History';
import PaymentHistory from './components/PaymentHistory';
import RequestHistory from './components/RequestHistory';
import AgreementsHistory from './components/AgreementsHistory';
import Messages from './components/Messages';
import HomePageBabysitter from './components/HomePageBabysitter'
import AdCreation from './components/AdCreation'
import ResumeCreation from './components/ResumeCreation'
import ShowFinalizedAd from './components/ShowFinalizedAd'
import ShowFinalizedResume from './components/ShowFinalizedResume'
import RatingsSection  from './components/RatingsSection';
import Request from './components/Request'
import PersonalInfoForm from './components/PersonalInfoForm'
import EndCollab from './components/EndColab';

import Login from './components/Login';
import Register from './components/Register';

import FIREBASE_DB from './config/firebase';

function App() {
  return (
    <>
      <Header />
      <main>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register/>} />
          <Route path = '/' element={<Home />} />
          <Route path = 'Κηδεμόνας' element={<Guardian />} /> 
          <Route path="/HomePageBabysitter" element={<HomePageBabysitter />} />
         
          {/* Route for AdCreation */}
          <Route path="/HomePageBabysitter/AdCreation" element={<AdCreation />} />

          {/* Route for ResumeCreation */}
          <Route path="/HomePageBabysitter/ResumeCreation" element={<ResumeCreation />} />

          <Route path="/HomePageBabysitter/ShowFinalizedAd" element={<ShowFinalizedAd />} />

          <Route path="/HomePageBabysitter/ShowFinalizedResume" element={<ShowFinalizedResume />} />

          <Route path="/HomePageBabysitter/RatingsSection" element={<RatingsSection />} />
          <Route path = 'Οδηγίες κηδεμόνα' element={<InstructionsForGar />} />  
          <Route path = 'Οδηγίες νταντάς' element={<InstructionsForNan />} /> 
          <Route path = 'Κριτήρια επιλεξιμότητας κηδεμόνα' element={<CriteriaForGar />} /> 
          <Route path = 'Κριτήρια επιλεξιμότητας νταντάς' element={<CriteriaForNan />} /> 
          <Route path = 'Σημαντικές πληροφορίες για νταντά' element={<InformationsForNan />} /> 
          <Route path = 'Συχνές ερωτήσεις' element={<Questions />} />
          <Route path = 'Request/:id' element={<Request />} />
          <Route path = 'EndCollab/:id' element={<EndCollab />} />
          <Route path="/nanny/:id" element={<NannyDetails />} /> 
          <Route path="Προφίλ" element={<Profile />} /> 
          <Route path="Προσωπικά στοιχεία" element={<PersonalInfoForm />} />
          <Route path="Ιστορικό" element={<History />} /> 
          <Route path="Προβολή ιστορικού πληρωμών" element={<PaymentHistory />} />
          <Route path="Προβολή ιστορικού δηλώσεων" element={<RequestHistory />} />
          <Route path="Προβολή ιστορικού συμφωνητικών" element={<AgreementsHistory />} />
          <Route path="Μηνύματα" element={<Messages />} />
          <Route path ='*' element = {<NoMatch />} />
      </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
