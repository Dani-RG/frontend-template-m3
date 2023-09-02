import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import creditsService from "../services/creditsService";

export default function StripeComp(props) {
  const stripePromise = loadStripe(
    "pk_test_51N9WFJHupFniTzZZOpGJO3AAmCXXfwPWhhr6cgjooKjieFRh8taHug4OfE6wIdEbYtRCPkkmgyTU17ysz5CwVbIj00aTgMjQQW",
    { locale: "en" }
  );

  const { amount } = props;

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    //const amount = 10000;
    const articleSelected = amount;
    console.log(`the amount is ${amount}`);
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoading(true);

      if (!error) {
        const { id } = paymentMethod;

        try {
          const data = await creditsService.checkout({ id, amount });
          console.log(data);

          elements.getElement(CardElement).clear();
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCheckout();
    };

    return (
      <form onSubmit={handleSubmit} className="stripe_card">
        <h3>Article:</h3>
        <h3>{articleSelected}</h3>
        <CardElement
          options={{
            style: {
              base: {
                iconColor: "#c4f0ff",
                color: "#0afd93",
                fontWeight: "500",
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "13px",
                lineHeight: "40px",
                fontSmoothing: "antialiased",
                "::placeholder": {
                  color: "#31b8fc",
                },
              },
              invalid: {
                iconColor: "#FFC7EE",
                color: "#FFC7EE",
              },
            },
          }}
        />
        <button className="buy_btn" disabled={!stripe}>
          {loading ? <div>Loading...</div> : "Buy"}
        </button>
      </form>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
