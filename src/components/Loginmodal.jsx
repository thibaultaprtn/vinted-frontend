import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const backurl = "http://localhost:3000";
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";

const Loginmodal = ({ setdisplayLogin }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="backgroundmodal"></div>
      <form
        className="form"
        action=""
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const req = {
              email: email,
              password: pwd,
            };
            const response = await axios.post(`${backurl}/user/login`, req);
            Cookies.set("token", response.data.token, { expires: 7 });
            // navigate("/");
            setdisplayLogin(false);
          } catch (error) {
            console.log(error.response.data);
            return alert(error.response.data.message);
          }
        }}
      >
        <h1>Se connecter</h1>
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
        <button type="submit"> Se connecter</button>
        <Link to="/signup">
          <button> Pas encore de compte ? Inscris-toi !</button>
        </Link>
        <IoClose
          onClick={() => {
            setdisplayLogin(false);
          }}
        />
      </form>
    </>
  );
};

export default Loginmodal;
