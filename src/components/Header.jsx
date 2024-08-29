import { Link } from "react-router-dom";
import Signup from "../pages/Signup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { setDisplaySignup, setDisplayLogin } = props;
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
        <form action="">
          <input type="text" placeholder="Rechercher des articles..." />
        </form>
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

        <button> Vends tes articles </button>
      </div>
    </header>
  );
};

export default Header;
