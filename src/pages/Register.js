import React,{useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useFirebase} from "../context/Firebase";
import { useNavigate } from "react-router-dom";


const RegisterPage=()=>{
    const [email,setEmail]=useState('');
    const [password, setPassword]=useState('');
    const firebase=useFirebase();
    const navigate = useNavigate();

    // console.log(firebase)
    useEffect(() => {
        if (firebase.isLoggedIn) {
          navigate("/");
        }
      }, [firebase.isLoggedIn, navigate]);
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("Signin up a user...")
       const result= await firebase.signupUserWithEmailAndPassword(email,password)
        console.log("Successfull",result)
    }
    return(
        <>
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            onChange={e=>setEmail(e.target.value)} 
                            value={email}
                            type="email" 
                            placeholder="Enter email" 
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                            type="password" 
                            placeholder="Password" 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Create account</Button>
                </form>
            </div>
        </>
    )
}
export default RegisterPage;