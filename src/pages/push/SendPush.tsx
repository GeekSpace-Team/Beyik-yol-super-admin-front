import React, { FC, useContext, useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonStyle, Color, PageName } from "../../assets/theme/theme";
import { addCarStyle } from "../cars/Cars";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import Autocomplete from "@mui/material/Autocomplete";
import { AxiosInstance } from "../../api/AxiosInstance";
import { UserI } from "../../common/model";
import { showError, showSuccess } from "../../components/alert/Alert";
import { AppContext } from "../../App";

interface IProps {
  getData(): void;
}
const SendPush: FC<IProps> = (props: IProps) => {
  const { t } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [titleTm, setTitleTm] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [messageTm, setMessageTm] = useState("");
  const [messageRu, setMessageRu] = useState("");
  const [userId, setUserId] = useState<Partial<UserI> | null>({
    fullname: "All",
    id: null,
    blocked: false,
  });
  const [url, setUrl] = useState("");
  const [isRead, setIsRead] = useState(false);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<UserI[]>([]);
  const [success, setSuccess] = useState(false);

  const getData = async () => {
    await AxiosInstance.get("/users/get-all-users-full")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList([userId, ...resp.data]);
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function sendMessage() {
    const body = {
      titleTm: titleTm,
      titleRu: titleRu,
      messageTm: messageTm,
      messageRu: messageRu,
      isRead: isRead,
      userId: userId ? userId.id : null,
      url: url,
    };
    AxiosInstance.post(`/inbox/send-to-user`, body)
      .then((resp) => {
        if (!resp.data.error) {
          handleClose();
          props.getData();
          setTitleTm("");
          setTitleRu("");
          setMessageTm("");
          setMessageRu("");
          setUrl("");
          setLoading(false);
          showSuccess("Successfully sent to user");
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  }

  function sendToAll() {
    const body = {
      titleTm: titleTm,
      titleRu: titleRu,
      messageTm: messageTm,
      messageRu: messageRu,
      userId: null,
      isRead: isRead,
      url: url,
    };
    AxiosInstance.post("/inbox/send-to-all", body)
      .then((response) => {
        if (!response.data.error) {
          props.getData();
          handleClose();
          clearInput();
          setLoading(false);
          showSuccess("Successfully sent to to all user");
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  }

  const clearInput = () => {
    setTitleTm("");
    setTitleRu("");
    setMessageTm("");
    setMessageRu("");
    setUrl("");
  };

  const handleClick = () => {
    if (userId && userId.id === null) {
      sendToAll();
    } else {
      sendMessage();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={ButtonStyle}>
        {t("sendMessage")}
      </Button>

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
          <Box sx={addCarStyle}>
            <Stack
              direction="row"
              alignItems={"center"}
              pb={1}
              justifyContent={"space-between"}
            >
              <Typography sx={PageName}> {t("sendMessage")}</Typography>,
              <IconButton onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </Stack>
            <Divider />
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 12, md: 12 }}
              pt={5}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={list}
                  onChange={(event: any, newValue: Partial<UserI> | null) => {
                    setUserId(newValue);
                  }}
                  value={userId}
                  fullWidth
                  getOptionLabel={(user) =>
                    user.fullname ? user.fullname : ""
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Users" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label={t("nameTm")}
                  variant="outlined"
                  value={titleTm}
                  onChange={(e) => setTitleTm(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label={t("nameRu")}
                  variant="outlined"
                  value={titleRu}
                  onChange={(e) => setTitleRu(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label={t("messageTm")}
                  variant="outlined"
                  fullWidth
                  value={messageTm}
                  onChange={(e) => setMessageTm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label={t("messageRu")}
                  variant="outlined"
                  fullWidth
                  value={messageRu}
                  onChange={(e) => setMessageRu(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label={t("url")}
                  variant="outlined"
                  fullWidth
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Grid>
            </Grid>
            <Stack
              direction={"row"}
              justifyContent="flex-end"
              spacing={2}
              mt={3}
            >
              <Button
                sx={ButtonStyle}
                startIcon={<ClearIcon />}
                variant="contained"
                onClick={clearInput}
              >
                {t("clear")}
              </Button>
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  variant="contained"
                  sx={ButtonStyle}
                  startIcon={<SaveIcon />}
                  disabled={loading}
                  onClick={handleClick}
                >
                  {t("sendMessage")}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: Color.primary,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SendPush;
