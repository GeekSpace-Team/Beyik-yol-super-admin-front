import React, { useContext, useState } from "react";
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
import { ButtonStyle, Color, Fonts } from "../../../assets/theme/theme";
import { style } from "../../../pages/cars/Cars";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { AxiosInstanceFormData } from "../../../api/AxiosInstance";
import { showError, showSuccess } from "../../../components/alert/Alert";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Brand } from "../../../common/model";
import { AppContext } from "../../../App";

interface IProps {
  getData(): void;
  item: Brand;
}

const UpdateBrand: React.FC<IProps> = (props: IProps) => {
  const { status } = useContext(AppContext);
  const [selectedImages, setImages] = useState<string | File>();
  const [name, setName] = useState(props.item.name);
  const [description, setDescription] = useState(props.item.description);
  const [statusValue, setStatusValue] = useState(props.item.status);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setImages(undefined);
    setName(props.item.name);
    setDescription(props.item.description);
    setStatusValue(props.item.status);
  };

  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      updateBrand();
    }
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value as string);
  };

  function updateBrand() {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("status", statusValue);
    formData.append("description", description);
    if (selectedImages) {
      formData.append("image", selectedImages);
    }
    AxiosInstanceFormData.patch(
      `/car-brand/update-car-brand/${props.item.id}`,
      formData
    )
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Car Brand Successfully Updated!");
          handleClose();
          props.getData();
          setLoading(false);
        } else {
          showError("Car Brand Update Error");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  return (
    <>
      <div>
        <Tooltip title="Edit">
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
                  Edit Brand
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
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={2} sm={7} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={statusValue}
                      label="Status"
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
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    fullWidth
                    maxRows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    Upload Image
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

export default UpdateBrand;
