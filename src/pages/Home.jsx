import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div> Home </div>
      <Link to="/product/idtest">
        <div>Link to Product</div>
      </Link>
    </>
  );
};

export default Home;
