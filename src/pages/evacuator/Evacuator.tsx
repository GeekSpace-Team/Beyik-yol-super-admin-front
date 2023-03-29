import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { TableCellStyle, TableHeadStyle } from "../../assets/theme/theme";
import { AxiosInstance } from "../../api/AxiosInstance";
import { EvacuatorI } from "../../common/model";
import DeleteIcon from "@mui/icons-material/Delete";
import { showError, showSuccess } from "../../components/alert/Alert";
import { useTranslation } from "react-i18next";
import AddEvacuator from "./AddEvacuator";
import UpdateEvacuator from "./UpdateEvacuator";
import { Helmet } from "react-helmet-async";

const Evacuator = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<EvacuatorI[]>([]);

  const getData = async () => {
    await AxiosInstance.get<EvacuatorI[]>("/evacuator/get-all-evacuators")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList(resp.data);
        }
      })
      .catch((err) => {
        showError(err.toString());
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteEvacuator(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/evacuator/delete-evacuator/" + id)
        .then((response) => {
          showSuccess(t("Deleted Evacuator!"));
          getData();
        })
        .catch((err) => {
          showError(err.toString());
        });
    }
  }
  return (
    <div>
      <Helmet>
        <title> Beyik Yol | Evacuator Table </title>
      </Helmet>
      <AddEvacuator getData={getData} />

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
                <Typography sx={TableHeadStyle}>{t("phoneNumber")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("desc")}</Typography>
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
                <TableRow key={`evacuator_get_key${i}`}>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>
                      {item.subRegion.name_tm}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>
                      {item.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>
                      {item.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <UpdateEvacuator getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => deleteEvacuator(item.id)}
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
    </div>
  );
};

export default Evacuator;
