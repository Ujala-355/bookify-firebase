import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in a user...");
    try {
      const result = await firebase.singinUserWithEmailAndPass(email, password);
      console.log("Successfully logged in", result);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>
        <h3 className="mt-5 mb-5">OR</h3>
        <Button onClick={firebase.signinWithGoogle} variant="danger">Signin with Google</Button>
      </div>
    </>
  );
};

export default LoginPage;
