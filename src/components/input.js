import styled from "styled-components";
const Inputtag = ({
  children,
  text,
  type,
  onChange,
  value,
  placeholder,
  disable,
}) => {
  return (
    <Inputcontent>
      <Inputlabel> {text}</Inputlabel>
      <Inputwrapper>
        <InputIcon>{children}</InputIcon>
        <Inputinput
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disable}
        />
      </Inputwrapper>
    </Inputcontent>
  );
};
const Inputcontent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  font-weight: 400;
`;
const Inputlabel = styled.div`
  font-size: 14px;
`;
const Inputwrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 10px;
  gap: 10px;
`;
const InputIcon = styled.div`
  display: flex;
  align-items: center;
  color: #d0d5dd;
  font-size: 20px;
`;
const Inputinput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
`;
export default Inputtag;
