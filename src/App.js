// pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";

import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Components
import MyNavbar from "./component/Navbar";


import './App.css';

function App() {
  return (
      <>
          <MyNavbar/>
          <Routes>
              <Route path="/" element={<h1>Home</h1>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/book/list" element={<ListingPage/>}/>
          </Routes>
      </>
  );
}

export default App;
