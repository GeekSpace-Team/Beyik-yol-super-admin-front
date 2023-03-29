import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PriceI } from "../../common/model";
import { AxiosInstance } from "../../api/AxiosInstance";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { TableCellStyle, TableHeadStyle } from "../../assets/theme/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPrice from "./AddPrice";
import UpdatePrice from "./UpdatePrice";
import { showError, showSuccess } from "../../components/alert/Alert";
import { AppContext } from "../../App";
import { Helmet } from "react-helmet-async";

const Price = () => {
  const { t } = useContext(AppContext);
  const [list, setList] = useState<PriceI[]>([]);

  const getData = async () => {
    await AxiosInstance.get<PriceI[]>("/price/get-all-prices")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList(resp.data);
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function deletePrice(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/price/delete-price/" + id)
        .then((response) => {
          showSuccess("Deleted!");
          // setLoading(false);
          getData();
        })
        .catch((err) => {
          // setLoading(false);
          showError(err.toString());
        });
    }
  }

  return (
    <>
      <Helmet>
        <title> Beyik Yol | Price Table </title>
      </Helmet>
      <AddPrice getData={getData} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("fullname")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("type")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("value")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("edit")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("delete")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, i) => {
              return (
                <TableRow key={`get_rice_key${i}`}>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.value}</Typography>
                  </TableCell>
                  <TableCell>
                    <UpdatePrice getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={t("delete")}>
                      <IconButton
                        onClick={() => deletePrice(item.id)}
                        sx={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Price;
