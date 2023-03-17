import { FC, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  Color,
  indicatorTable,
  TableCellStyle,
  TableHeadStyle,
  TabsStyle,
  TabStyle,
} from "../../assets/theme/theme";
import { useTranslation } from "react-i18next";

const FirstTable = () => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>User name</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Number</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Model</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car year</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Share</Typography>
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
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>DZ 7777 DZ</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>DZ 7777 DZ</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <IconButton sx={{ color: Color.secondaryDark }}>
                  <ShareIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>DZ 7777 DZ</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>DZ 7777 DZ</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Share">
                  <IconButton sx={{ color: Color.secondaryDark }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

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
            textColor="primary"
            aria-label="action tabs example"
            TabIndicatorProps={{
              sx: { ...indicatorTable },
            }}
            sx={{
              ...TabsStyle,
            }}
          >
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px" }}
              label="Item One"
              {...a11yProps(0)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Item Two"
              {...a11yProps(1)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Item Three"
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
            <FirstTable />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <FirstTable />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <FirstTable />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};

const Costs: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <AnimationTab />
    </div>
  );
};

export default Costs;
