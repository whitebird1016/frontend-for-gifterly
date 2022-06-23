import styled from "styled-components";
const ImgSize = ({ url, width, height }) => {
  return <WrapperImage src={url} width={width} height={width}></WrapperImage>;
};
const WrapperImage = styled.img`
  width: ${(props) => (props.width ? props.width : "50px")};
  height: ${(props) => (props.height ? props.height : "50px")};
  border-radius: 200px;
`;
export default ImgSize;
