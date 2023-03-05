import React, { useContext, useEffect, useState } from "react";
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
import Image from "@jy95/material-ui-image";
import AddBrand from "./AddBrand";
import UpdateBrand from "./UpdateBrand";
import { AxiosInstance } from "../../../api/AxiosInstance";
import { getImageUrl, ImageType } from "../../../common/utils";
import { Brand } from "../../../common/model";
import DeleteIcon from "@mui/icons-material/Delete";
import { showError, showSuccess } from "../../../components/alert/Alert";
import CarModel from "./CarModel";
import Loading from "../../../common/Loading";
import { AppContext } from "../../../App";

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

  return (
    <>
      <Stack direction="row" pb={3} justifyContent={"flex-end"}>
        <AddBrand getData={getData} />
      </Stack>
      <TableContainer component={Paper}>
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
      </TableContainer>
      <Loading open={loading} />
    </>
  );
};

export default CarBrand;
