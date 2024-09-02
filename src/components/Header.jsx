import { Link } from "react-router-dom";
import Signup from "../pages/Signup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({
  setDisplaySignup,
  setDisplayLogin,
  search,
  setSearch,
  token,
  setToken,
}) => {
  const [displayMessage, setDisplayMessage] = useState("");

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
        <input
          type="text"
          placeholder="Rechercher des articles..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
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
          {" "}
          Vends tes articles{" "}
        </button>
      </div>
    </header>
  );
};

export default Header;
