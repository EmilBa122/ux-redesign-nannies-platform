import React, { useState, useContext } from 'react';
import './index.css';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import {  Link, useNavigate } from 'react-router-dom'; 

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext); 

    async function SignUp(event) {
        event.preventDefault(); // Prevent default form submission

        setLoading(true);
        try {
           
            const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const userRef = doc(FIREBASE_DB, "users", res.user.uid);
            await setDoc(userRef, {
                email: email,
                role: role,
            });

            setUser(res.user);

            console.log("User registered and saved to Firestore:", res.user);

            if (role === "Νταντά") 
            {
                window.location.href = "/HomePageBabysitter";
            } 
            else 
            {
                window.location.href = "/Κηδεμόνας";
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register">
            <form onSubmit={SignUp} className="register-container">
                <h2>Register</h2>

                <div className="back-link" onClick={() => navigate(-1)}>
                    X
                </div> 
                
                <div className="register-row">

                    <label>Email:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="register-row">
                    <label>Password:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="register-row">
                    <label>Εγγραφή ως:</label>
                    &nbsp;&nbsp;&nbsp;
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled selected style={{ cursor: "pointer" }}>
                            ---Επιλέξτε ένα---
                        </option>
                        <option value="Νταντά">Νταντά</option>
                        <option value="Κηδεμόνας">Κηδεμόνας</option>
                    </select>
                </div>

                <button type="submit">
                    {loading ? 'Creating user...' : 'Register'}
                </button>
                <Link to="/login" className="link-style">
                    Already have an account?
                </Link>
            </form>
        </div>
    );
}