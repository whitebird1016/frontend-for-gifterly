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
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthContext";
import ImgSize from "../imgsize";
import "../../assets/css/campaign.css";
import loading from "../../assets/images/loading1.gif";
import avatar from "../../assets/images/Logo.jpg";

import { CheckboxGroup, Checkbox } from "@createnl/grouped-checkboxes";

const columns = [
  {
    id: "name",
    label: "Campaign",
  },
  {
    id: "logoimage",
    label: "Logo",
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
    id: "information",
    label: "Infomation",
  },
  {
    id: "trakingnumber",
    label: "Traking Number",
  },
  {
    id: "status",
    label: "Status",
  },
];

const Wrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CampaignTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [onChange, setOnChange] = useState({});
  const [campaign, setCampaign] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlechange = async (iduser) => {
    try {
      const users = { _id: iduser, taskoflist: onChange };
      await axios
        .post(process.env.REACT_APP_API + "/api/incampaign/updatelist", users)
        .then((res) => setCampaign(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const allcampaign = async () => {
    try {
      const userid = { userid: user._id };
      await axios
        .post(
          process.env.REACT_APP_API + "/api/incampaign/allincampaign",
          userid
        )
        .then((res) => {
          setCampaign(res.data);
          Checktrack(res.data);
        });
    } catch (err) {
      console.log(err, "err");
    }
  };

  const Checktrack = async (productss) => {
    console.log(productss);
    if (productss.length !== 0) {
      productss.map(async (item) => {
        if (item.orderid !== "") {
          const orderid = { orderid: item.orderid, _id: item._id };
          await axios.post(
            process.env.REACT_APP_API + "/api/incampaign/tracking",
            orderid
          );
        } else {
          console.log("false");
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      allcampaign();
    }, 2000);
  }, []);
  console.log(campaign);
  return (
    <>
      {isLoaded && (
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
          <TableContainer sx={{ maxHeigt: "100%" }}>
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
                          <ImgSize
                            url={row.logoimage ? row.logoimage : avatar}
                            key={i}
                          />
                        </TableCell>
                        <TableCell>
                          <ImgSize url={row.gift[0].image} key={i} />
                        </TableCell>
                        <TableCell>
                          <ol>
                            <CheckboxGroup
                              onChange={setOnChange}
                              defaultChecked
                            >
                              {row.taskoflist.map((item, i) => (
                                <li key={i}>
                                  <label>
                                    <Checkbox
                                      text={item.text}
                                      checked={
                                        item.checked ? item.checked : false
                                      }
                                    />
                                    <span>{item.text}</span>
                                  </label>
                                </li>
                              ))}
                            </CheckboxGroup>
                          </ol>
                          <p onClick={() => handlechange(row._id)}>Update</p>
                        </TableCell>
                        <TableCell>{row.information}</TableCell>
                        <TableCell>{row.trakingnumber}</TableCell>
                        <TableCell>{row.status}</TableCell>
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
      )}
      {!isLoaded && (
        <Wrapp>
          <ImgSize url={loading} width="300px" height="300px" />
        </Wrapp>
      )}
    </>
  );
}
