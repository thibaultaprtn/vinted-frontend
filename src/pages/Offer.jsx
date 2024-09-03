import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const backurl = process.env.BACKURL;

const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetcharticle = async () => {
      try {
        const response = await axios.get(`${backurl}/offer/${id}`);
        // console.log("response.data retrieved", response.data);
        setArticle(response.data);
        setIsLoading(false);
      } catch (error) {
        message: error.response.data;
      }
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
                  {article.product_details.map((detail, index) => {
                    console.log(detail);
                    return (
                      <p style={{ display: "flex" }}>
                        <span style={{ flex: 1 }}>
                          {Object.keys(detail)[0]}
                        </span>
                        <span style={{ flex: 1 }}>
                          {detail[Object.keys(detail)[0]]}
                        </span>
                      </p>
                    );
                  })}
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
