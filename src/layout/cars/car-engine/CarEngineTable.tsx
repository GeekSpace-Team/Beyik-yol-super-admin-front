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

const CarEngineTable = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<Engine[]>([]);

  const getData = async () => {
    await AxiosInstance.get<Engine[]>("/car-engine/get-all-car-engine")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setList(response.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteCarOption(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/car-engine/delete-car-engine/" + id)
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
                <Typography sx={TableHeadStyle}>Name TM</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Name RU</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Description</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Brand</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
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
                    <Typography sx={TableCellStyle}>
                      {t(item.status)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.status}</Typography>
                  </TableCell>
                  <TableCell>
                    <UpdateEngine getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color={"error"}
                      onClick={() => deleteCarOption(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
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

export default CarEngineTable;
