import React, { useState, useContext, KeyboardEvent } from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import { Grid, Stack, Typography } from "@mui/material";
import { AppContext } from "../../App";
import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { ButtonStyle, Color, Fonts } from "../../assets/theme/theme";
import {
  showError,
  showSuccess,
  showWarning,
} from "../../components/alert/Alert";
import { AxiosInstance } from "../../api/AxiosInstance";
import { Helmet } from "react-helmet-async";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: ${Color.transparentBg};
`;

const Input = styled.input`
  width: 95%;
  padding: 16px;
  background-color: white;
  color: black;
  font-family: ${Fonts.RalewayMedium};
  font-size: 16px;
  border-radius: 14px;
  border: none;
  outline: none;
`;

const Login = () => {
  // const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>): any => {
  //   // Do something
  // };

  const { isMobile } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  function login() {
    if (username.trim().length <= 0 || password.trim().length <= 0) {
      showWarning(t("Please enter required informations!"));
    } else {
      setIsLoading(true);
      AxiosInstance.post("/auth/sign-in", {
        username: username,
        password: password,
        device: "WEB",
      })
        .then((response) => {
          if (!response.data.error) {
            showSuccess(t("Success"));
            setIsLoading(false);
            // sessionStorage.setItem("fullname", response.data.body["fullname"]);
            // sessionStorage.setItem("id", response.data.body["id"]);
            // sessionStorage.setItem("username", response.data.body["username"]);
            // sessionStorage.setItem(
            //   "phone_number",
            //   response.data.body["phone_number"]
            // );
            sessionStorage.setItem("my_token", response.data.access_token);
            sessionStorage.setItem("token", response.data.access_token);
            window.location.href = "/cars";
          }
        })
        .catch((err) => {
          showError(err.toString());
          setIsLoading(false);
        });
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      login();
    }
  };

  return (
    <>
      <Helmet>
        <title> Beyik Yol | Login Page </title>
      </Helmet>
      <Background>
        <Grid container>
          <Grid item xs={12} md={6}>
            {isMobile ? null : (
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100vh", background: "white" }}
              >
                <Player
                  autoplay
                  loop
                  src={"/images/lottie/work.json"}
                  style={{ height: "60vh", width: "100%", objectFit: "cover" }}
                ></Player>
              </Stack>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack sx={{ mt: 4, p: 4 }} spacing={4}>
              <Typography
                sx={{
                  fontFamily: Fonts.RalewayBlack,
                  fontSize: "34px",
                  color: Color.solid,
                }}
              >
                {t("welcome")}
              </Typography>

              <Typography
                sx={{
                  fontFamily: Fonts.RalewayMedium,
                  fontSize: "22px",
                  color: Color.solid,
                }}
              >
                {t("logText")}
              </Typography>

              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                //   placeholder={t("Username...")}
                type={"text"}
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                //   placeholder={t("Password...")}
                onKeyDown={handleKeyDown}
                type={"password"}
                // onKeyDown={handleKeyboardEvent}
              />
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                startIcon={<LoginIcon />}
                variant="contained"
                sx={ButtonStyle}
                fullWidth={true}
                onClick={login}
              >
                {isLoading ? (
                  <Typography>{t("wait...")}</Typography>
                ) : (
                  <Typography>{t("login")}</Typography>
                )}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Background>
    </>
  );
};

export default Login;
