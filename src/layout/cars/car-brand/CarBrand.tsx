import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Paper,
  Stack,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Color,
  Fonts,
  TableCellStyle,
  TableHeadStyle,
} from "../../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import Image from "@jy95/material-ui-image";
import InfoIcon from "@mui/icons-material/Info";
import AddBrand from "./AddBrand";
import UpdateBrand from "./UpdateBrand";
import AddModel from "./AddModel";
import UpdateModel from "./UpdateModel";
import DeleteModel from "./DeleteModel";
import { AxiosInstance } from "../../../api/AxiosInstance";
import { getImageUrl, ImageType } from "../../../common/utils";
import { Brand, Model } from "../../../common/model";
import DeleteIcon from "@mui/icons-material/Delete";
import { showError, showSuccess } from "../../../components/alert/Alert";

type Anchor = "top" | "left" | "bottom" | "right";
const CarBrand = () => {
  const [listt, setList] = useState<Brand[]>([]);
  const [listModel, setListModel] = useState<Model[]>([]);

  const getData = async () => {
    await AxiosInstance.get<Model[]>("/car-model/get-all-models")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setListModel(response.data);
        }
      })
      .catch((error) => {
        alert(error + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getCars = async () => {
    await AxiosInstance.get<Brand[]>("/car-brand/get-all-carBrand")
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
    getCars();
  }, []);

  function deleteCarBrand(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/car-brand/remove-car-brand/" + id)
        .then((response) => {
          showSuccess(t("Deleted!"));
          // setLoading(false);
          getCars();
        })
        .catch((err) => {
          // setLoading(false);
          showError(err.toString());
        });
    }
  }

  const { t } = useTranslation();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 500, p: 5 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        pb={3}
        alignItems="center"
      >
        <Typography sx={{ fontFamily: Fonts.RalewayBold, fontSize: "18px" }}>
          Car Model
        </Typography>
        <AddModel />
      </Stack>
      {listModel.map((item, i) => {
        return (
          <Card key={`car_model_get_key${i}`}>
            <CardActionArea>
              <CardContent>
                <Stack direction="row" pb={2} spacing={10}>
                  <Typography sx={{ fontFamily: Fonts.OpenSansBold }}>
                    {item.id}
                  </Typography>
                  <Typography sx={{ fontFamily: Fonts.OpenSansBold }}>
                    {item.name}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: Fonts.OpenSansMedium,
                    color: Color.solid,
                  }}
                >
                  {item.description}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems="center"
                  pt={2}
                >
                  <Stack>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: Color.solid,
                        fontFamily: Fonts.OpenSansRegular,
                      }}
                    >
                      Status
                    </Typography>
                    <Typography
                      sx={{ fontSize: "15px", fontFamily: Fonts.RalewayBold }}
                    >
                      {item.status}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems={"center"} spacing={2}>
                    <UpdateModel />
                    <DeleteModel />
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
  return (
    <>
      <div>
        <React.Fragment key={"right"}>
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", true)}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
      <Stack direction="row" pb={3} justifyContent={"flex-end"}>
        <AddBrand getCars={getCars} />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Name</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Image</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Description</Typography>
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
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Model</Typography>
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
                    <UpdateBrand getCars={getCars} item={item} />
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
                    <Tooltip title="Car Model">
                      <IconButton onClick={toggleDrawer("right", true)}>
                        <InfoIcon />
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

export default CarBrand;
