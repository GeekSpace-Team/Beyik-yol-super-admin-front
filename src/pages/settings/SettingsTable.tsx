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
import SubRegion from "./SubRegion";
import { AxiosInstance } from "../../api/AxiosInstance";
import { Regions } from "../../common/model";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRegion from "./AddRegion";
import UpdateRegion from "./UpdateRegion";
import { showError, showSuccess } from "../../components/alert/Alert";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const SettingsTable = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<Regions[]>([]);

  const getData = async () => {
    await AxiosInstance.get<Regions[]>("/region/get-all-regions")
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

  function deleteRegion(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/region/remove-region/" + id)
        .then((response) => {
          showSuccess(t("Deleted!"));
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
        <title> Beyik Yol | Region Table </title>
      </Helmet>
      <AddRegion getData={getData} />

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
                <Typography sx={TableHeadStyle}>{t("desc")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("edit")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("delete")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("subRegion")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, i) => {
              return (
                <TableRow>
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
                    <Typography sx={TableCellStyle}>
                      {item.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <UpdateRegion getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={t("delete")}>
                      <IconButton
                        onClick={() => deleteRegion(item.id)}
                        sx={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <SubRegion
                      regionId={item.id}
                      subRegion={item.subRegion}
                      getData={getData}
                    />
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

export default SettingsTable;
