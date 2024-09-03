import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// require("dotenv").config();
import Cookies from "js-cookie";

// Composants

import Header from "./components/Header";
import Signupmodal from "./components/Signupmodal";
import Loginmodal from "./components/Loginmodal";
import Successpublish from "./components/Successpublish";

// Pages

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Search from "./pages/Search";
import Publish from "./pages/Publish";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

function App() {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displaySignup, setDisplaySignup] = useState(false);
  const [displaySuccessPublish, setDisplaySuccessPublish] = useState(false);
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");
  // const [token, setToken] = useState(Cookies.get("token") || null);
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
        {displaySignup && (
          <Signupmodal
            setDisplaySignup={setDisplaySignup}
            setDisplayLogin={setDisplayLogin}
          />
        )}
        {displayLogin && (
          <Loginmodal
            setDisplayLogin={setDisplayLogin}
            setDisplaySignup={setDisplaySignup}
          />
        )}

        {displaySuccessPublish && (
          <Successpublish
            displaySuccessPublish={displaySuccessPublish}
            setDisplaySuccessPublish={setDisplaySuccessPublish}
          />
        )}
        <Header
          setDisplaySignup={setDisplaySignup}
          setDisplayLogin={setDisplayLogin}
          search={search}
          setSearch={setSearch}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          sort={sort}
          setSort={setSort}
          // token={token}
          // setToken={setToken}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                setSearch={setSearch}
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                sort={sort}
                setSort={setSort}
              />
            }
          />
          <Route path="/search/:search" element={<Search />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/publish"
            element={
              <Publish setDisplaySuccessPublish={setDisplaySuccessPublish} />
            }
          />
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
