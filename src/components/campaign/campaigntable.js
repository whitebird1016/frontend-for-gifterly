import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import NoPage from "../../views/public/404page";
import nodata from "../../assets/images/nodata.jpg";
import styled from "styled-components";
import Button from "../button";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import Inputtag from "../input";
import ReactFlagsSelect from "react-flags-select";
import { MultiSelect } from "react-multi-select-component";
import ImgSize from "../imgsize";
import { MdOutlineCampaign } from "react-icons/md";
import { WithContext as ReactTags } from "react-tag-input";
import "../../assets/css/campaign.css";
import { Modal } from "@mui/material";
import { PUBLIC_CAMPAIGNS } from "../../configs/router-config";

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "gift",
    label: "Gift",
  },
  {
    id: "taskoflist",
    label: "Task of list",
  },
  {
    id: "country",
    label: "Country",
  },
  {
    id: "url",
    label: "Option",
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;
const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
export default function CampaignTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [campaign, setCampaign] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [campaignname, setCampaignname] = useState("");
  const [gift, setGift] = useState([]);
  const [taskoflist, setTaskoflist] = useState([]);
  const [country, setCountry] = useState("");
  const { user } = useContext(AuthContext);
  const [productadd, setProductadd] = useState([]);
  const [giftlist, setGiftlist] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleDelete = (i) => {
    setTaskoflist(taskoflist.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTaskoflist([...taskoflist, tag]);
  };
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = taskoflist.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTaskoflist(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const allproduct = async () => {
    try {
      const userid = { userid: user._id };
      const res = await axios.post("/api/catalogue/allproduct", userid);
      setProducts(res.data);
      const dropDownValue = res.data.map((response) => ({
        value: response.sku,
        label: response.sku,
        name: response.name,
        image: response.image,
        price: response.price,
        variantid: response.variantid,
      }));
      setGiftlist(dropDownValue);
    } catch (err) {
      console.log(err);
    }
  };
  const allcampaign = async () => {
    try {
      const userid = { userid: user._id };
      const res = await axios.post("/api/campaign/allproduct", userid);
      setCampaign(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      allcampaign();
      allproduct();
    }, 1000);
  }, [productadd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCampaign = {
      campaignname: campaignname,
      gift: gift,
      taskoflist: taskoflist,
      country: country,
      userid: user._id,
      url: "http://app.gifter.ly" + PUBLIC_CAMPAIGNS + "/" + campaignname,
      logoimage: user.logoimage,
    };
    try {
      await axios
        .post("/api/campaign/addproduct", newCampaign)
        .then((res) => setProductadd(res.data));
      toast("Campaign added");
      setIsOpen(false);
    } catch (err) {
      toast(err.response.data);
    }
  };

  return (
    <Wrapper>
      {products.length !== 0 ? (
        <Wrapper>
          <Modal
            open={modalIsOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <WrapperInput>
              <InputContent>
                <Inputtag
                  text="Campaign name"
                  type="text"
                  value={campaignname}
                  onChange={(e) => {
                    setCampaignname(e.target.value);
                  }}
                >
                  <MdOutlineCampaign />
                </Inputtag>
              </InputContent>
              <ReactFlagsSelect
                className="reactflagsselect"
                countries={["US", "GB", "FR", "DE", "IT"]}
                customLabels={{
                  US: "EN-US",
                  GB: "EN-GB",
                  FR: "FR",
                  DE: "DE",
                  IT: "IT",
                }}
                rfsKey="app-lang"
                placeholder="Select Country"
                searchPlaceholder="Search Countries"
                selected={country}
                onSelect={(code) => setCountry(code)}
              />
              <MultiSelect
                options={giftlist}
                value={gift}
                onChange={setGift}
                labelledBy="Select"
                className="multiselect"
              />
              <ReactTags
                tags={taskoflist}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                placeholder="Please input your plan list"
                autocomplete
              />
              <InputContent>
                <Button text="Submit" onClick={handleSubmit} />
                <Button text="Cancel" onClick={() => setIsOpen(false)} />
              </InputContent>
            </WrapperInput>
          </Modal>
          <WrapperButton>
            <Button text="+ Create" onClick={() => setIsOpen(true)} />
          </WrapperButton>
          <Paper
            sx={{
              display: "flex",
              width: "100%",
              overflow: "hidden",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <TableContainer sx={{ maxHeigt: "400px" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, i) => (
                      <TableCell
                        sx={{
                          background: "rgba(235, 240, 240, 0.5)",
                          zIndex: "0",
                        }}
                        key={i}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaign
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            {row.gifts.map((item, i) => (
                              <ImgSize url={item.image} key={i} />
                            ))}
                          </TableCell>
                          <TableCell>
                            {row.taskoflist.map((item, i) => (
                              <div key={i}>
                                {i + 1} : <span>{item.text}</span>
                              </div>
                            ))}
                          </TableCell>
                          <TableCell>
                            <ReactCountryFlag
                              countryCode={row.country}
                              svg
                              style={{
                                width: "3em",
                                height: "3em",
                              }}
                              title={row.country}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ maxWidth: "50px", wordWrap: "break-word" }}
                          >
                            {row.url}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={campaign.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Wrapper>
      ) : (
        <NoPage src={nodata} />
      )}
    </Wrapper>
  );
}
