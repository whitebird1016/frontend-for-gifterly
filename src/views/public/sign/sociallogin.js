import React, { useEffect, useState, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { gapi } from "gapi-script";
import facebook from "../../../assets/images/facebook.png";
import google from "../../../assets/images/google.png";
import twitter from "../../../assets/images/twitter.png";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-toastify";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../../../components/button";
import { useHistory } from "react-router-dom";
import ButtonGroup from "../../../components/radiogroup";
import { AuthContext } from "../../../Context/AuthContext";

const RadioOptions = [
  { name: "I am a Brand", value: "brand", default: true },
  { name: "I am an Influencer", value: "influencer" },
];

const Sociallogin = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userimage, setUserimage] = useState("");
  const [isbrand, setIsbrand] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        process.env.REACT_APP_API + "/api/auth/signin",
        userCredential
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast("Login Success");
      history.push("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSuccess = (response) => {
    const emails = response.profileObj.email;
    loginCall({ emails, password }, dispatch);
    setEmail(response.profileObj.email);
    setUsername(response.profileObj.name);
    setUserimage(response.profileObj.imageUrl);
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  const responseFacebook = (response) => {
    const emails = response.email;
    loginCall({ emails, password }, dispatch);
    setEmail(response.email);
    setUsername(response.name);
    setUserimage(response.picture.data.url);
  };
  const handlechange = () => {
    setIsbrand(!isbrand);
  };
  const handleForm = async (e) => {
    setOpen(false);
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      photo: userimage,
      isBrand: isbrand,
    };
    try {
      await axios
        .post(process.env.REACT_APP_API + "/api/auth/signup", data)
        .then(() => loginCall({ email, password }, dispatch));
    } catch (err) {
      toast(err.response.data);
    }
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose Your Role</DialogTitle>
        <Sign>
          <ButtonGroup
            onChange={handlechange}
            options={RadioOptions}
            name="brand"
          />
        </Sign>
        <DialogActions>
          <Button onClick={handleForm} text="Submit" />
          <Button onClick={handleClose} text="Close" />
        </DialogActions>
      </Dialog>
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
        appId={process.env.REACT_APP_FB_APP_ID}
        fields="name,email,picture"
        autoLoad={true}
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
const Sign = styled.div`
  width: 500px;
`;
export default Sociallogin;
