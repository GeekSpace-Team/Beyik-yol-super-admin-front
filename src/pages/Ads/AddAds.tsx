import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { ButtonStyle, PageName } from "../../assets/theme/theme";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { AxiosInstanceFormData } from "../../api/AxiosInstance";
import { style } from "../cars/Cars";
import { showError, showSuccess } from "../../components/alert/Alert";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AppContext } from "../../App";

interface IProps {
  getData(): void;
}

const AddAds: FC<IProps> = (props: IProps) => {
  const { t, adsList, status } = useContext(AppContext);
  const [selectedImages, setImages] = useState<string | File>();
  const [titleTm, setTitleTm] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [index, setIndex] = useState<Number>(0);
  const [statusValue, setStatusValue] = useState("");
  const [adsType, setAdsType] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      addAds();
      setSuccess(false);
      setLoading(true);
    }
  };

  function addAds() {
    let formData = new FormData();
    formData.append("titleTm", titleTm);
    formData.append("status", statusValue);
    formData.append("titleRu", titleRu);
    formData.append("index", `${index}`);
    formData.append("adsType", adsType);
    formData.append("url", url);
    if (selectedImages) {
      formData.append("image", selectedImages);
    }
    AxiosInstanceFormData.post("/ads/create-ads", formData)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully added new ads!");
          handleClose();
          setLoading(false);
          props.getData();
          clearInput();
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  const clearInput = () => {
    setStatusValue("");
    setTitleTm("");
    setTitleRu("");
    setAdsType("");
  };

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value as string);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAdsType(event.target.value as string);
  };
  return (
    <>
      <div>
        <Button onClick={handleOpen} sx={ButtonStyle} variant="contained">
          {t("addAds")}
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
            <Box sx={style}>
              <Stack
                direction="row"
                alignItems={"center"}
                pb={1}
                justifyContent={"space-between"}
              >
                <Typography sx={PageName}>{t("addAds")}</Typography>
                <IconButton onClick={handleClose}>
                  <ClearIcon />
                </IconButton>
              </Stack>
              <Divider />
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                pt={5}
              >
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t("nameTm")}
                    variant="outlined"
                    value={titleTm}
                    onChange={(e) => setTitleTm(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t("nameRu")}
                    variant="outlined"
                    fullWidth
                    value={titleRu}
                    onChange={(e) => setTitleRu(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("status")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={statusValue}
                      label={t("status")}
                      onChange={handleChangeStatus}
                    >
                      {status?.itemStatus
                        ? status?.itemStatus.map((item, i) => {
                            return (
                              <MenuItem
                                value={item}
                                key={`get_item_status_key+${i}`}
                              >
                                {item}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("adsType")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={adsType}
                      label={t("adsType")}
                      onChange={handleChange}
                    >
                      {adsList?.adsStatus
                        ? adsList?.adsStatus.map((item, i) => {
                            return (
                              <MenuItem
                                value={item}
                                key={`get_ads_type_key+${i}`}
                              >
                                {item}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t("url")}
                    variant="outlined"
                    fullWidth
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t("index")}
                    variant="outlined"
                    fullWidth
                    value={index}
                    onChange={(e) => setIndex(Number(e.target.value))}
                  />
                </Grid>

                <Grid item xs={2} sm={7} md={6}>
                  <Button
                    sx={ButtonStyle}
                    startIcon={<PhotoCamera />}
                    variant="contained"
                    component="label"
                    fullWidth
                  >
                    {t("uploadImg")}
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) =>
                        setImages(e.target.files ? e.target.files[0] : "")
                      }
                    />
                  </Button>
                </Grid>
              </Grid>
              <Stack
                direction={"row"}
                justifyContent="flex-end"
                spacing={2}
                mt={3}
              >
                <Button
                  startIcon={<ClearIcon />}
                  sx={ButtonStyle}
                  variant="contained"
                  onClick={clearInput}
                >
                  {t("clear")}
                </Button>
                <Button
                  startIcon={<SaveIcon />}
                  sx={ButtonStyle}
                  variant="contained"
                  onClick={handleButtonClick}
                >
                  {t("save")}
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default AddAds;
