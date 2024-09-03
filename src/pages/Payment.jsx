import "../styles/payment.css";

import { useLocation } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(
  "pk_test_51PuwhcBRYiQtSQMWSkhUtPkDN12mA5UMaejDAfnFgbURt8Y1NxpkncIcOR6C5lj1qaVscwkVUS7DpDSmcPcV5tQT00UNwOOuGd"
);

const Payment = () => {
  // TODO Gérer l'exception lorsque l'utilisateur accède cette page directement en entrant directement l'URL car dans ce cas pas de title/price et la page crashe

  const location = useLocation();
  const { title, price } = location.state;
  const pricetot = Number((price + 1.2).toFixed(2));
  console.log("price", price, typeof price);
  console.log(Number(price));
  console.log("pricetot", pricetot, typeof pricetot);

  const options = {
    mode: "payment",
    amount: Number((pricetot * 100).toFixed(0)),
    currency: "eur",
  };

  return (
    // Le composant Elements doit contenir toute notre logique de paiement
    // On lui donner la preuve que nous sommes connectés et les options de paiement
    <div className="paymentform">
      <p>Résumé de la commande</p>
      <p style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Commande</span> <span>{price}</span>
      </p>
      <p style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Frais protection acheteurs</span> <span>0.40 €</span>
      </p>
      <p style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Frais de port</span> <span>0.80 €</span>
      </p>

      <p style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Total</span> <span>{pricetot} €</span>
      </p>

      <p>
        Il ne vous reste plus qu'une étape pour vous offrir <span>{title}</span>
        . Vous allez payer <span>{pricetot} € </span>(frais de protextion et
        frais de port inclus).
      </p>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm title={title} price={pricetot} />
      </Elements>
    </div>
  );
};

export default Payment;
