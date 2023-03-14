import React, { FC, useContext, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Image from "@jy95/material-ui-image";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TuneIcon from "@mui/icons-material/Tune";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Backdrop,
  Tab,
  Tabs,
  Box,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import {
  Color,
  indicatorTable,
  PageName,
  TabsStyle,
  TableCellStyle,
  TableHeadStyle,
  TabStyle,
  littleText,
  carIdName,
  ButtonStyle,
} from "../../assets/theme/theme";
import { Tooltip } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import AddCar from "../../layout/cars/car/AddCar";
import CarEngineTable from "../../layout/cars/car-engine/CarEngineTable";
import CarOptionTable from "../../layout/cars/car-option/CarOptionTable";
import CarBrand from "../../layout/cars/car-brand/CarBrand";
// import UpdateCar from "../../layout/cars/car/UpdateCar";
import CarTransmitionTable from "../../layout/cars/car-transmition/CarTransmitionTable";
import { AxiosInstance } from "../../api/AxiosInstance";
import { AllCars } from "../../common/model";
import { convertToDate, getImageUrl, ImageType } from "../../common/utils";
import { showError, showSuccess } from "../../components/alert/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../common/Loading";
import { AppContext } from "../../App";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "@mui/material/Card";
import ReactToPrint from "react-to-print";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import PrintIcon from "@mui/icons-material/Print";

// const CarFilterModal = () => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [valueE, setValueE] = useState<any[]>([]);

//   return (
//     <>
//       <Tooltip title="Filterlemek">
//         <IconButton onClick={handleOpen}>
//           <TuneIcon />
//         </IconButton>
//       </Tooltip>

//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={deleteStyle}>
//             <PhoneInput
//               style={{ height: "40px" }}
//               defaultCountry="TM"
//               className="phoneNumberInput"
//               values={valueE}
//               onChange={(any) => setValueE([any])}
//             />
//           </Box>
//         </Fade>
//       </Modal>
//     </>
//   );
// };

// General Cars Tab section starts here ...............................................................

const CarTable = () => {
  const { t } = useContext(AppContext);
  const [list, setList] = useState<AllCars[]>([]);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await AxiosInstance.get<AllCars[]>("/cars/get-all-cars")
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

  function deleteCar(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/cars/delete-car/" + id)
        .then((response) => {
          showSuccess("Deleted!");
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
      <Stack pb={3} direction="row" spacing={3} justifyContent={"flex-end"}>
        {/* <CarFilterModal /> */}
        <AddCar getData={getData} />
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
                <Typography sx={TableHeadStyle}>{t("carModel")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("status")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("carYear")}</Typography>
              </TableCell>
              {/* <TableCell>
                <Typography sx={TableHeadStyle}>{t("edit")}</Typography>
              </TableCell> */}
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("delete")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>More</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, i) => {
              return (
                <TableRow key={`get_cars_key${i}`}>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={
                        item.images && item.images.length > 0
                          ? getImageUrl(item.images[0].url, ImageType.Car)
                          : ""
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>
                      {item.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.status}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>
                      {convertToDate(item.createdAt)}
                    </Typography>
                  </TableCell>
                  {/* <TableCell>
                    <UpdateCar getData={getData} item={item} />
                  </TableCell> */}
                  <TableCell>
                    <IconButton
                      color={"error"}
                      onClick={() => deleteCar(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Link to={"/cars/" + item.id}>
                      <Tooltip title="full info">
                        <IconButton sx={{ color: Color.secondaryDark }}>
                          <ArrowRightAltIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
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

// Car Table Full Information section starts here ......................................................
export const CarTableInfo = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const [listById, setListById] = useState<AllCars>();

  const getCarById = async () => {
    setLoading(true);
    await AxiosInstance.get<AllCars>(`/cars/get-car-by-id/${id}`)
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setListById(resp.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err + "");
      });
  };

  useEffect(() => {
    getCarById();
  }, []);
  const componentRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Box sx={{ p: 5 }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
          pb={3}
        >
          <Stack direction={"row"} spacing={3}>
            <Link to="/cars">
              <Tooltip title="Come Back!">
                <IconButton sx={{ color: Color.secondaryDark }}>
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Typography sx={PageName}>Full Information Table</Typography>
          </Stack>
          <ReactToPrint
            trigger={() => (
              <Button
                sx={ButtonStyle}
                startIcon={<PrintIcon />}
                variant="contained"
              >
                Print Information
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Stack>
        <Divider />
        <div ref={componentRef}>
          <Grid container mt={2}>
            <Grid item lg={3}>
              <Stack direction="row" mb={3} justifyContent={"center"}>
                <Typography sx={PageName}>Car Images</Typography>
              </Stack>
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
              >
                {listById?.images
                  ? listById?.images.map((item, i) => {
                      return (
                        <SwiperSlide key={`get_by_id_car_image_key${i}`}>
                          <Card sx={{ width: "90%" }}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="270"
                                image={getImageUrl(item.url, ImageType.Car)}
                                alt="green iguana"
                              />
                            </CardActionArea>
                          </Card>
                        </SwiperSlide>
                      );
                    })
                  : null}
              </Swiper>
            </Grid>
            <Grid item lg={1}></Grid>
            <Grid item lg={8}>
              <Stack direction="row" justifyContent={"center"}>
                <Typography sx={PageName}>Umumy Maglumatlar</Typography>
              </Stack>

              {listById ? (
                <Grid container mt={3}>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Name</Typography>
                      <Typography sx={carIdName}>{listById.name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Status</Typography>
                      <Typography sx={carIdName}>{listById.status}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Model</Typography>
                      <Typography sx={carIdName}>
                        {listById.carModel.name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Option</Typography>
                      <Typography sx={carIdName}>
                        {listById.carOption.name_tm}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Engine</Typography>
                      <Typography sx={carIdName}>
                        {listById.carEngineType.name_tm}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Engine Power</Typography>
                      <Typography sx={carIdName}>
                        {listById.enginePower}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Transmition</Typography>
                      <Typography sx={carIdName}>
                        {listById.carTransmition.name_tm}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Year</Typography>
                      <Typography sx={carIdName}>{listById.year}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Last Mile</Typography>
                      <Typography sx={carIdName}>
                        {listById.lastMile}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Vin Code</Typography>
                      <Typography sx={carIdName}>{listById.vinCode}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Phone Number</Typography>
                      <Typography sx={carIdName}>
                        {listById.phoneNumber}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>Created At</Typography>
                      <Typography sx={carIdName}>
                        {convertToDate(listById.createdAt)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>User Name</Typography>
                      <Typography sx={carIdName}>
                        {listById.users.fullname}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};
// Car Table Full Information section ends here ........................................................

// General Cars Tab section ends here ........................................................

// Tabs style section starts here ..............................................................
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const AnimationTab = () => {
  const { t } = useContext(AppContext);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          position: "relative",
          minHeight: 200,
          border: "1px solid #fff",
          background: "#fff",
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
          position="static"
          color="default"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            orientation="horizontal"
            scrollButtons="auto"
            variant="scrollable"
            textColor="primary"
            aria-label="action tabs example"
            TabIndicatorProps={{
              sx: {
                ...indicatorTable,
              },
            }}
            sx={{
              ...TabsStyle,
            }}
          >
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px" }}
              label={t("car")}
              {...a11yProps(0)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label={t("carBrand")}
              {...a11yProps(1)}
            />

            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label={t("carOption")}
              {...a11yProps(2)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label={t("carEngine")}
              {...a11yProps(2)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label={t("carTransmition")}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <CarTable />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CarBrand />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <CarOptionTable />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <CarEngineTable />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <CarTransmitionTable />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};
// Tabs style section ends here ..............................................................

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "#ffffff",
  border: "2px solid transparent",
  boxShadow: 24,
  borderRadius: "3px",
  p: 4,
};

export const addCarStyle = {
  position: "absolute" as "absolute",
  width: "100%",
  height: "100%",
  bgcolor: "#ffffff",
  border: "2px solid transparent",
  boxShadow: 24,
  borderRadius: "3px",
  p: 4,
};

export const deleteStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "#ffffff",
  border: "2px solid transparent",
  boxShadow: 24,
  borderRadius: "3px",
  p: 4,
};

const Cars: FC = () => {
  const { t } = useTranslation();
  const smallScreen = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <Stack
        direction="row"
        alignItems={"center"}
        pb={3}
        justifyContent={"space-between"}
      >
        <Typography sx={PageName}>{t("car")}</Typography>
      </Stack>
      <AnimationTab />
    </>
  );
};

export default Cars;
