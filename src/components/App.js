import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPages";
import Cart from "./Cart";
import NavMenu from "./NavMenu";


function App() {
  return (
    <div className='App'>
     
    
   <Router>
     <Navbar />
     <Cart />
     <NavMenu />
       <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/products/:handle" element={<ProductPage />}/>
       </Routes>
     </Router>
    </div> 
  );
}

export default App;
