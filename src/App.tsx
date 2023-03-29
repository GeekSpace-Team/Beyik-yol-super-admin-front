import "./App.css";
import Ads from "./pages/Ads/Ads";
import Cars, { CarTableInfo } from "./pages/cars/Cars";
import Client from "./pages/client/Client";
import Constant from "./pages/constant/Constant";
import Costs from "./pages/costs/Costs";
import Inbox from "./pages/inbox/Inbox";
import Login from "./pages/login/Login";
import Objects from "./pages/objects/Objects";
import Profile from "./layout/profile/Profile";
import Push from "./pages/push/Push";
import Settings from "./pages/settings/Settings";
import Sidebar from "./components/sidebar/Sidebar";
import Users from "./pages/users/Users";
import Voices from "./pages/voices/Voices";
import { ThemeProvider } from "@material-ui/core";
import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { FC, createContext, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AxiosInstance } from "./api/AxiosInstance";
import { darkMode, lightMode } from "./assets/theme/theme";
import { TypesI } from "./common/model";
import { showError } from "./components/alert/Alert";
import { HelmetProvider } from "react-helmet-async";

export interface ContextProps {
  isDark?: boolean;
  t?: any;
  changeLanguage?: any;
  setIsDark?: React.Dispatch<React.SetStateAction<boolean>>;
  theme?: Theme;
  isMobile?: boolean;
  list?: Partial<TypesI>;
  adsList?: Partial<TypesI>;
  status?: Partial<TypesI>;
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
  const [list, setList] = useState<Partial<TypesI>>({});
  const [adsList, setAdsList] = useState<Partial<TypesI>>({});
  const [status, setStatus] = useState<Partial<TypesI>>({});
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { t, i18n } = useTranslation();

  const wwidth = useWidth();

  const checker = (w: string) => {
    return ["xs", "sm"].includes(w);
  };
  const [isMobile, setIsMobile] = useState(checker(wwidth));

  const getType = async () => {
    await AxiosInstance.get("/other/get-types")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList(resp.data);
          setAdsList(resp.data);
          setStatus(resp.data);
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  useEffect(() => {
    getType();
  }, []);

  useEffect(() => {
    setIsMobile(checker(wwidth));
  }, [wwidth]);

  useEffect(() => {
    let lng = localStorage.getItem("lng");
    if (typeof lng !== "undefined" && lng !== null && lng !== "") {
      changeLanguage(lng);
    }
  });
  return (
    <HelmetProvider>
      <AppContext.Provider
        value={{
          isDark: isDark,
          setIsDark: setIsDark,
          theme: theme,
          t: t,
          changeLanguage: changeLanguage,
          isMobile: isMobile,
          list: list,
          adsList: adsList,
          status: status,
        }}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path={"/"} element={<Login />} />
              <Route path="/" element={<Sidebar />}>
                <Route path="/cars" element={<Cars />} />
                <Route path="/cars/:id" element={<CarTableInfo />} />
                {/* <Route path={"/carTable"} element={< />} /> */}
                <Route path="/ads" element={<Ads />} />
                <Route path="/users" element={<Users />} />
                <Route path="/push" element={<Push />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/voices" element={<Voices />} />
                <Route path="/constant" element={<Constant />} />
                <Route path="/objects" element={<Objects />} />
                <Route path="/client" element={<Client />} />
                <Route path="/costs" element={<Costs />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
        <ToastContainer />
      </AppContext.Provider>
    </HelmetProvider>
  );
};

export default App;
