import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
const backurl = "http://localhost:3000";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { useParams } from "react-router-dom";

const Home = (props) => {
  const { search, setSearch, priceMin, priceMax, sort } = props;
  console.log("pricemax", priceMax);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(1);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${backurl}/offer?page=${page}&title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}`
        );
        console.log("response.data", response.data);
        setData(response.data[1]);
        setLength(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        message: error.message;
      }
    };

    fetchdata();
  }, [page, search, priceMin, priceMax, sort]);

  console.log(isLoading);
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
          <div className="container" style={{ position: "relative" }}>
            <div className="container homephotolist">
              {data.map((elem, index) => {
                return (
                  <div className="homephoto" key={elem._id}>
                    <Link to={`/offer/${elem._id}`}>
                      <div className="avatarupper">
                        <img
                          src={elem.owner.account.avatar.secure_url}
                          alt={elem.owner.account.username}
                        />
                        <span>{elem.owner.account.username}</span>
                      </div>

                      <img
                        className="articlephoto"
                        src={elem.product_image[0].secure_url}
                        alt={elem.product_name}
                      />
                      <div className="itemdescription">
                        <p>{elem.product_price} €</p>
                        {elem.product_details[1].TAILLE && (
                          <p>{elem.product_details[1].TAILLE}</p>
                        )}
                        {elem.product_details[0].MARQUE && (
                          <p>{elem.product_details[0].MARQUE}</p>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {length - 5 * page > 0 && (
              <GrFormNext
                className="nextbutton"
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            )}

            {page > 1 && (
              <GrFormPrevious
                className="previousbutton"
                onClick={() => {
                  setPage(page - 1);
                }}
              />
            )}
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
