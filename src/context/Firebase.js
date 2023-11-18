import {createContext, useContext,useState,useEffect} from "react";
import {initializeApp} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
const FirebaseContext=createContext(null);
const firebaseConfig = {
    apiKey: "AIzaSyBkI_z5YUUz7P-2lKBdEEEXjY8ROBJNFL8",
    authDomain: "bookify-a9c26.firebaseapp.com",
    projectId: "bookify-a9c26",
    storageBucket: "bookify-a9c26.appspot.com",
    messagingSenderId: "523710940750",
    appId: "1:523710940750:web:b6334a841ec5d232db251f"
  };
export const useFirebase=()=>useContext(FirebaseContext);

const firebaseApp=initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseApp);
const googleProvider=new GoogleAuthProvider()

export const FirebaseProvider=(props)=>{
    const [user, setUser]=useState(null);
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, user=>{
            if(user) setUser(user);
            else setUser(null);
            console.log("User",user)
        })
    },[]);
    const signupUserWithEmailAndPassword=(email,password)=>
        createUserWithEmailAndPassword(firebaseAuth,email,password);
    
    const singinUserWithEmailAndPass=(email,password)=>
        signInWithEmailAndPassword(firebaseAuth,email,password);
    
    const signinWithGoogle=()=>signInWithPopup(firebaseAuth,googleProvider);
    const isLoggedIn=user ? true:false;
    return(
        <>
            <FirebaseContext.Provider value={{
                signinWithGoogle,
                signupUserWithEmailAndPassword, 
                singinUserWithEmailAndPass,
                isLoggedIn,
                }}>
                {props.children}
            </FirebaseContext.Provider>
        </>
    )
}