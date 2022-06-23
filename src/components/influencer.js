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
import { AuthContext } from "../Context/AuthContext";
import loading from "../assets/images/loading1.gif";
import styled from "styled-components";
import { CheckboxGroup, Checkbox } from "@createnl/grouped-checkboxes";
import ImgSize from "./imgsize";
import Button from "./button";
const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "image",
    label: "Image",
  },
  {
    id: "follower",
    label: "Followers",
  },
  {
    id: "rates",
    label: "Rates",
  },
  {
    id: "campaignname",
    label: "Campaign name",
  },
  {
    id: "selectproduct",
    label: "Product Selected",
  },
  {
    id: "taskoflist",
    label: "Task of list",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "option",
    label: "Option",
  },
];
const InfluencerTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useContext(AuthContext);
  const [onChange, setOnChange] = useState({});
  const [products, setProducts] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const sendorder = async (shopifyproduct) => {
    const shopifyproducts = shopifyproduct;
    try {
      const shopifyproduct = {
        email: user.email,
        phone: user.phone,
        deliveryaddress: user.deliveryaddress,
        deliveryname: user.deliveryname,
        shopifyproduct: shopifyproducts,
      };
      await axios
        .post("/api/incampaign/shopifyorder", shopifyproduct)
        .then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };
  const allproduct = async () => {
    try {
      const userid = { campaignid: user._id };
      const res = await axios.post("/api/incampaign/allincampaign", userid);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      allproduct();
    }, 2000);
  }, []);

  return (
    <Wrapper>
      {isLoaded && (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        backgroundColor: "rgba(235, 240, 240, 0.5)",
                        zIndex: "0",
                      }}
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      <TableCell>{row.influencername}</TableCell>
                      <TableCell>{row.influencerimage}</TableCell>
                      <TableCell>{row.follower}</TableCell>
                      <TableCell>{row.rates}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <ImgSize url={row.gift[0].image} />
                      </TableCell>
                      <TableCell>
                        <ol>
                          <CheckboxGroup onChange={setOnChange}>
                            {row.taskoflist.map((item, i) => (
                              <li key={i}>
                                <label>
                                  <Checkbox
                                    text={item.text}
                                    checked={
                                      item.checked ? item.checked : false
                                    }
                                    disabled={true}
                                  />
                                  <span>{item.text}</span>
                                </label>
                              </li>
                            ))}
                          </CheckboxGroup>
                        </ol>
                      </TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <Button
                          text="Send Shopify"
                          onClick={() => sendorder(row)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {!isLoaded && (
        <Wrapp>
          <ImgSize url={loading} width="300px" height="300px" />
        </Wrapp>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Wrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export default InfluencerTable;
