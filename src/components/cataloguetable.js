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
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import ImgSize from "./imgsize";
import { AuthContext } from "../Context/AuthContext";
import loading from "../assets/images/loading1.gif";
import styled from "styled-components";

const columns = [
  { id: "sku", label: "SKU" },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "image",
    label: "Image",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "option",
    label: "Option",
  },
];
const CatalogueTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [delected, setDelected] = useState(false);
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const Deleteproduct = async (product_id) => {
    const productid = { _id: product_id };
    try {
      await axios
        .post("/api/catalogue/deleteproduct", productid)
        .then((res) => {
          setDelected(!delected);
          toast(res);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const Editproduct = async (productid) => {
    console.log(productid);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const allproduct = async () => {
    try {
      const userid = { userid: user._id };
      await axios.post("/api/catalogue/allproduct", userid).then((res) => {
        setProducts(res.data);
      });
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
    <>
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
                      <TableCell>{row.sku}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <ImgSize url={row.image} />
                      </TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <FaRegEdit onClick={() => Editproduct(row._id)} />
                          <FaRegTrashAlt
                            onClick={() => {
                              Deleteproduct(row._id);
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 100]}
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
    </>
  );
};
const Wrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default CatalogueTable;
