import { createTheme } from "@mui/material";

export const Color = {
  transparentBg: "#EDEEEF",
  solid: "#5C5F62",
  secondary: "#00A0AC",
  secondaryLight: "#58d2de",
  secondaryDark: "#00717d",
  background: "#F6F6F7",
  primary: "#008060",
  primaryLight: "#49b08d",
  primaryDark: "#005236",
};

export const Fonts = {
  OpenSansBold: "OpenSans-Bold",
  OpenSansExtraBold: "OpenSans-ExtraBold",
  OpenSansLight: "OpenSans-Light",
  OpenSansMedium: "OpenSans-Medium",
  OpenSansRegular: "OpenSans-Regular",
  OpenSansSemiBold: "OpenSans-SemiBold",
  RalewayBlack: "Raleway-Black",
  RalewayBold: "Raleway-Bold",
  RalewayExtraBold: "Raleway-ExtraBold",
  RalewayExtraLight: "Raleway-ExtraLight",
  RalewayLight: "Raleway-Light",
  RalewayMedium: "Raleway-Medium",
  RalewaySemiBold: "Raleway-SemiBold",
  RalewayThin: "Raleway-Thin",
  RobotoBlack: "Roboto-Black",
  RobotoBold: "Roboto-Bold",
  RobotoLight: "Roboto-Light",
  RobotoMedium: "Roboto-Medium",
  RobotoRegular: "Roboto-Regular",
  RobotoThin: "Roboto-Thin",
};

export const lightMode = createTheme({
  typography: {
    fontFamily: "OpenSans-Regular",
  },
  palette: {
    mode: "light",
    primary: {
      main: Color.primary,
      light: Color.primaryLight,
      dark: Color.primaryDark,
    },
    secondary: {
      main: Color.secondary,
      light: Color.secondaryLight,
      dark: Color.secondaryDark,
    },
    background: {
      default: Color.background,
    },
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
    text: {
      secondary: Color.solid,
    },
  },
});

export const darkMode = createTheme({
  typography: {
    fontFamily: "OpenSans-Regular",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
      light: Color.primaryLight,
      dark: Color.primaryDark,
    },
    secondary: {
      main: Color.secondary,
      light: Color.secondaryLight,
      dark: Color.secondaryDark,
    },
    background: {
      default: Color.background,
    },
    common: {
      white: "#000000",
      black: "#FFFFFF",
    },
    text: {
      secondary: Color.solid,
    },
  },
});

export const TableHeadStyle = {
  fontFamily: Fonts.RalewayBold,
  fontSize: "15px",
  // color: Color.transparentBg,
};

export const TableCellStyle = {
  fontFamily: Fonts.RobotoRegular,
  fontSize: "14px",
  color: Color.solid,
};

export const ButtonStyle = {
  textTransform: "none",
  background: Color.primary,
  fontFamily: Fonts.RalewayBold,

  "&:hover": {
    background: Color.primary,
  },
};

export const PageName = {
  fontFamily: Fonts.OpenSansBold,
  fontSize: "24px",
};

export const getTheme = (isDark: boolean) => (isDark ? darkMode : lightMode);

// Tab customize style section starts here ..........................................................

export const indicatorTable = {
  height: "0px",
};

export const TabsStyle = {
  height: "30px",

  "& button": { borderRadius: "4px" },
  "& button:hover": { backgroundColor: Color.transparentBg },
  "& button:active": { backgroundColor: "#000", color: "red" },
  "& button.Mui-selected": {
    backgroundColor: Color.primary,
    color: "#fff",
  },
};

export const TabStyle = {
  transition: "0.7s ",
  fontFamily: Fonts.OpenSansBold,
  color: Color.solid,
  textTransform: "capitalize",
  paddingBottom: "30px",
  backgroundColor: Color.transparentBg,

  "&:hover": {
    color: "#000",
  },
};

// Tab customize style section ends here ..........................................................

export const tmFlag = {
  backgroundImage: "url(/images/tmFlag.jpg)",
  width: "50px",
  height: "30px",
  backgroundSize: "cover",
};

export const ruFlag = {
  backgroundImage: "url(/images/ruFlag.jpg)",
  width: "50px",
  height: "30px",
  backgroundSize: "cover",
};

// custom switch style section starts here ............................................................

export const mySwitch = {
  width: "100px",
  height: "30px",
  borderRadius: "25px",
  background: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginLeft: "20%",
  cursor: "pointer",
};

export const leftSwitch = {
  width: "100%",
  zIndex: "10",
  height: "100%",
  backgroundImage: "url(/images/ru.svg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};

export const rightSwith = {
  width: "100%",
  zIndex: "10",
  display: "flex",
  justifyContent: "flex-end",
  height: "100%",
  backgroundImage: "url(/images/Tm.svg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};

export const toggleTm = {
  backgroundImage: "url(/images/tmFlag.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "50% 50%",
  backgroundPosition: "center",
  width: "30px",
  height: "20px",
};

export const toggleRu = {
  backgroundImage: "url(/images/ruFlag.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "50% 50%",
  backgroundPosition: "center",
  width: "30px",
  height: "20px",
  background: Color.transparentBg,
};
// custom switch style section ends here ..............................................................

export const TabsStyleLg = {
  height: "10px",

  "& button": { borderRadius: "4px" },
  "& button:hover": { backgroundColor: Color.transparentBg },
  "& button:active": { backgroundColor: "#000", color: "red" },
  "& button.Mui-selected": {
    backgroundColor: Color.primary,
    color: "#fff",
  },
};

export const TabStyleLg = {
  transition: "0.5s ",
  fontFamily: Fonts.OpenSansBold,
  color: "#fff",
  backgroundColor: Color.solid,
  textTransform: "capitalize",

  "&:hover": {
    color: "#000",
  },
};

export const PhoneNumberInput = {
  height: "50px",
};

export const littleText = {
  color: Color.solid,
  fontSize: "12px",
  fontFamily: Fonts.OpenSansMedium,
  fontWeight: "400",
};

export const carIdName = {
  fontFamily: Fonts.OpenSansBold,
  fontWeight: "600",
};
