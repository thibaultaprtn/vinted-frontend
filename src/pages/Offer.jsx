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
          <section className="offerbackground">
            <div className="offerdiv">
              <img src={article.product_image[0].secure_url} alt="" />
              <div>
                <div className="offerdetails">
                  <p>{article.product_price} €</p>
                  <p style={{ display: "flex" }}>
                    <span style={{ flex: 1 }}>Marque</span>
                    <span style={{ flex: 1 }}>
                      {article.product_details[0].MARQUE}
                    </span>
                  </p>
                  <p style={{ display: "flex" }}>
                    <span style={{ flex: 1 }}>Taille</span>
                    <span style={{ flex: 1 }}>
                      {article.product_details[1].TAILLE}
                    </span>
                  </p>
                  <p style={{ display: "flex" }}>
                    <span style={{ flex: 1 }}>Etat</span>
                    <span style={{ flex: 1 }}>
                      {article.product_details[2].ÉTAT}
                    </span>
                  </p>
                  <p style={{ display: "flex" }}>
                    <span style={{ flex: 1 }}>Couleur</span>
                    <span style={{ flex: 1 }}>
                      {article.product_details[3].COULEUR}
                    </span>
                  </p>
                  <p style={{ display: "flex" }}>
                    <span style={{ flex: 1 }}>Emplacement</span>
                    <span style={{ flex: 1 }}>
                      {article.product_details[4].EMPLACEMENT}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="name">{article.product_name}</p>
                  <p className="description">{article.product_description}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <img src={article.owner.account.avatar.secure_url} alt="" />{" "}
                  <span>{article.owner.account.username}</span>
                </div>
                <button>Acheter</button>
              </div>
            </div>
          </section>
        </>
      )}
      {/* <Link to="/">
        <div>Link to Home</div>
      </Link> */}
    </>
  );
};

export default Offer;
