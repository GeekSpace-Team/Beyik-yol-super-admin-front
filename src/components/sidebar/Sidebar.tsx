import { FC, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Stack, Tab, Tabs, Box, Badge, ListItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
// import LightModeIcon from "@mui/icons-material/LightMode";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
// import NightlightIcon from "@mui/icons-material/Nightlight";
import { useContext } from "react";
import { AppContext } from "../../App";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  ButtonStyle,
  Color,
  Fonts,
  indicatorTable,
  leftSwitch,
  mySwitch,
  rightSwith,
  ruFlag,
  tmFlag,
  toggleRu,
  toggleTm,
  TabsStyle,
  TabStyle,
  TabStyleLg,
  TabsStyleLg,
} from "../../assets/theme/theme";
import i18n from "i18next";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { SidebarItem } from "./sidebarItems";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useTranslation } from "react-i18next";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, pb: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomSwitch = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!value === true) {
      i18n.changeLanguage("ru");
      localStorage.setItem("lng", "ru");
    } else {
      i18n.changeLanguage("tm");
      localStorage.setItem("lng", "tm");
    }
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              sx: { ...indicatorTable },
            }}
            sx={{
              ...TabsStyleLg,
            }}
          >
            <Tab
              iconPosition="start"
              sx={{
                ...TabStyleLg,
                backgroundImage: "url(/images/tmFlag.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "50% 50%",
                backgroundPosition: "center",
                width: "30px",
                height: "20px",
              }}
              {...a11yProps(0)}
            />
            <Tab
              iconPosition="start"
              sx={{
                ...TabStyle,
                backgroundImage: "url(/images/ruFlag.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "50% 50%",
                backgroundPosition: "center",
                width: "30px",
                height: "20px",
              }}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

const MySwitch = () => {
  return (
    <>
      <Box sx={mySwitch}>
        <Box sx={leftSwitch}></Box>
        <Box sx={rightSwith}></Box>
      </Box>
    </>
  );
};

const ToggleButtonM = () => {
  const [value, setValue] = useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <BottomNavigation value={value} onChange={handleChange}>
        <Stack direction={"row"}>
          <BottomNavigationAction value="recents" sx={toggleTm} />
          <BottomNavigationAction value="favorites" sx={toggleRu} />
        </Stack>
      </BottomNavigation>
    </>
  );
};

const SidebarData: SidebarItem[] = [
  {
    id: 1,
    text: "cars",
    link: "/cars",
    icon: <DirectionsCarIcon />,
  },

  {
    id: 2,
    text: "Users",
    link: "/users",
    icon: <GroupIcon />,
  },

  {
    id: 3,
    text: "Ads",
    link: "/ads",
    icon: <WifiPasswordIcon />,
  },

  {
    id: 4,
    text: "Pusher",
    link: "/push",
    icon: <NotificationsIcon />,
  },

  {
    id: 5,
    text: "Inbox",
    link: "/inbox",
    icon: <EmailIcon />,
  },

  {
    id: 6,
    text: "Voices",
    link: "/voices",
    icon: <KeyboardVoiceIcon />,
  },

  {
    id: 7,
    text: "Constant",
    link: "/constant",
    icon: <AcUnitIcon />,
  },

  {
    id: 8,
    text: "Objects",
    link: "/objects",
    icon: <EmojiObjectsIcon />,
  },

  {
    id: 9,
    text: "Client Users",
    link: "/client",
    icon: <Diversity3Icon />,
  },

  {
    id: 10,
    text: "Costs",
    link: "/costs",
    icon: <AttachMoneyIcon />,
  },
];

// Switch language style section starts here .................................................
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('./images/Tm.svg')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('./images/ru.svg')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
// Switch language style section ends here ...................................................

// Avatar section ............................ starts here ...............................
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = Color.primaryLight;

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function splitString(str: string): string {
  try {
    let splited = str.split(" ");
    if (splited.length) {
      return splited.length === 1
        ? splited[0][0]
        : splited.length >= 2
        ? splited[0][0] + "" + splited[1][0]
        : "";
    } else {
      return "";
    }
  } catch (e) {
    return "";
  }
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: "12px",
      width: "30px",
      height: "30px	",
    },
    children: splitString(name.trim()),
  };
}

const AvatarCustom = () => {
  return (
    <>
      <Avatar {...stringAvatar("Gayypow")} />
    </>
  );
};
// Avatar section ............................ ends here .................................

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(Color.transparentBg, 0.45),
  "&:hover": {
    backgroundColor: alpha(Color.transparentBg, 0.95),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "activeColor",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "45ch",
      },
    },
  },
}));

