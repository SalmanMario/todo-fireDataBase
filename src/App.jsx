import React from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config.js";
import { db } from "./config.js";
import { Welcome } from "./components/Welcome.jsx";
import { Home } from "./components/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
