import styled from "styled-components";
import Subscription from "../../components/subscription";
const SubscriptionTotal = () => {
  return (
    <Wrapper>
      <Subscription amount="1.5" />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 40px;
  margin: auto;
`;

export default SubscriptionTotal;
