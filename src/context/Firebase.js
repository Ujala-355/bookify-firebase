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
import {getFirestore,collection,addDoc,getDocs,doc,getDoc,query,where} from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

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
const firestore=getFirestore(firebaseApp);
const storage=getStorage(firebaseApp);

const googleProvider=new GoogleAuthProvider()

export const FirebaseProvider=(props)=>{
    const [user, setUser]=useState(null);
    // useEffect(()=>{
    //     onAuthStateChanged(firebaseAuth, user=>{
    //         if(user){ 
    //             setUser(user);
    //         }
    //         else{ 
    //             setUser(null);
    //         console.log("User",user)
    //         }
    //     })
    // },[]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
          if (authUser) {
            setUser(authUser);
          } else {
            setUser(null);
          }
        });
    
        return () => unsubscribe(); // Cleanup the subscription on component unmount
      }, []);
    const signupUserWithEmailAndPassword=(email,password)=>
        createUserWithEmailAndPassword(firebaseAuth,email,password);
    
    const singinUserWithEmailAndPass=(email,password)=>
        signInWithEmailAndPassword(firebaseAuth,email,password);
    
    const signinWithGoogle=()=>signInWithPopup(firebaseAuth,googleProvider);

    const handleCreateNewListing=async(name,isbn,price,cover)=>{
        const imageRef=ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult= await uploadBytes(imageRef,cover);
        return await addDoc(collection(firestore,'books'),{
            name,
            isbn,
            price,
            imageURL:uploadResult.ref.fullPath ,
            userID:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL

        })
    }

    const listAllBooks=()=>{
        return getDocs(collection(firestore,"books"))
    }

    // const getBookById=async(id)=>{
    //     const docRef= doc(firestore,"book",id);
    //     const result= await getDoc(docRef);
    //     return result;
    // }
    const getBookById = async (id) => {
        const docRef = doc(firestore, "books", id);
        const result = await getDoc(docRef);
        if (result.exists()) {
          return result.data();
        } else {
          console.log("Document does not exist!");
          return null;
        }
      };
      
      
    const getImageURL=async (path)=>{
        try{
            const downloadURL=await getDownloadURL(ref(storage,path));
            return downloadURL;
        }
        catch(error){
            console.log("error",error)
        }
    }
    const placeOrder = async (bookId, qty) => {
        if (user) {
            const collectionRef = collection(firestore, 'books', bookId, 'orders');
            const result = await addDoc(collectionRef, {
                userID: user.uid,
                userEmail: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                qty: Number(qty),
            });
            return result;
        } 
        else{
            console.error('User is not authenticated. Cannot place the order.');
            return null;
        }
    };
    
    // const fetchMyBooks=async(userId)=>{
    //     const collectionRef=collection(firestore,"books");
    //     const q=query(collectionRef, where("userID","==", user.uid));
    //     const result=await getDocs(q);
    //     console.log(result)
    // }
    const fetchMyBooks = async () => {
        if (user) {
            const collectionRef = collection(firestore, "books");
            const q = query(collectionRef, where("userID", "==", user.uid));
            const result = await getDocs(q);
            return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } 
        else {
            console.error("User is not authenticated. Cannot fetch books.");
            return [];
        }
    };
    
    const getOrders=async(bookId)=>{
      const collectionRef=collection(firestore,'books',bookId,'orders')
      const result=await getDocs(collectionRef);
      return result;
    }
    const isLoggedIn=user ? true:false;
    return(
        <>
            <FirebaseContext.Provider value={{
                signinWithGoogle,
                signupUserWithEmailAndPassword, 
                singinUserWithEmailAndPass,
                handleCreateNewListing,
                listAllBooks,
                getImageURL,
                getBookById,
                placeOrder,
                fetchMyBooks,
                getOrders,
                user,
                isLoggedIn,
                }}>
                {props.children}
            </FirebaseContext.Provider>
        </>
    )
}