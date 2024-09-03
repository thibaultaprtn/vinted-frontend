import { useLocation } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(stripePublicKey);

const Payment = () => {
  // TODO Gérer l'exception lorsque l'utilisateur accède cette page directement en entrant directement l'URL car dans ce cas pas de title/price et la page crashe

  const location = useLocation();
  const { title, price } = location.state;
  console.log("price", price, typeof price);

  const options = {
    mode: "payment",
    amount: price,
    currency: "eur",
  };

  return (
    // Le composant Elements doit contenir toute notre logique de paiement
    // On lui donner la preuve que nous sommes connectés et les options de paiement
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm title={title} price={price} />
    </Elements>
  );
};

export default Payment;
