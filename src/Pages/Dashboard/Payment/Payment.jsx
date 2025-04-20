import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
const Payment = () => {
  return (
    <div>
      <div>
        <SectionTitle
          heading={"Payment"}
          subHeading={"Please pay to eat"}
        ></SectionTitle>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
