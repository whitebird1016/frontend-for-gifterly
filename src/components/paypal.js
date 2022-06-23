import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// This values are the props in the UI
const currency = "USD";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, amount }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  console.log(amount);

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div>just a moment</div>}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
          });
        }}
      />
    </>
  );
};

const PaypalButton = ({ amount }) => {
  return (
    <div style={{ maxWidth: "750px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AWyUyaGDjNNGWBO6p38r5ufA2AKykZ4IlnugHYQYZehncEEXDPEq_lB6DA4vw87ccVEtaQBeadEad-4q",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={true} amount={amount} />
      </PayPalScriptProvider>
    </div>
  );
};
export default PaypalButton;
