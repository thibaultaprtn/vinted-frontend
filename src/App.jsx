import "./App.css";

import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Composants

import Header from "./components/Header";
import Signupmodal from "./components/Signupmodal";
import Loginmodal from "./components/Loginmodal";

// Pages

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displaySignup, setDisplaySignup] = useState(false);
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
      <Router>
        {displaySignup && <Signupmodal setdisplaySignup={setDisplaySignup} />}
        {displayLogin && <Loginmodal setdisplayLogin={setDisplayLogin} />}
        <Header
          setdisplaySignup={setDisplaySignup}
          setdisplayLogin={setDisplayLogin}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
