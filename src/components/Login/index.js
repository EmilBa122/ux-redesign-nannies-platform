import './index.css';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../config/firebase';
import { useNavigate, Link } from 'react-router-dom'; // React Router for navigation
import { doc, setDoc } from 'firebase/firestore';

import { getFirestore, getDoc } from 'firebase/firestore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();
    const firestore = getFirestore();

    // Handles the login functionality of the user
    async function handleLogin(e) {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Indicate login is in progress
        setError(''); // Clear previous error

        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log("User logged in:", userCredential.user);

            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                  const userRef = doc(firestore, 'users', user.uid);
                  getDoc(userRef)
                    .then((docSnap) => {
                      if (docSnap.exists()) {
                        if (docSnap.data().role === 'Νταντά')
                        {
                            navigate('/HomePageBabysitter'); 
                        }
                        else
                        {
                            navigate('/Κηδεμόνας');
                        }
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
          
            
        } catch (error) {
            setError(error.message); // Display the error message
        } finally {
            setLoading(false); // Reset the loading state
        }
    }
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            if (currentUser) {
                navigate('/HomePageBabysitter'); // Navigate to /courses if already logged in
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, [navigate, FIREBASE_AUTH]);

 
    return (
        <div className="login">
            <form onSubmit={handleLogin} className="login-container">
                <h2>Login</h2>
                <div className="back-link" onClick={() => navigate(-1)}>
                    X
                </div>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <div className="login-row">
                    <label>Email:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login-row">
                    <label>Password:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <Link to="/signup" className="link-style">
                    Create new user
                </Link>
            </form>
        </div>
    );
}
