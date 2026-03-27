import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const FirebaseContext = createContext(null)

const firebaseConfig = {
  apiKey: "AIzaSyB838yovgQgZCMcNtMd-zm4v9Ajclq1gBo",
  authDomain: "linkvault-c3409.firebaseapp.com",
  projectId: "linkvault-c3409",
  storageBucket: "linkvault-c3409.firebasestorage.app",
  messagingSenderId: "257062258957",
  appId: "1:257062258957:web:a2e13a62ccb626074a0844",
  measurementId: "G-BLHJ7MYH6B",
  databaseURL : "https://linkvault-c3409-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const signinUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const logout = () => {
        return signOut(firebaseAuth);
    }

    const isLoggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            logout,
            isLoggedIn,
            user,
            db
        }}>

            {props.children}
        </FirebaseContext.Provider>
    )
}
