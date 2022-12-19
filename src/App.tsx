import { createContext, FC, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cars, { CarTableInfo } from "./pages/cars/Cars";
import Ads from "./pages/Ads/Ads";
import Users from "./pages/users/Users";
import Push from "./pages/push/Push";
import Inbox from "./pages/inbox/Inbox";
import Voices from "./pages/voices/Voices";
import Constant from "./pages/constant/Constant";
import Objects from "./pages/objects/Objects";
import Client from "./pages/client/Client";
import Costs from "./pages/costs/Costs";
import { ThemeProvider } from "@material-ui/core";
import { Color, darkMode, getTheme, lightMode } from "./assets/theme/theme";
import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";

export interface ContextProps {
  isDark?: boolean;
  t?: any;
  changeLanguage?: any;
  setIsDark?: React.Dispatch<React.SetStateAction<boolean>>;
  theme?: Theme;
  isMobile?: boolean;
}

export function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: any, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

export const AppContext = createContext<ContextProps>({});

const App: FC = (props) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkMode : lightMode;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { t, i18n } = useTranslation();

  const wwidth = useWidth();

  const checker = (w: string) => {
    return ["xs", "sm"].includes(w);
  };
  const [isMobile, setIsMobile] = useState(checker(wwidth));

  useEffect(() => {
    setIsMobile(checker(wwidth));
  }, [wwidth]);

  useEffect(() => {
    let lng = localStorage.getItem("lng");
    if (typeof lng !== "undefined" && lng !== null && lng !== "") {
      changeLanguage(lng);
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        isDark: isDark,
        setIsDark: setIsDark,
        theme: theme,
        t: t,
        changeLanguage: changeLanguage,
        isMobile: isMobile,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Sidebar />}>
              <Route path="/cars" element={<Cars />} />
              <Route path="/ads" element={<Ads />} />
              <Route path="/users" element={<Users />} />
              <Route path="/push" element={<Push />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/voices" element={<Voices />} />
              <Route path="/constant" element={<Constant />} />
              <Route path="/objects" element={<Objects />} />
              <Route path="/client" element={<Client />} />
              <Route path="/costs" element={<Costs />} />
            </Route>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/carTable"} element={<CarTableInfo />} />
          </Routes>
        </Router>
      </ThemeProvider>
      <ToastContainer />
    </AppContext.Provider>
  );
};

export default App;
