import { useNavigate, Link } from "react-router-dom";

const Successpublish = ({
  displaySuccessPublish,
  setDisplaySuccessPublish,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="backgroundmodal"></div>
      <div className="successbox">
        <p>L'annonce a bien été publiée !</p>
        <button
          className="successbutton"
          onClick={() => {
            navigate("/publish");
            setDisplaySuccessPublish(false);
          }}
        >
          Soumettre une nouvelle annonce
        </button>
        <button
          className="successbutton"
          onClick={() => {
            navigate("/");
            setDisplaySuccessPublish(false);
          }}
        >
          retour à la page d'accueil
        </button>
      </div>
    </>
  );
};

export default Successpublish;
