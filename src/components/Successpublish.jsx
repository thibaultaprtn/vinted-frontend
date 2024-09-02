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
        L'annonce a bien été publiée !
        <button
          onClick={() => {
            navigate("/publish");
            setDisplaySuccessPublish(false);
          }}
        >
          soumettre une nouvelle annonce
        </button>
        <button
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
