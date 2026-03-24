import { initializeApp } from "firebase/app";
import {createContext, useContext} from 'react';
// import { getAnalytics } from "firebase/analytics";

const FirebaseContext = createContext(null)
export const useFirebase =()=> useContext(FirebaseContext)

export const FirebaseProvider =(props)=>{
    return <FirebaseContext.Provider>
        {props.children}
    </FirebaseContext.Provider>
}

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


export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);