import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const backurl = "http://localhost:3000";

const Offer = (props) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetcharticle = async () => {
      const response = await axios.get(`${backurl}/offer/${id}`);
      // console.log("response.data retrieved", response.data);
      setArticle(response.data);
      setIsLoading(false);
    };

    fetcharticle();
  }, []);

  // console.log("id", id);
  // console.log("props dans offer", props.data);
  // const article = props.data.find((elem) => elem._id === id);

  // console.log("article", article);
  return (
    <>
      {isLoading ? (
        <p> Chargement ...</p>
      ) : (
        <>
          <div className="offerdiv">
            <img src={article.product_image[0].secure_url} alt="" />
            <div>
              <p>{article.product_price} €</p>
              <p>Marque {article.product_details[0].MARQUE}</p>
              <p>Taille {article.product_details[1].TAILLE}</p>
              <p>Etat {article.product_details[2].ÉTAT}</p>
              <p>Couleur {article.product_details[3].COULEUR}</p>
              <p>Emplacement {article.product_details[4].EMPLACEMENT}</p>
              <p>{article.product_name}</p>
              <p>{article.product_description}</p>
              <img src={article.owner.account.avatar.secure_url} alt="" />{" "}
              <span>{article.owner.account.username}</span>
              <button>Acheter</button>
            </div>
          </div>
        </>
      )}
      {/* <Link to="/">
        <div>Link to Home</div>
      </Link> */}
    </>
  );
};

export default Offer;
