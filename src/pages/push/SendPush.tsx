import React, { useEffect, useState } from "react";
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

const SendPush = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [titleTm, setTitleTm] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [messageTm, setMessageTm] = useState("");
  const [messageRu, setMessageRu] = useState("");
  const [userId, setUserId] = useState(1);
  const [url, setUrl] = useState("");
  const [sendList, setSendList] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<UserI[]>([]);
  const [success, setSuccess] = useState(false);

  const getData = async () => {
    await AxiosInstance.get("/users/get-all-users-full")
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
    getData();
  }, []);

  function sendMessage() {
    const body = {
      titleTm: titleTm,
      titleRu: titleRu,
      messageTm: messageTm,
      messageRu: messageRu,
      userId: userId,
      isRead: isRead,
      url: url,
    };
    AxiosInstance.post("/inbox/send-to-user", body)
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setSendList(resp.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  }

  useEffect(() => {
    sendMessage();
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      sendMessage();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={ButtonStyle}>
        Send Message
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
              <Typography sx={PageName}>Send Message</Typography>,
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
                  fullWidth
                  getOptionLabel={(user) => user.fullname}
                  renderInput={(params) => (
                    <TextField {...params} label="Users" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Title TM"
                  variant="outlined"
                  value={titleTm}
                  onChange={(e) => setTitleTm(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Title RU"
                  variant="outlined"
                  value={titleRu}
                  onChange={(e) => setTitleRu(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Message TM"
                  variant="outlined"
                  fullWidth
                  value={messageTm}
                  onChange={(e) => setMessageTm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Message RU"
                  variant="outlined"
                  fullWidth
                  value={messageRu}
                  onChange={(e) => setMessageRu(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="URL / Link"
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
              >
                Clear
              </Button>
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  variant="contained"
                  sx={ButtonStyle}
                  startIcon={<SaveIcon />}
                  disabled={loading}
                  onClick={handleButtonClick}
                >
                  Send Message
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
