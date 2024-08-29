import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
const backurl = "http://localhost:3000";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`${backurl}/offer/`);
      console.log("response.data", response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchdata();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <div className="hero">
            <div className="container">
              <div>
                <p>Prêts à faire du tri dans vos placards ?</p>
                <button>Commencer à vendre</button>
              </div>
            </div>
          </div>

          <div className="container homephotolist">
            {data.map((elem, index) => {
              return (
                <div className="homephoto" key={elem._id}>
                  <Link to={`/offer/${elem._id}`}>
                    <div className="avatarupper">
                      <img src={elem.owner.account.avatar.secure_url} alt="" />
                      <span>{elem.owner.account.username}</span>
                    </div>

                    <img
                      className="articlephoto"
                      src={elem.product_image[0].secure_url}
                      alt=""
                    />
                    <div className="itemdescription">
                      <p>{elem.product_price} €</p>
                      <p>{elem.product_details[1].TAILLE}</p>
                      <p>{elem.product_details[0].MARQUE}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* <Link to="/offer/idtest">
            <div>Link to Product</div>
          </Link> */}
        </>
      )}
    </>
  );
};

export default Home;
