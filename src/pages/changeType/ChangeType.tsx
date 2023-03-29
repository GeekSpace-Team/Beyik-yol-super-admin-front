import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AxiosInstance } from "../../api/AxiosInstance";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { TableCellStyle, TableHeadStyle } from "../../assets/theme/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import { showError, showSuccess } from "../../components/alert/Alert";
import AddChangeType from "./AddChangeType";
import UpdateChangeType from "./UpdateChangeType";
import { AppContext } from "../../App";
import { Helmet } from "react-helmet-async";

export interface ChangeTypeI {
  id: number;
  name_tm: string;
  name_ru: string;
}

const ChangeType = () => {
  const { t } = useContext(AppContext);
  const [list, setList] = useState<ChangeTypeI[]>([]);

  const getData = async () => {
    await AxiosInstance.get<ChangeTypeI[]>("/change-type/find-all-change-types")
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

  function deleteChangeType(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/change-type/delete-change-type/" + id)
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
        <title> Beyik Yol | Change - Type Table </title>
      </Helmet>
      <AddChangeType getData={getData} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("nameTm")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("nameRu")}</Typography>
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
                <TableRow key={`get_change_type_key${i}`}>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.name_tm}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.name_ru}</Typography>
                  </TableCell>

                  <TableCell>
                    <UpdateChangeType getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={t("delete")}>
                      <IconButton
                        onClick={() => deleteChangeType(item.id)}
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

export default ChangeType;
