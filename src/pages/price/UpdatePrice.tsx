import React, { FC, useContext, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { AxiosInstance } from "../../api/AxiosInstance";
import { showError, showSuccess } from "../../components/alert/Alert";
import { ButtonStyle, Color, Fonts } from "../../assets/theme/theme";
import { style } from "../cars/Cars";
import { AppContext } from "../../App";
import EditIcon from "@mui/icons-material/Edit";
import { PriceI } from "../../common/model";

interface IProps {
  getData(): void;
  item: PriceI;
}

const UpdatePrice: FC<IProps> = (props: IProps) => {
  const { list } = useContext(AppContext);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setTitle(props.item.title);
    setValue(props.item.value);
    setType(props.item.type);
  };
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState(props.item.title);
  const [value, setValue] = useState(props.item.value);
  const [type, setType] = useState(props.item.type);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      updateData();
    }
  };

  function updateData() {
    const body = {
      title: title,
      value: value,
      type: type,
    };
    AxiosInstance.patch(`/price/update-price/${props.item.id}`, body)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully edited Price!");
          handleClose();
          setLoading(false);
          props.getData();
          clearinput();
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  const clearinput = () => {
    setTitle("");
    setType("");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  return (
    <>
      <div>
        <Tooltip title={t("editPrice")}>
          <IconButton onClick={handleOpen} sx={{ color: Color.primary }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
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
                <Typography
                  sx={{ fontFamily: Fonts.OpenSansBold, fontSize: "18px" }}
                >
                  {t("editPrice")}
                </Typography>
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
                    label={t("fullname")}
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t("value")}
                    variant="outlined"
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
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
                      value={type}
                      label={t("status")}
                      onChange={handleChange}
                    >
                      {list?.priceType
                        ? list?.priceType.map((item, i) => {
                            return (
                              <MenuItem
                                value={item}
                                key={`get_price_type_key+${i}`}
                              >
                                {item}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
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
                  onClick={clearinput}
                >
                  {t("clear")}
                </Button>
                <Box sx={{ m: 1, position: "relative" }}>
                  <Button
                    variant="contained"
                    sx={ButtonStyle}
                    startIcon={<SaveIcon />}
                    disabled={loading}
                    onClick={handleButtonClick}
                  >
                    {t("save")}
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
      </div>
    </>
  );
};

export default UpdatePrice;
