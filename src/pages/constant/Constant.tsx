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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxiosInstance } from "../../api/AxiosInstance";
import {
  PageName,
  TableCellStyle,
  TableHeadStyle,
} from "../../assets/theme/theme";
import { ConstantI } from "../../common/model";
import { showError, showSuccess } from "../../components/alert/Alert";
import AddConstant from "../../layout/constant/AddConstant";
import UpdateConstant from "../../layout/constant/UpdateConstant";
import DeleteIcon from "@mui/icons-material/Delete";
import { Helmet } from "react-helmet-async";

const Constant = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<ConstantI[]>([]);

  const getData = async () => {
    await AxiosInstance.get<ConstantI[]>("/constant/get-all-constants")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList(resp.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteConstant(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/constant/delete-constant/" + id)
        .then((response) => {
          showSuccess(t("Deleted!"));
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
        <title> Beyik Yol | Constant Table </title>
      </Helmet>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
        pb={3}
      >
        <Typography sx={PageName}>{t("constant")}</Typography>
        <AddConstant getData={getData} />
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
                <TableRow key={`get_constant_key${i}`}>
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
                    <UpdateConstant getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={t("delete")}>
                      <IconButton
                        onClick={() => deleteConstant(item.id)}
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

export default Constant;
