import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import background from "../../../assets/images/2.png";
import Logo from "../../../assets/images/Logo.png";
import { FiMail, FiEyeOff, FiEye } from "react-icons/fi";
import { PUBLIC_SIGNUP } from "../../../configs/router-config";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

import Sociallogin from "./sociallogin";
const Signin = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/signin", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast("Login Success");
      history.push("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      toast(err.response.data);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
  };
  const handleClick = (e) => {
    setShow(!show);
  };

  return (
    <Wrapper>
      <ImgWrapper>
        <ImgWrapperContent>
          Influencer Gifting Automation Platform
        </ImgWrapperContent>
      </ImgWrapper>
      <SigninWrapper>
        <SigninWrapperContent>
          <Signinlogo>
            <img src={Logo} alt="logo" />
          </Signinlogo>
          <Signintext1>Sign in</Signintext1>
          <Signintext2>
            Take the next step and sign in to your account
          </Signintext2>
          <Signinput>
            <Signinputdiv>
              <Signinputinput
                type="email"
                placeholder="Enter Email"
                name="username"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FiMail />
            </Signinputdiv>
          </Signinput>
          <Signinput>
            <Signinputdiv id="password" isRequired>
              <Signinputinput
                minLength="6"
                placeholder="Enter Password"
                name="psw"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={show ? "text" : "password"}
              />
              <div onClick={handleClick}>{show ? <FiEyeOff /> : <FiEye />}</div>
            </Signinputdiv>
          </Signinput>
          <Signinremem>
            <Signinremember>
              <Signinrememberinput type="checkbox" />
              Remember me
            </Signinremember>
            <Signinrecover>Recover password</Signinrecover>
          </Signinremem>
          <Signinbutton onClick={handleForm} disabled={isFetching}>
            {isFetching ? <div>sdfa</div> : "Sign In"}
          </Signinbutton>
          <Sociallogin />
          <Signintext2>
            Don’t have an account?
            <Signinsignup to={PUBLIC_SIGNUP}>Sign up</Signinsignup>
          </Signintext2>
        </SigninWrapperContent>
      </SigninWrapper>
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
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
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

const SigninWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 30px;
  @media screen and (max-width: 900px) {
    height: 100vh;
  }
`;
const SigninWrapperContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 500px;
  padding: 0px 10px;
  width: 100%;
`;
const Signinlogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Signintext1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 42px;
`;
const Signintext2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  color: #5d5d5b;
`;
const Signinput = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10;
  width: 100%;
`;
const Signinputdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(207, 219, 213, 0.6);
  border-radius: 23px;
  padding: 5px 20px;
`;
const Signinputinput = styled.input`
  padding: 10px;
  border: 0;
  font-weight: 700;
  font-size: 14px;
  outline: none;
  width: 90%;
`;
const Signinremem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 12px;
  width: 100%;
`;
const Signinremember = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5d5d5b;
  padding: 0px 10px;
  gap: 5px;
`;
const Signinrememberinput = styled.input`
  color: #5d5d5b;
`;
const Signinrecover = styled.div`
  padding: 0px 10px;
`;
const Signinbutton = styled.button`
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

const Signinsignup = styled(Link)`
  padding: 0 10px;
  text-decoration: none;
  color: #6941c6;
  font-weight: 400;
  font-size: 14px;
`;
export default Signin;
