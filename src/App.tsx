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
import Settings from "./pages/settings/Settings";
import { AxiosInstance } from "./api/AxiosInstance";
import { AllCars, TypesI } from "./common/model";

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
  listAllCars?: any;
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

  const [listAllCars, setListAllCars] = useState<AllCars[]>([]);

  const getAllCarsData = async () => {
    await AxiosInstance.get<AllCars[]>("/cars/get-all-cars")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setListAllCars(resp.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getAllCarsData();
  }, []);

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
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getType();
  }, []);

  const getAdsType = async () => {
    await AxiosInstance.get("/other/get-types")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setAdsList(resp.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getAdsType();
  }, []);

  const getStatus = async () => {
    await AxiosInstance.get("/other/get-types")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setStatus(resp.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getStatus();
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
        listAllCars: listAllCars,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Sidebar />}>
              <Route path="/" element={<Cars />} />
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
