import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyABsps5N3XUo0nRXa-8RVgIM9_Zq3pgp9Y",
    authDomain: "context-api-d389c.firebaseapp.com",
    projectId: "context-api-d389c",
    storageBucket: "context-api-d389c.appspot.com",
    messagingSenderId: "1077669792714",
    appId: "1:1077669792714:web:8a690c8c34ae34754d5d33",
    databaseUrl: "https://context-api-d389c-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)

const FirebaseContext = createContext(null)
export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

    const [name, setName] = useState('')

    const signUpUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const putData = (key, data) => {
        set(ref(db, key), data)
    }

    // get(child(ref(db),'grandfather/father')).then(snapshot=> console.log(snapshot.val()))

    // onValue(ref(db,'grandfather'),(snapshot)=>console.log(snapshot.val()))
    useEffect(() => {
        onValue(ref(db, 'grandfather/father/child'), (snapshot) => setName(snapshot.val().name))
    }, [])

    return (
        <FirebaseContext.Provider value={{ signUpUserWithEmailAndPassword, putData }}>
            <h3>Name is {name}</h3>
            {props.children}
        </FirebaseContext.Provider>
    )
}