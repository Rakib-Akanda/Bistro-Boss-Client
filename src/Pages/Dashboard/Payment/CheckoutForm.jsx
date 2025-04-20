import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [trxId, setTrxId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  //   console.log(cart);

  const totalPrice = Math.ceil(
    cart.reduce((total, item) => total + item.price, 0)
  );
  //   const paymentIntent = async () => {
  //     const res = await axiosSecure("/create-payment-intent", {
  //       price: totalPrice,
  //     });
  //     setClientSecret(res.data.clientSecret);
  //     console.log(res.data.clientSecret);
  //   };
  //   useEffect(() => {
  //     paymentIntent();
  //   }, [paymentIntent]);
  useEffect(() => {
    if (totalPrice < 0.5) {
      return;
    }
    axiosSecure
      .post("/create-payment-intent", {
        price: totalPrice,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        // console.log(res.data.clientSecret);
      });
    refetch();
  }, [axiosSecure, totalPrice, refetch]);
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      //   console.log("payment error", error);
    } else {
      setError("");
      //   console.log("payment method", paymentMethod);
    }
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      //   console.log("confirm error");
    } else {
      //   console.log("payment intent", paymentIntent);
      {
        if (paymentIntent.status === "succeeded") {
          //   console.log("transaction id", paymentIntent.id);
          setTrxId(paymentIntent.id);
          // now save the payment in the database
          const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(), // utc date convert. use moment js to
            cartIds: cart.map((item) => item._id),
            menuIds: cart.map((item) => item.menuId),

            status: "pending",
          };
          const res = await axiosSecure.post("/payments", payment);
          //   console.log("payment saved", res.data);
          // refetch for cart clear
          refetch();
          if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your payment successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/paymentHistory");
          }
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="my-4 btn bg-gradient-to-r text-center rounded-none from-[#835D23]  to-[#B58130] text-lg text-white"
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {trxId && (
          <p className="text-green-600">Your transaction id: {trxId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
