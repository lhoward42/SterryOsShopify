import React from "react";
// import Navbar from "./Navbar";
import Home from "../pages/Home";
// import ProductPage from "../pages/ProductPages";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Home />
    </div>
    // <Router>
    // <Navbar />
    //   <Routes>
    //   <Route path="/" element={<HomePage />}/>
    //   <Route path="/merch" element={<ProductPage />}/>
    //   </Routes>
    // </Router>
  );
}

export default App;
