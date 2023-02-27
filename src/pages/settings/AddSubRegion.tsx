import React, { FC, useState } from "react";
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
import { useTranslation } from "react-i18next";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { ButtonStyle, Color, Fonts } from "../../assets/theme/theme";
import { style } from "../cars/Cars";
import { showError, showSuccess } from "../../components/alert/Alert";
import { AxiosInstance } from "../../api/AxiosInstance";

interface IProps {
  getData(): void;
  regionId: number;
}

const AddSubRegion: FC<IProps> = (props: IProps) => {
  const [name_tm, setName_tm] = useState("");
  const [name_ru, setName_ru] = useState("");
  const [description, setDescription] = useState("");

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      addSubRegion();
      setSuccess(false);
      setLoading(true);
    }
  };

  function addSubRegion() {
    const data = {
      name_tm: name_tm,
      name_ru: name_ru,
      description: description,
      regionId: props.regionId,
    };
    AxiosInstance.post("/sub-region/create-sub-region", data)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully added new brand!");
          handleClose();
          setLoading(false);
          props.getData();
          setName_tm("");
          setName_ru("");
          setDescription("");
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  return (
    <>
      <div>
        <Button sx={ButtonStyle} onClick={handleOpen} variant="contained">
          Add Sub Region
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
                <Typography
                  sx={{ fontFamily: Fonts.OpenSansBold, fontSize: "18px" }}
                >
                  Add SubRegion
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
                    label="Name TM"
                    variant="outlined"
                    fullWidth
                    value={name_tm}
                    onChange={(e) => setName_tm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name RU"
                    variant="outlined"
                    fullWidth
                    value={name_ru}
                    onChange={(e) => setName_ru(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    fullWidth
                    maxRows={9}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                {/* <Button sx={ButtonStyle} variant="contained">
                    Save
                  </Button> */}
                <Box sx={{ m: 1, position: "relative" }}>
                  <Button
                    variant="contained"
                    sx={ButtonStyle}
                    startIcon={<SaveIcon />}
                    disabled={loading}
                    onClick={handleButtonClick}
                  >
                    Save
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

export default AddSubRegion;
