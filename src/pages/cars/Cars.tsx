import React, { FC, useEffect, useState } from "react";
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
} from "@mui/material";
import {
  Color,
  indicatorTable,
  PageName,
  TabsStyle,
  TableCellStyle,
  TableHeadStyle,
  TabStyle,
} from "../../assets/theme/theme";
import { Tooltip } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AddCar from "../../layout/cars/car/AddCar";
import CarEngineTable from "../../layout/cars/car-engine/CarEngineTable";
import CarOptionTable from "../../layout/cars/car-option/CarOptionTable";
import CarBrand from "../../layout/cars/car-brand/CarBrand";
import UpdateCar from "../../layout/cars/car/UpdateCar";
import DeleteCar from "../../layout/cars/car/DeleteCar";
import CarTransmitionTable from "../../layout/cars/car-transmition/CarTransmitionTable";
import { AxiosInstance } from "../../api/AxiosInstance";
import { AllCars, AllCarsImage } from "../../common/model";
import { convertToDate, getImageUrl, ImageType } from "../../common/utils";
import { showError, showSuccess } from "../../components/alert/Alert";
import DeleteIcon from "@mui/icons-material/Delete";

const CarFilterModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [valueE, setValueE] = useState<any[]>([]);

  return (
    <>
      <Tooltip title="Filterlemek">
        <IconButton onClick={handleOpen}>
          <TuneIcon />
        </IconButton>
      </Tooltip>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={deleteStyle}>
            <PhoneInput
              style={{ height: "40px" }}
              defaultCountry="TM"
              className="phoneNumberInput"
              values={valueE}
              onChange={(any) => setValueE([any])}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

// General Cars Tab section starts here ...............................................................

const CarTable = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<AllCars[]>([]);

  const getData = async () => {
    await AxiosInstance.get<AllCars[]>("/cars/get-all-cars")
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

  function deleteCar(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/cars/delete-car/" + id)
        .then((response) => {
          showSuccess("Deleted!");
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
      <Stack pb={3} direction="row" spacing={3} justifyContent={"flex-end"}>
        <CarFilterModal />
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
                <Typography sx={TableHeadStyle}>Image</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Model</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Year</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
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
                  <TableCell>
                    <UpdateCar getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color={"error"}
                      onClick={() => deleteCar(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Link to="/carTable">
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
    </>
  );
};

// Car Table Full Information section starts here ......................................................
export const CarTableInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box sx={{ p: 5 }}>
        <Stack spacing={3} direction="row" alignItems={"center"} pb={3}>
          <Link to="/">
            <Tooltip title="Come Back!">
              <IconButton sx={{ color: Color.secondaryDark }}>
                <KeyboardBackspaceIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Typography sx={PageName}>Full Information Table</Typography>
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
                  <Typography sx={TableHeadStyle}>Image</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Model</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Year</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Option</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Engine Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Transmition</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Phone Number</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Created At</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Updated At</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Users</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography sx={TableCellStyle}>2</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
                </TableCell>
                <TableCell>
                  <Image src="/images/tmFlag.jpg" />
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>BMW X7</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>PENDING</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>2022</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Options</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Engine Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Transmition</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>+99363430338</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>13.12.2022</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>14.12.2023</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Alyyew Shagen</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
              label="Car"
              {...a11yProps(0)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Car Brand"
              {...a11yProps(1)}
            />

            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Car Option"
              {...a11yProps(2)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Car Engine"
              {...a11yProps(2)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Car Transmition"
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
        <Typography sx={PageName}>{t("cars_page")}</Typography>
      </Stack>
      <AnimationTab />
    </>
  );
};

export default Cars;
