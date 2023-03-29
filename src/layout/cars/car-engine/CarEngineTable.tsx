import React, { useEffect, useState } from "react";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { TableCellStyle, TableHeadStyle } from "../../../assets/theme/theme";
import { AxiosInstance } from "../../../api/AxiosInstance";
import { Engine } from "../../../common/model";
import { useTranslation } from "react-i18next";
import { showError, showSuccess } from "../../../components/alert/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateEngine from "./UpdateEngine";
import AddEngine from "./AddEngine";
import Loading from "../../../common/Loading";
import { Helmet } from "react-helmet-async";

const CarEngineTable = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<Engine[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await AxiosInstance.get<Engine[]>("/car-engine/get-all-car-engine")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setList(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteCarOption(id: number) {
    setLoading(true);
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/car-engine/delete-car-engine/" + id)
        .then((response) => {
          showSuccess(t("Deleted!"));
          setLoading(false);
          getData();
        })
        .catch((err) => {
          setLoading(false);
          showError(err.toString());
        });
    }
  }

  return (
    <>
      <Helmet>
        <title> Beyik Yol | Car Engine Table </title>
      </Helmet>
      <Stack direction="row" pb={3} justifyContent={"flex-end"}>
        <AddEngine getData={getData} />
      </Stack>
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
                <Typography sx={TableHeadStyle}>{t("nameTm")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("desc")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("status")}</Typography>
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
                <TableRow key={`car_option_key${i}`}>
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
                    <Typography sx={TableCellStyle}>{item.status}</Typography>
                  </TableCell>
                  <TableCell>
                    <UpdateEngine getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={t("delete")}>
                      <IconButton
                        color={"error"}
                        onClick={() => deleteCarOption(item.id)}
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
      <Loading open={loading} />
    </>
  );
};

export default CarEngineTable;
