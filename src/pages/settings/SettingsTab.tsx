import React, { useContext, useState } from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { indicatorTable, TabsStyle, TabStyle } from "../../assets/theme/theme";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import SettingsTable from "./SettingsTable";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Evacuator from "../evacuator/Evacuator";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import Price from "../price/Price";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ChangeType from "../changeType/ChangeType";
import { AppContext } from "../../App";

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
              icon={<LocationOnIcon />}
              sx={{ ...TabStyle, height: "20px" }}
              label={t("region")}
              {...a11yProps(0)}
            />
            <Tab
              iconPosition="start"
              icon={<CarRepairIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label={t("evacuator")}
              {...a11yProps(1)}
            />
            <Tab
              iconPosition="start"
              icon={<LocalGasStationIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label={t("price")}
              {...a11yProps(1)}
            />
            <Tab
              iconPosition="start"
              icon={<ManageHistoryIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label={t("changeType")}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <SettingsTable />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Evacuator />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Price />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <ChangeType />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};

const SettingsTab = () => {
  return (
    <div>
      <Stack>
        <AnimationTab />
      </Stack>
    </div>
  );
};

export default SettingsTab;
