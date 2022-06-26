import Header from "../../components/header";
import Footer from "../../components/footer";
import PublicViewsBrand from "../../views/public/brands";
import PublicViewsInfluencer from "../../views/public/influencer";
import styled from "styled-components";
import Brandlist from "../../components/list/brandlist";
import Infllist from "../../components/list/infllist";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;
const WrapperContent = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
`;
const WrapperMidContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 50px;
`;
export default function Publiclayout() {
  const { user } = useContext(AuthContext);
  return (
    <Wrapper>
      <Header />
      {user.isBrand ? (
        <WrapperContent>
          <Brandlist />
          <WrapperMidContent>
            <PublicViewsBrand />
          </WrapperMidContent>
        </WrapperContent>
      ) : (
        <WrapperContent>
          <Infllist />
          <WrapperMidContent>
            <PublicViewsInfluencer />
          </WrapperMidContent>
        </WrapperContent>
      )}
      <Footer />
    </Wrapper>
  );
}
