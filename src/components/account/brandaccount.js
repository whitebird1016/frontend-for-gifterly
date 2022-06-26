import styled from "styled-components";
import React, { useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Background from "../../assets/images/Image.png";
import Avatar from "../../assets/images/Avatar profile photo.png";
import { TbMail, TbPhone } from "react-icons/tb";
import Button from "../button";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Inputtag from "../input";
import { toast } from "react-toastify";
const Brandaccount = () => {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const updated_data = new FormData();
    updated_data.append("username", name);
    updated_data.append("phone", phone);

    if (file !== "") {
      updated_data.append("logoimage", file);
    }

    try {
      await axios.put(
        process.env.REACT_APP_API + "/api/users/" + user?._id,
        updated_data,
        config
      );
      const result = await axios.get(
        process.env.REACT_APP_API + "/api/users/" + user?._id
      );
      const data = JSON.stringify(result.data);
      localStorage.setItem("user", data);
      toast("success");
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  return (
    <Wrapper>
      <Wrapperimage />
      <img src={user?.photo ? user?.photo : Avatar} alt="Avatar" />
      <Wrappercontent>
        <Wrappercontentinput>
          <Inputwrapper1>
            <Inputtag
              text="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="please input your first name"
            />
            <Inputtag
              text="Last name"
              onChange={(e) => setName(e.target.value)}
              placeholder="please input your last name"
            />
          </Inputwrapper1>
          <Inputtag
            text="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disable={true}
          >
            <TbMail />
          </Inputtag>
          <Inputtag
            text="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="please input your phonenumber"
          >
            <TbPhone />
          </Inputtag>
          <Inputcontent2>
            <Inputlabel> Payment method</Inputlabel>
            <Inputwrapper1>
              <Button text="Update Card" color="#B224EF" width="175px" />
              <Button
                text="Delete Card"
                fcolor="black"
                color="white"
                border="1px solid #B224EF;"
                width="175px"
              />
            </Inputwrapper1>
          </Inputcontent2>
          <Inputcontent2>
            <Inputlabel> Current Package : Basic ($99/Month)</Inputlabel>
            <Button text="Change Package" color="#B224EF" width="175px" />
          </Inputcontent2>
          <Inputcontent2>
            <Inputlabel> Logo Upload</Inputlabel>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </Inputcontent2>
          <Inputcontent3>
            <Button
              text="Cancel"
              color="#ffffff"
              fcolor="#000000"
              border="1px solid #B224EF;"
              width="170px"
            />
            <Button
              text="Save Changes"
              color="#B224EF"
              width="170px"
              onClick={handleSubmit}
            />
          </Inputcontent3>
        </Wrappercontentinput>
      </Wrappercontent>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  img {
    margin-top: -60px;
    margin-right: 65%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    object-fit: cover;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1000px) {
    img {
      width: 80px;
      height: 80px;
      margin-top: -50px;
    }
  }
`;
const Wrapperimage = styled.div`
  background-image: url(${Background});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 150px;
  width: 100%;
  @media screen and (max-width: 1000px) {
    height: 100px;
  }
  gap: 10px;
`;
const Wrappercontent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Wrappercontentinput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 20px;
  margin: 0px 200px;
  background-color: white;
  @media screen and (max-width: 1000px) {
    margin: 10px;
  }
`;
const Inputwrapper1 = styled.div`
  display: flex;
  gap: 10px;
`;

const Inputcontent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Inputcontent2 = styled(Inputcontent)`
  width: 100%;
`;
const Inputcontent3 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;
`;
const Inputlabel = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

export default Brandaccount;
