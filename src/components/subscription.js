import styled from "styled-components";
import Button from "./button";
import PaypalButton from "./paypal";
import "../assets/css/Subscrption.css";
import { useState } from "react";
import Stripe from "./stripe";
const Subscription = ({ amount }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  console.log(show);
  return (
    <Wrapper>
      <WrapperText1>
        <WrapperText1Content>Basic</WrapperText1Content>
      </WrapperText1>
      <WrapperText2>$1.50 per Gift</WrapperText2>
      <Contentcheckboxgroup>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
        <label className="container">
          All features and premium support
          <span className="checkmark" />
        </label>
      </Contentcheckboxgroup>
      {!show ? (
        <Button
          text="Buy now"
          width="200px"
          fsize="18px"
          onClick={handleShow}
        />
      ) : (
        <Button text="Close" width="200px" fsize="18px" onClick={handleShow} />
      )}
      <PaypalButton amount={amount} />
      <Stripe />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 18.83px 47.08px rgba(47, 50, 125, 0.1);
  border-radius: 20px;
  gap: 50px;
  padding: 40px;
  margin: auto;
`;
const WrapperText1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const WrapperText1Content = styled.div`
  font-weight: 800;
  font-size: 24px;
  color: #b224ef;
`;

const WrapperText2 = styled.div`
  font-weight: 800;
  font-size: 40px;
`;
const Contentcheckboxgroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default Subscription;
