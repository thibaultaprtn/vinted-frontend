import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
const backurl = "http://localhost:3000";

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const response = await axios.get(`${backurl}/offer/`);
  //     console.log("response.data", response.data);
  //     setData(response.data);
  //     setIsLoading(false);
  //   };

  //   fetchdata();
  // }, []);

  return (
    <>
      <header>
        <div className="container">
          <img
            src="https://lereacteur-vinted.netlify.app/assets/logo-a7c93c98.png"
            alt="logo-vinted"
          />
          <form action="">
            <input type="text" placeholder="Rechercher des articles..." />
          </form>
          <div>
            <button> S'inscrire </button>
            <button> Se connecter </button>
          </div>
          <button> Vends tes articles </button>
        </div>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
