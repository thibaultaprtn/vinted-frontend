import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const backurl = import.meta.env.VITE_BACKURL;
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";

const Loginmodal = ({ setDisplayLogin, setDisplaySignup }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="backgroundmodal"></div>
      <form
        className="form"
        action=""
        onSubmit={async (event) => {
          setErrorMessage("");
          event.preventDefault();
          try {
            const req = {
              email: email,
              password: pwd,
            };
            const response = await axios.post(`${backurl}/user/login`, req);
            Cookies.set("token", response.data.token, { expires: 7 });
            // navigate("/");
            // TODO Est ce qu'il vaut mieux aller sur Publish ou sur Home à ce moment la ?
            navigate("/");
            setDisplayLogin(false);
          } catch (error) {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);
          }
        }}
      >
        <IoClose
          style={{ alignSelf: "flex-end" }}
          onClick={() => {
            setDisplayLogin(false);
          }}
        />
        <h2>Se connecter</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={pwd}
          onChange={(event) => {
            setPwd(event.target.value);
          }}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button id="loginmodalbutton" type="submit">
          {" "}
          Se connecter
        </button>
        <p
          style={{ textAlign: "center" }}
          onClick={() => {
            setDisplaySignup(true);
            setDisplayLogin(false);
          }}
        >
          Pas encore de compte ? Inscris-toi !
        </p>
      </form>
    </>
  );
};

export default Loginmodal;
