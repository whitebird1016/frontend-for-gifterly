import styled from "styled-components";
const Button = ({
  text,
  width,
  color,
  fcolor,
  onClick,
  border,
  fsize,
  disabled,
}) => {
  return (
    <ButtonWrapper
      width={width}
      color={color}
      fcolor={fcolor}
      onClick={onClick}
      border={border}
      fsize={fsize}
      disabled={disabled}
    >
      {text}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.border ? props.border : "none")};
  background: ${(props) =>
    props.color
      ? props.color
      : "linear-gradient(90deg, #b224ef 0%, #7579ff 100%)"};
  border-radius: 12px;
  padding: 10px 30px;
  color: ${(props) => (props.fcolor ? props.fcolor : "#ffffff")};
  font-weight: 500;
  font-size: ${(props) => (props.fsize ? props.fsize : "14px")};
  width: ${(props) => props.width};
`;
export default Button;
