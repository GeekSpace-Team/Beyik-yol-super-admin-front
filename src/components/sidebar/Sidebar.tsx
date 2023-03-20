import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import GroupIcon from "@mui/icons-material/Group";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import i18n from "i18next";
import { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { Color, Fonts } from "../../assets/theme/theme";
import { loginChecker } from "../../common/utils";
import { SidebarItem } from "./sidebarItems";

import {
  Avatar,
  Stack,
  Box,
  Badge,
  Tooltip,
  Button,
  Menu,
} from "@mui/material";

const LeftB = {
  width: "60px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  border: "1px solid #008060",
  textAlign: "center",
  color: "#fff",
  borderRight: "1px solid transparent",
  borderRadius: "25px 0px 0px 25px",
  cursor: "pointer",
  background: "#e7e7e7",
};

const RightB = {
  width: "60px",
  height: "35px",
  border: "1px solid #008060",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "0px 25px 25px 0px",
  cursor: "pointer",
  background: "#e7e7e7",
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
    text: "users",
    link: "/users",
    icon: <GroupIcon />,
  },

  {
    id: 3,
    text: "ads",
    link: "/ads",
    icon: <WifiPasswordIcon />,
  },

  {
    id: 4,
    text: "inbox",
    link: "/push",
    icon: <NotificationsIcon />,
  },

  // {
  //   id: 5,
  //   text: "Inbox",
  //   link: "/inbox",
  //   icon: <EmailIcon />,
  // },

  // {
  //   id: 6,
  //   text: "Voices",
  //   link: "/voices",
  //   icon: <KeyboardVoiceIcon />,
  // },

  {
    id: 7,
    text: "constant",
    link: "/constant",
    icon: <AcUnitIcon />,
  },

  // {
  //   id: 8,
  //   text: "Objects",
  //   link: "/objects",
  //   icon: <EmojiObjectsIcon />,
  // },

  // {
  //   id: 9,
  //   text: "Client Users",
  //   link: "/client",
  //   icon: <Diversity3Icon />,
  // },

  // {
  //   id: 10,
  //   text: "Costs",
  //   link: "/costs",
  //   icon: <AttachMoneyIcon />,
  // },
  {
    id: 11,
    text: "settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

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
      <Avatar {...stringAvatar("Admin")} />
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

const Sidebar: FC = (props: Props) => {
  let location = useLocation();

  useEffect(() => {
    loginChecker();
  }, [location]);

  const { t } = useTranslation();

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

  const { theme } = useContext(AppContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigator = useNavigate();

  const [alignment, setAlignment] = useState(true);

  useEffect(() => {
    if (!alignment === true) {
      i18n.changeLanguage("ru");
      localStorage.setItem("lng", "ru");
    } else {
      i18n.changeLanguage("tm");
      localStorage.setItem("lng", "tm");
    }
  }, [alignment]);

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
        <Stack direction="row" alignItems={"center"}>
          <img
            src={"../images/logo.png"}
            style={{ width: "50px" }}
            alt="logo"
          />
          <Typography
            sx={{
              fontFamily: "AppRegular",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Beyik Ýol
          </Typography>
        </Stack>
      </Toolbar>
      {/* <Divider /> */}

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
              {t("lang")}
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
          <Stack direction={"row"} justifyContent={"center"} pt={3}>
            <Tooltip title="Turkmen Language">
              <Box
                sx={{
                  ...LeftB,
                }}
                onClick={(e) => setAlignment(true)}
              >
                <Stack
                  alignItems={"center"}
                  justifyContent="center"
                  pl={1}
                  direction={"row"}
                >
                  <img
                    src="/images/Tm.svg"
                    style={{
                      width: "25px",
                      opacity: alignment === true ? 1 : 0.6,
                    }}
                    alt="TmFlag"
                  />
                </Stack>
              </Box>
            </Tooltip>
            <Tooltip title="Russian Language">
              <Box
                sx={{
                  ...RightB,
                }}
                onClick={(e) => setAlignment(false)}
              >
                <Stack
                  alignItems={"center"}
                  justifyContent="center"
                  pl={3}
                  direction={"row"}
                >
                  <img
                    src="/images/ru.svg"
                    style={{
                      width: "25px",
                      opacity: alignment === false ? 1 : 0.6,
                    }}
                    alt="TmFlag"
                  />
                </Stack>
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <Stack></Stack>
              <Stack direction={"row"} alignItems="center" spacing={2}>
                {/* <Tooltip title={t("unreadNote")}>
                  <IconButton>
                    <Badge badgeContent={7} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip> */}
                <AvatarCustom />
                <Box>
                  <Button
                    sx={{
                      fontFamily: Fonts.RalewayBold,
                      fontSize: "14px",
                      color: Color.solid,
                      textTransform: "none",
                    }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    {t("superAdmin")}
                  </Button>
                  <Menu
                    TransitionProps={{
                      timeout: 700,
                    }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <Link
                      to={"/profile"}
                      style={{
                        textDecoration: "none",
                        color: Color.solid,
                      }}
                    >
                    <MenuItem onClick={handleClose}>
                      <IconButton>
                        <AccountCircleIcon />
                      </IconButton>
                      {t("profile")}
                    </MenuItem>
                    </Link>
                    <Link
                      to={"/"}
                      style={{
                        textDecoration: "none",
                        color: Color.solid,
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <IconButton>
                          <LogoutIcon />
                        </IconButton>
                        {t("logout")}
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
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
