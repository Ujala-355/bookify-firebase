// pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";

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
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/book/list" element={<ListingPage/>}/>
              <Route path="/book/view/:bookId" element={<BookDetailPage/>}/>
              <Route path="/book/orders" element={<OrdersPage/>}/>
              <Route path="/books/orders/:bookId" element={<ViewOrderDetails/>}/>
          </Routes>
      </>
  );
}

export default App;
