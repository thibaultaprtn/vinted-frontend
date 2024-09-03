import * as React from "react";
import { Link } from "react-router-dom";
import Signup from "../pages/Signup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Range } from "react-range";

const Header = ({
  setDisplaySignup,
  setDisplayLogin,
  search,
  setSearch,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  sort,
  setSort,
  token,
  setToken,
}) => {
  const [displayMessage, setDisplayMessage] = useState("");
  const sortOptions = ["Prix Croissant", "Prix Décroissant"];

  // TODO Implémenter le temps d'attente avant le rafraichissement de la page
  useEffect(() => {
    const timeOutId = setTimeout(() => setDisplayMessage(search), 500);
    return () => clearTimeout(timeOutId);
  }, [search]);

  const navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img
            src="https://lereacteur-vinted.netlify.app/assets/logo-a7c93c98.png"
            alt="logo-vinted"
          />
        </Link>
        <div className="filterdiv">
          <input
            id="searchbar"
            type="text"
            placeholder="Rechercher des articles..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* <input type="text" /> */}
            {/* <label htmlFor="sort_choice">Trier par prix</label>
            <input
              list="sortOptions"
              type="text"
              id="sort_choice"
              onChange={(event) => {
                console.log(event);
              }}
            /> */}
            <div>
              <label className="sortinglabel" for="prix">
                Trier par prix :{" "}
              </label>
              <select
                style={{ borderColor: "#757575", borderRadius: 3 }}
                name="prix"
                id="sortOptions"
                onChange={(event) => {
                  // console.log("event.target.value ==>", event.target.value);
                  setSort(event.target.value);
                }}
              >
                <option value={""}> </option>
                <option value={"price-asc"}>Croissant</option>
                <option value={"price-desc"}>Décroissant</option>
              </select>
            </div>

            <input
              style={{
                borderRadius: 3,
                border: "none",
                backgroundColor: "#F5F6F7",
                padding: 5,
              }}
              type="number"
              placeholder="Prix Minimum"
              value={priceMin}
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            />
            <input
              style={{
                borderRadius: 3,
                border: "none",
                backgroundColor: "#F5F6F7",
                padding: 5,
              }}
              type="number"
              placeholder="Prix Maximum"
              value={priceMax}
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            />
          </div>
        </div>

        <>
          {Cookies.get("token") ? (
            <button
              id="logout"
              onClick={() => {
                Cookies.remove("token");
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <div>
              <button
                onClick={() => {
                  setDisplaySignup(true);
                }}
              >
                S'inscrire
              </button>
              <button
                onClick={() => {
                  setDisplayLogin(true);
                }}
              >
                Se connecter
              </button>
            </div>
          )}
        </>

        <button
          onClick={() => {
            {
              Cookies.get("token")
                ? navigate("/publish")
                : setDisplayLogin(true);
            }
          }}
        >
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