const Sidebar: FC = (props: Props) => {
  const { t } = useTranslation();

  const SearchBar = () => {
    return (
      <>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </>
    );
  };

  const [checked, setChecked] = useState(true);
  useEffect(() => {
    if (!checked === true) {
      i18n.changeLanguage("ru");
      localStorage.setItem("lng", "ru");
    } else {
      i18n.changeLanguage("tm");
      localStorage.setItem("lng", "tm");
    }
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const { isDark, setIsDark, theme } = useContext(AppContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const location = useLocation();
  const navigator = useNavigate();
  const drawer = (
    <div>
      <Toolbar
        sx={{
          background: theme?.palette.common.white,
          color: theme?.palette.common.black,
          position: "fixed",
          width: drawerWidth,
          boxShadow: "1.1px 2.2px 2.2px hsl(0deg 0% 0% / 0.47)",
        }}
      >
        Beyik Yol Logo
      </Toolbar>
      <Divider />

      <Stack
        pt={10}
        sx={{
          overflow: "hidden",
          bgcolor: theme?.palette.background.default,
          minHeight: "100vh",
        }}
      >
        {SidebarData.map((item, i) => {
          let activeColor = theme?.palette.primary.main;
          let passiveColor = theme?.palette.text.secondary;
          let activeStyle = {
            backgroundColor: Color.transparentBg,
          };
          let passiveStyle = {};
          let isActive = item.link === location.pathname;
          return (
            <Stack direction={"row"} spacing={1}>
              {item.link === location.pathname ? (
                <Divider
                  sx={{
                    width: "5px",
                    bgcolor: activeColor,
                  }}
                  orientation={"horizontal"}
                />
              ) : (
                <Box sx={{ width: "5px" }}></Box>
              )}
              <Stack
                direction="row"
                className="link"
                spacing={2}
                pl={2}
                pr={2}
                pt={1}
                pb={1}
                alignItems={"center"}
                id={isActive ? "active" : ""}
                sx={{
                  ...(isActive ? activeStyle : passiveStyle),
                  textDecoration: "none",
                  paddingLeft: "20px",
                  textAlign: "left",
                  cursor: "pointer",
                  width: "93%",
                  borderRadius: "4px",
                  "&:hover": {
                    width: "100%",
                    background: Color.transparentBg,
                  },
                  color:
                    item.link === location.pathname
                      ? activeColor
                      : passiveColor,
                }}
                onClick={() => navigator(item.link)}
              >
                <IconButton
                  sx={{
                    p: 0,
                    color:
                      item.link === location.pathname
                        ? activeColor
                        : passiveColor,
                  }}
                >
                  {item.icon}
                </IconButton>
                <Typography
                  sx={{ fontFamily: Fonts.OpenSansBold, fontSize: "14px" }}
                >
                  {t(item.text)}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
        <Stack pt={3}>
          <Divider>
            <Typography
              sx={{
                fontFamily: Fonts.OpenSansExtraBold,
                color: Color.primary,
                fontSize: "13px",
              }}
            >
              Language
            </Typography>
          </Divider>
        </Stack>
        <Stack
          alignItems="center"
          justifyContent={"center"}
          spacing={2}
          direction="row"
          pt={3}
        >
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          {!checked ? <Box sx={ruFlag}></Box> : <Box sx={tmFlag}></Box>}

          {/* <FormGroup>
            <FormControlLabel
              // checked={checked}
              // onChange={handleChange}
              control={<Android12Switch defaultChecked />}
              label=""
            />
          </FormGroup> */}
        </Stack>
        <Stack pt={2} alignItems="center">
          <CustomSwitch />
          {/* <MySwitch /> */}
          {/* <ToggleButtonM /> */}
        </Stack>
      </Stack>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: theme?.palette.common.white,
            overflow: "hidden",
            color: theme?.palette.common.black,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              justifyContent={"space-between"}
              width="100%"
              direction="row"
            >
              <Stack>
                <SearchBar />
              </Stack>
              <Stack direction={"row"} alignItems="center" spacing={2}>
                {!checked ? <Box sx={ruFlag}></Box> : <Box sx={tmFlag}></Box>}

                <Badge badgeContent={7} color="error">
                  <NotificationsIcon sx={{ color: Color.solid }} />
                </Badge>
                <AvatarCustom />
                <Typography
                  sx={{
                    fontFamily: Fonts.RalewayBold,
                    fontSize: "14px",
                    color: Color.solid,
                  }}
                >
                  Gayypov Halil
                </Typography>
                {/* <IconButton
                  onClick={() => (setIsDark ? setIsDark(!isDark) : {})}
                >
                  {isDark ? <NightlightIcon /> : <LightModeIcon />}
                </IconButton> */}
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: theme?.palette.background.default,
            minHeight: "100vh",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
