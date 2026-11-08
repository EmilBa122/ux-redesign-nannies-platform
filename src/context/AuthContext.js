import React, { createContext, useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../config/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            if (currentUser) {
                
                setUser(currentUser);
            } else {
                
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        // With the value={{ user, setUser, loading }} I choose which states and setter the other pages 
        // can use and I specify in the AuthContext which "global" states and setter it will have
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};