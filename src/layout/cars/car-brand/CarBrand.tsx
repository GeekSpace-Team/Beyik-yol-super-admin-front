import AddBrand from "./AddBrand";
import Box from "@mui/material/Box";
import CarModel from "./CarModel";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "@jy95/material-ui-image";
import Loading from "../../../common/Loading";
import React, { useContext, useEffect, useState } from "react";
import UpdateBrand from "./UpdateBrand";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AppContext } from "../../../App";
import { AxiosInstance } from "../../../api/AxiosInstance";
import { TableCellStyle, TableHeadStyle } from "../../../assets/theme/theme";
import { Brand } from "../../../common/model";
import { ImageType, getImageUrl } from "../../../common/utils";
import { showError, showSuccess } from "../../../components/alert/Alert";

import {
  Button,
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
import { Helmet } from "react-helmet-async";

const CarBrand = () => {
  const { t } = useContext(AppContext);
  const [listt, setList] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await AxiosInstance.get<Brand[]>("/car-brand/get-all-carBrand")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList(resp.data);
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

  function deleteCarBrand(id: number) {
    setLoading(true);
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/car-brand/remove-car-brand/" + id)
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: t("user_name"),
      width: 150,
      editable: true,
    },
    {
      field: "image",
      headerName: t("image"),
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: t("desc"),
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "status",
      headerName: t("status"),
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: t("edit"),
      renderCell: (cellValues) => {
        return <UpdateBrand getData={getData} item={cellValues.row} />;
      },
    },
    {
      field: t("delete"),
      renderCell: (cellValues) => {
        return (
          <IconButton
            color={"error"}
            onClick={() => deleteCarBrand(cellValues.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
    {
      field: t("carModel"),
      renderCell: (cellValues) => {
        return <CarModel brandId={cellValues.row.id} getData={getData} />;
      },
    },
  ];

  return (
    <>
      <Helmet>
        <title> Beyik Yol | Car Brand Table </title>
      </Helmet>
      <Stack direction="row" pb={3} justifyContent={"flex-end"}>
        <AddBrand getData={getData} />
      </Stack>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={listt}
          columns={columns}
          autoPageSize
          pagination
          pageSizeOptions={[20]}
          checkboxSelection
        />
      </Box>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("user_name")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("image")}</Typography>
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
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("carModel")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listt.map((item, i) => {
              return (
                <TableRow key={`get_all_brands_key${i}`}>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Image src={getImageUrl(item.image, ImageType.Brand)} />
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
                    <UpdateBrand getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color={"error"}
                      onClick={() => deleteCarBrand(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <CarModel
                      brandId={item.id}
                      models={item.models}
                      getData={getData}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Loading open={loading} />
    </>
  );
};

export default CarBrand;
