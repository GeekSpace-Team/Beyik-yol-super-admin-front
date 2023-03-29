import "react-phone-number-input/style.css";
import "swiper/css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AddCar from "../../layout/cars/car/AddCar";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CarBrand from "../../layout/cars/car-brand/CarBrand";
import CarEngineTable from "../../layout/cars/car-engine/CarEngineTable";
import CarOptionTable from "../../layout/cars/car-option/CarOptionTable";
import CarTransmitionTable from "../../layout/cars/car-transmition/CarTransmitionTable";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "@jy95/material-ui-image";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Loading from "../../common/Loading";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import Paper from "@mui/material/Paper";
import PrintIcon from "@mui/icons-material/Print";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SwipeableViews from "react-swipeable-views";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Tooltip } from "@material-ui/core";
import { CardActionArea } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Bar, Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../../App";
import { AxiosInstance } from "../../api/AxiosInstance";
import { AllCars, CostType } from "../../common/model";
import { ImageType, convertToDate, getImageUrl } from "../../common/utils";
import { showError, showSuccess } from "../../components/alert/Alert";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  ArcElement,
} from "chart.js";

import {
  Tab,
  Tabs,
  Box,
  IconButton,
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
import { Helmet } from "react-helmet-async";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend
);

// import UpdateCar from "../../layout/cars/car/UpdateCar";

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
      <Helmet>
        <title> Beyik Yol | Car Table </title>
      </Helmet>
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
                <Typography sx={TableHeadStyle}>{t("name")}</Typography>
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
  const { t } = useContext(AppContext);
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

  function getLengthByType(type: string): number {
    return listById
      ? listById?.costChange.filter((it) => it.costType === type).length
      : 0;
  }

  const data = {
    labels: [CostType.CHANGE, CostType.FUEL, CostType.REPAIR],
    datasets: [
      {
        label: "# of costs",
        data: [
          getLengthByType(CostType.CHANGE),
          getLengthByType(CostType.FUEL),
          getLengthByType(CostType.REPAIR),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Statistics by month",
      },
    },
  };

  const labels = listById
    ? listById?.costChange
        .map((it) => {
          let date = new Date(it.createdAt.toString());
          let t = `${date.getFullYear()}-${date.getMonth() + 1}`;
          return t;
        })
        .filter((value, index, array) => array.indexOf(value) === index)
    : [];

  function getByTypeAndDate(type: string, d: string): number {
    return listById
      ? listById?.costChange.filter((it) => {
          let date = new Date(it.createdAt.toString());
          let t = `${date.getFullYear()}-${date.getMonth() + 1}`;
          return it.costType === type && t === d;
        }).length
      : 0;
  }

  const data2 = {
    labels: labels,
    datasets: [
      {
        label: CostType.CHANGE,
        data: labels.map((it) => getByTypeAndDate(CostType.CHANGE, it)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: CostType.FUEL,
        data: labels.map((it) => getByTypeAndDate(CostType.FUEL, it)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: CostType.REPAIR,
        data: labels.map((it) => getByTypeAndDate(CostType.REPAIR, it)),
        backgroundColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title> Beyik Yol | Car Table Full Information </title>
      </Helmet>
      <Box sx={{ p: 5 }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
          pb={3}
        >
          <Stack direction={"row"} spacing={3}>
            <Link to="/cars">
              <IconButton sx={{ color: Color.secondaryDark }}>
                <Tooltip title={t("comeBack")}>
                  <KeyboardBackspaceIcon />
                </Tooltip>
              </IconButton>
            </Link>
            <Typography sx={PageName}>{t("fullInfoTab")}</Typography>
          </Stack>
          <ReactToPrint
            trigger={() => (
              <Button
                sx={ButtonStyle}
                startIcon={<PrintIcon />}
                variant="contained"
              >
                {t("print")}
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
                <Typography sx={PageName}>{t("carImages")}</Typography>
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
                <Typography sx={PageName}>{t("generalInfo")}</Typography>
              </Stack>

              {listById ? (
                <Grid container mt={3}>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("fullname")}</Typography>
                      <Typography sx={carIdName}>{listById.name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("status")}</Typography>
                      <Typography sx={carIdName}>{listById.status}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("carModel")}</Typography>
                      <Typography sx={carIdName}>
                        {listById.carModel.name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("carOption")}</Typography>
                      <Typography sx={carIdName}>
                        {listById.carOption.name_tm}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("carEngine")}</Typography>
                      <Typography sx={carIdName}>
                        {listById.carEngineType.name_tm}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>
                        {t("enginePower")}
                      </Typography>
                      <Typography sx={carIdName}>
                        {listById.enginePower}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>
                        {t("carTransmition")}
                      </Typography>
                      <Typography sx={carIdName}>
                        {listById.carTransmition.name_tm}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("carYear")}</Typography>
                      <Typography sx={carIdName}>{listById.year}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("lastMile")}</Typography>
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
                      <Typography sx={littleText}>
                        {t("phoneNumber")}
                      </Typography>
                      <Typography sx={carIdName}>
                        {listById.phoneNumber}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("createdAt")}</Typography>
                      <Typography sx={carIdName}>
                        {convertToDate(listById.createdAt)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item lg={4}>
                    <Stack pb={2}>
                      <Typography sx={littleText}>{t("user_name")}</Typography>
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

      <Box sx={{ width: "100%", height: "200px" }}>
        <Pie
          data={data}
          style={{ width: "100%", height: "200px" }}
          height={200}
          width={200}
        />
      </Box>
      <Box sx={{ width: "100%", height: "200px" }}>
        <Bar options={options} data={data2} />
      </Box>
      <h3>Costs</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mile</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Next change mile</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Reminder</TableCell>
              <TableCell align="right">Cost type</TableCell>
              <TableCell align="right">Date/time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listById
              ? listById?.costChange
                  .slice(0)
                  .reverse()
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.mile} km
                      </TableCell>
                      <TableCell align="right">{row.price} TMT</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.nextMile} km</TableCell>
                      <TableCell align="right">{row.volume} litre</TableCell>
                      <TableCell align="right">
                        {row.reminder ? "yes" : "no"}
                      </TableCell>
                      <TableCell align="right">
                        {row.costType}: <br />
                        {row.costType === CostType.FUEL ? (
                          <LocalGasStationIcon />
                        ) : row.costType === CostType.CHANGE ? (
                          <PublishedWithChangesIcon />
                        ) : (
                          <SettingsSuggestIcon />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.createdAt.toString()}
                      </TableCell>
                    </TableRow>
                  ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
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
