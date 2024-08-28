import { useParams, Link } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  return (
    <>
      <div>Product</div>
      <Link to="/">
        <div>Link to Home</div>
      </Link>
    </>
  );
};

export default Product;
