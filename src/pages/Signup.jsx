import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const backurl = import.meta.env.VITE_BACKURL;
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <form
        action=""
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const req = {
              username: username,
              email: email,
              password: pwd,
              newsletter: newsletter,
            };
            const response = await axios.post(`${backurl}/user/signup`, req);
            // console.log("test");
            // console.log("response.data.token", response.data.token);
            Cookies.set("token", response.data.token, { expires: 7 });
            navigate("/");
          } catch (error) {
            console.log(error.response.data);
            return alert(error.response.data.message);
          }
        }}
      >
        <h1>s'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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
        <input
          type="checkbox"
          placeholder="Newsletter"
          onClick={(event) => {
            // console.log("checkbox value ==>", event.target.checked);
            setNewsletter(event.target.checked);
          }}
        />
        <button type="submit"> S'inscrire</button>
        <Link to="/login">
          <button> Tu as déjà un compte ? Connecte-toi !</button>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
