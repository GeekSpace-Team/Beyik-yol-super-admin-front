import React, { FC, useState } from "react";
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
import { addCarStyle, style } from "../../pages/cars/Cars";
import { ConstantType } from "../../common/types";
import { ConstantI } from "../../common/model";
import EditIcon from "@mui/icons-material/Edit";
import JoditReact from "jodit-react-ts";
import "jodit/build/jodit.min.css";

interface IProps {
  getData(): void;
  item: ConstantI;
}

const UpdateConstant: FC<IProps> = (props: IProps) => {
  const [name_tm, setName_tm] = useState(props.item.name_tm);
  const [name_ru, setName_ru] = useState(props.item.name_ru);
  const [content_tm, setContent_tm] = useState<string>(props.item.content_tm);
  const [content_ru, setContent_ru] = useState<string>(props.item.content_ru);
  const [type, setType] = useState(props.item.type);

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setName_tm(props.item.name_tm);
    setName_ru(props.item.name_ru);
    setContent_ru(props.item.content_ru);
    setContent_tm(props.item.content_tm);
    setType(props.item.type);
  };
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      updateRegion();
      setSuccess(false);
      setLoading(true);
    }
  };

  const clearInput = () => {
    setName_tm("");
    setName_ru("");
    setContent_ru("");
    setContent_tm("");
    setType("");
  };

  function updateRegion() {
    const data = {
      name_tm: name_tm,
      name_ru: name_ru,
      content_tm: content_tm,
      content_ru: content_ru,
      type: type,
    };
    AxiosInstance.patch(`/constant/update-constant/${props.item.id}`, data)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully edited constant!");
          handleClose();
          setLoading(false);
          props.getData();
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  return (
    <>
      <div>
        <Tooltip title={t("edit")}>
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
            <Box sx={{ ...addCarStyle, overflowY: "scroll" }}>
              <Stack
                direction="row"
                alignItems={"center"}
                pb={1}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{ fontFamily: Fonts.OpenSansBold, fontSize: "18px" }}
                >
                  {t("editConstant")}
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
                    label={t("nameTm")}
                    variant="outlined"
                    fullWidth
                    value={name_tm}
                    onChange={(e) => setName_tm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t("nameRu")}
                    variant="outlined"
                    fullWidth
                    value={name_ru}
                    onChange={(e) => setName_ru(e.target.value)}
                  />
                </Grid>

                <Grid item xs={2} sm={7} md={6}>
                  <Typography>{t("contentTm")}</Typography>
                  <JoditReact
                    defaultValue={content_tm}
                    onChange={(content) => setContent_tm(content)}
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <Typography>{t("contentRu")}</Typography>
                  <JoditReact
                    defaultValue={content_ru}
                    onChange={(content) => setContent_ru(content)}
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("constantType")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label={t("constantType")}
                      onChange={handleChange}
                    >
                      {ConstantType.map((item, i) => {
                        return (
                          <MenuItem value={item} key={`constant_type+${i}`}>
                            {t(item)}
                          </MenuItem>
                        );
                      })}
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

export default UpdateConstant;
