import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import background from "../../../assets/images/2.png";
import Logo from "../../../assets/images/Logo.jpg";
import { FiUsers, FiEyeOff, FiEye, FiMail } from "react-icons/fi";
import { PUBLIC_SIGNIN } from "../../../configs/router-config";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import Sociallogin from "./sociallogin";
import ButtonGroup from "../../../components/radiogroup";
import ImgSize from "../../../components/imgsize";

const RadioOptions = [
  { name: "I am a Brand", value: "brand", default: true },
  { name: "I am an Influencer", value: "influencer" },
];

const Signup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [isbrand, setIsbrand] = useState(true);
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: username,
      email: email,
      password: password,
      isBrand: isbrand,
    };
    try {
      await axios.post(process.env.REACT_APP_API + "/api/auth/signup", data);
      toast("Please Sign In");
      history.push("/signin");
    } catch (err) {
      toast(err.response.data);
    }
    setLoading(false);
  };
  const handlechange = () => {
    setIsbrand(!isbrand);
  };

  return (
    <Wrapper>
      <ImgWrapper>
        <ImgWrapperContent>
          Influencer Gifting Automation Platform
        </ImgWrapperContent>
      </ImgWrapper>
      <SignupWrapper>
        <SignupWrapperContent>
          <Signuplogo>
            <ImgSize url={Logo} alt="logo" width="100" height="100" />
          </Signuplogo>
          <Signuptext1>Sign up</Signuptext1>
          <Signuptext2>
            Take the next step and sign in to your account
          </Signuptext2>
          <Signupput>
            <Signupputdiv id="first-name" isRequired>
              <Signupputinput
                type="text"
                placeholder="Enter Username"
                name="username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <FiUsers />
            </Signupputdiv>
          </Signupput>
          <Signupput>
            <Signupputdiv id="email" isRequired>
              <Signupputinput
                type="email"
                placeholder="Enter Email"
                name="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FiMail />
            </Signupputdiv>
          </Signupput>
          <Signupput>
            <Signupputdiv id="password" isRequired>
              <Signupputinput
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                minLength="6"
                name="psw"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div onClick={handleClick}>{show ? <FiEyeOff /> : <FiEye />}</div>
            </Signupputdiv>
          </Signupput>
          <Signupput>
            <ButtonGroup
              onChange={handlechange}
              options={RadioOptions}
              name="brand"
            />
          </Signupput>
          <Signupremem>
            <Signupremember>
              <Signuprememberinput type="checkbox" />
              Remember me
            </Signupremember>

            <Signuprecover>forgot password </Signuprecover>
          </Signupremem>
          <Signupbutton onClick={handleForm} isLoading={loading}>
            Sign Up
          </Signupbutton>
          <Sociallogin />
          <Signuptext2>
            Do you already have an account?
            <Signupsignup to={PUBLIC_SIGNIN}>Sign in</Signupsignup>
          </Signuptext2>
        </SignupWrapperContent>
      </SignupWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
`;
const ImgWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-end;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
const ImgWrapperContent = styled.div`
  font-weight: 600;
  font-size: 38px;
  color: white;
  width: 500px;
  flex-wrap: wrap;
  margin: 30px;
`;

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 30px;
  @media screen and (max-width: 900px) {
    height: 100vh;
  }
`;
const SignupWrapperContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  max-width: 500px;
  padding: 0px 10px;
`;
const Signuplogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Signuptext1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 42px;
`;
const Signuptext2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  color: #5d5d5b;
`;
const Signupput = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10;
  width: 100%;
`;

const Signupputdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(207, 219, 213, 0.6);
  border-radius: 23px;
  padding: 5px 20px;
`;
const Signupputinput = styled.input`
  padding: 10px;
  border: 0;
  font-weight: 700;
  font-size: 14px;
  outline: none;
  width: 90%;
`;
const Signupremem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 12px;
  width: 100%;
`;
const Signupremember = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5d5d5b;
  padding: 0px 10px;
  gap: 5px;
`;
const Signuprememberinput = styled.input`
  color: #5d5d5b;
`;
const Signuprecover = styled.div`
  padding: 0px 10px;
`;
const Signupbutton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7a52f4;
  padding: 10px;
  border: none;
  color: #ffffff;
  border-radius: 23px;
  width: 100%;
  font-weight: 700;
`;

const Signupsignup = styled(Link)`
  padding: 0 10px;
  text-decoration: none;
  color: #6941c6;
`;
export default Signup;
