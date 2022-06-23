import styled from "styled-components";
const Imgcard = ({ url, username, lasttext, border, color }) => {
  return (
    <Wrapper border={border} color={color}>
      <WrapperPadding>
        <WrapperContent>
          <ContentImg src={url} />
          <ContentInfo>
            <ContentInfoName>{username}</ContentInfoName>
            <ContentInfoText>{lasttext}</ContentInfoText>
          </ContentInfo>
        </WrapperContent>
      </WrapperPadding>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: ${(props) =>
    props.border ? props.border : "1px solid #d9dce"};
  width: 100%;
  background-color: ${(props) => props.color};
`;
const WrapperPadding = styled.div`
  display: flex;
  margin: 10px 20px;
`;
const WrapperContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ContentImg = styled.img``;
const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px;
`;
const ContentInfoName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;
const ContentInfoText = styled.div`
  color: #707991;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
`;
export default Imgcard;
