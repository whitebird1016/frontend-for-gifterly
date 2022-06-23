import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

import { gapi } from "gapi-script";
import facebook from "../../../assets/images/facebook.png";
import google from "../../../assets/images/google.png";
import twitter from "../../../assets/images/twitter.png";

import styled from "styled-components";
const Sociallogin = () => {
  const onSuccess = (response) => {
    console.log("SUCCESS", response.profileObj.email);
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GG_APP_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  return (
    <Signinicongroup>
      <GoogleLogin
        clientId={process.env.REACT_APP_GG_APP_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        icon={false}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            style={{
              backgroundImage: `url(${google})`,
              width: "50px",
              height: "50px",
              border: "none",
              backgroundColor: "white",
              outline: "none",
            }}
          ></button>
        )}
      />
      <FacebookLogin
        appId="586726569385766"
        fields="name,email,picture"
        autoLoad={true}
        onClick={responseFacebook}
        callback={responseFacebook}
        textButton={""}
        buttonStyle={{
          backgroundImage: `url(${facebook})`,
          width: "50px",
          height: "50px",
          border: "none",
          backgroundColor: "white",
          outline: "none",
        }}
      />
      <img src={twitter} alt="twitter" />
    </Signinicongroup>
  );
};
const Signinicongroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;
export default Sociallogin;
