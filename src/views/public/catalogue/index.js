import Button from "../../../components/button";
import styled from "styled-components";
import CatalogueTable from "../../../components/cataloguetable";
import { CSVLink } from "react-csv";
import * as React from "react";
import { useState, useRef, useContext } from "react";
import axios from "axios";
import Inputtag from "../../../components/input";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbUser, TbZoomCheck } from "react-icons/tb";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import avatar from "../../../assets/images/noavatar.jpg";
import { Modal } from "@mui/material";
const Catalogue = () => {
  const [transactionData, setTransactionData] = useState([]);
  const csvLink = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [proname, setProname] = useState("");
  const [quantity, setQuantity] = useState([]);
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const getTransactionData = async () => {
    await axios
      .post("/api/catalogue/allproduct")
      .then((res) => {
        setTransactionData(res.data);
      })
      .catch((e) => console.log(e));
    csvLink.current.link.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const newproduct = new FormData();
    newproduct.append("sku", sku);
    newproduct.append("name", proname);
    newproduct.append("quantity", quantity);
    newproduct.append("userid", user._id);

    if (image !== "") {
      newproduct.append("image", image);
    }
    try {
      await axios
        .post("/api/catalogue/addproduct", newproduct, config)
        .then((res) => console(res.data));
      toast("product added");
      setIsOpen(false);
    } catch (err) {
      toast(err.response.data);
    }
  };

  const getShopifyData = async () => {
    try {
      const userid = user._id;
      await axios
        .post("/api/catalogue/addshopify", {
          userid: userid,
        })
        .then((res) => console.log(res));
    } catch (err) {
      toast(err.response.data);
    }
  };
  return (
    <Wrapper>
      <WrapperButton>
        <Button
          text="+ Add Product"
          fcolor="black"
          color="white"
          border="1px solid #B224EF;"
          onClick={() => setIsOpen(true)}
        />
      </WrapperButton>
      <CatalogueTable />
      <WrapperButton>
        <CSVLink
          data={transactionData}
          filename="transactions.csv"
          className="hidden"
          ref={csvLink}
          target="_blank"
        />
        <Button text="CSV" width="150px" onClick={getTransactionData} />
        <Button text="Shopify" width="150px" onClick={getShopifyData} />
        <Button text="Magento" width="150px"></Button>
      </WrapperButton>
      <Modal
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperInput>
          <Imageupload src={avatar} alt="" />
          <Upload
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            name="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <InputContent>
            <Inputtag
              text="SKU"
              type="text"
              value={sku}
              onChange={(e) => {
                setSku(e.target.value);
              }}
            >
              <TbZoomCheck />
            </Inputtag>
            <Inputtag
              text="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              <MdProductionQuantityLimits />
            </Inputtag>
          </InputContent>
          <Inputtag
            text="Name"
            type="text"
            value={proname}
            onChange={(e) => {
              setProname(e.target.value);
            }}
          >
            <TbUser />
          </Inputtag>
          <InputContent>
            <Button text="Submit" onClick={handleSubmit} />
            <Button text="Cancel" onClick={() => setIsOpen(false)} />
          </InputContent>
        </WrapperInput>
      </Modal>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  margin: 20px;
  height: 100%;
`;
const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 10% 40%;
  padding: 50px;
  background-color: white;
`;
const InputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;
const Upload = styled.input`
  color: transparent;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  ::before {
    content: "your product image";
    color: #6941c6;
    display: inline-block;
    padding: 10px 22px;
    outline: none;
    margin: auto;
    width: fit-content;
    -webkit-user-select: none;
    cursor: pointer;
    display: flex;

    font-weight: 600;
    background: #ffffff;
    border: 1px dashed #eaecf0;
    border-radius: 8px;
    outline: none;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
  :focus {
    outline: none !important;
  }
  :active::before {
    transform: scale(0.9) translate(0px, 2px);
    box-shadow: inset 4px 4px 5px 0px rgba(0, 0, 0, 0.2);
  }
`;
const Imageupload = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: flex;
  object-fit: cover;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

export default Catalogue;
