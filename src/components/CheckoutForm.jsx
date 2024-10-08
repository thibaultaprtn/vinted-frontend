import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
const backurl = import.meta.env.VITE_BACKURL;

const CheckoutForm = ({ title, price }) => {
  const body = { title: title, price: price };
  // state de gestion de msg d'erreur
  const [errorMessage, setErrorMessage] = useState("");
  // state qui indique si le paiement est un succès ou pas ?
  const [success, setSuccess] = useState(false);
  // state loader pendant la transaction
  const [isPaying, setIsPaying] = useState(false);

  // pour pouvoir interagir avec Stripe
  const stripe = useStripe();

  // pour récupérer et vérifier les infos rentrés dans l'imput de cb stripe
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // on veut disable le bouton au début de cette fonction =>
      setIsPaying(true);

      // Si il y a eu un problème avec les éléments on arrete tout
      if (elements == null) {
        return;
      }

      // On envoie à Stripe pour vérifier si tout est bon !
      // on fait un destructuring de la clé error et on la renomme en submitError car on va avoir besoin du nom error plus tard !

      // 2)
      const { error: submitError } = await elements.submit();

      // si erreur reçue on arrete tout et on donne à errorMessage le message d'erreur de stripe
      // 4)
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      // si pas d'erreur on fait une intention de paiement via notre back end (sécurisé) =>
      const response = await axios.post(`${backurl}/payment`, body);

      //   console.log(response.data.client_secret);
      // on stock dans une variable ce client secret =>
      const clientSecret = response.data.client_secret;

      // requete a stripe pour valider le paiement !
      // 13)
      const { error, paymentIntent } = await stripe.confirmPayment({
        // les infos de la cb
        elements: elements,
        // le "token" provenant du back
        clientSecret: clientSecret,
        // une éventuelle redirection
        confirmParams: {
          return_url: `${backurl}`,
        },
        // on ne veut pas de redirection automatique
        redirect: "if_required",
      });

      // si il y a eu un pb =>
      if (error) {
        setErrorMessage(error.message);
      }

      // si le paymentIntent c'est bien passé =>
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
    // ma fonction est finie j'arrete le loading
    setIsPaying(false);
  };

  //   TODO Rajouter une requête Put qui rajoute un paramètre à l'article indiquant qu'il est vendu puis rajouter ce paramètre dans les filtres
  return success ? (
    <p className="paymentconfirm">Merci pour votre achat !</p>
  ) : (
    <form
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <PaymentElement />
      {/* SI stripe pas chargé OU élément pas chargé OU isPaying true alors disable*/}
      <button
        className="paymentbutton"
        disabled={!stripe || !elements || isPaying}
      >
        Payer
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
