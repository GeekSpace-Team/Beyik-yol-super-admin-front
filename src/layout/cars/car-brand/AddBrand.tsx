import React, { FC, useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { ButtonStyle, Color, Fonts } from "../../../assets/theme/theme";
import { ItemStatus } from "../../../components/itemStatus/ItemStatus";
import { style } from "../../../pages/cars/Cars";
import { AxiosInstanceFormData } from "../../../api/AxiosInstance";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { showError, showSuccess } from "../../../components/alert/Alert";

interface IProps {
  getCars(): void;
}

const AddBrand: FC<IProps> = (props: IProps) => {
  const [selectedImages, setImages] = useState<string | File>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      addBrand();
      setSuccess(false);
      setLoading(true);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  function addBrand() {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    formData.append("description", description);
    if (selectedImages) {
      formData.append("image", selectedImages);
    }
    AxiosInstanceFormData.post("/car-brand/create-brand", formData)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully added new brand!");
          handleClose();
          setLoading(false);
          props.getCars();
          setStatus("");
          setName("");
          setDescription("");
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  return (
    <>
      <div>
        <Button sx={ButtonStyle} onClick={handleOpen} variant="contained">
          Add Brand
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
                  Add Brand
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
                      value={status}
                      label="Status"
                      onChange={handleChange}
                    >
                      {ItemStatus.map((item, i) => {
                        return (
                          <MenuItem value={item} key={`item_status+${i}`}>
                            {t(item)}
                          </MenuItem>
                        );
                      })}
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
                {/* <Grid item xs={12} sm={12} md={12}>
                  <FileUploader
                    defaultLabel={"Hello"}
                    placeholder={<Image src={"/"} />}
                    multiple={false}
                    mimeTypes={["image/*"]}
                    draggable={true}
                    id={"image-selector"}
                    setList={setImages}
                    title={t("Images*")}
                    type={Types.image}
                    list={undefined}
                    urlType={ImageType.Brand}
                  />
                </Grid> */}
                <Grid item xs={2} sm={7} md={6}>
                  <Button
                    sx={ButtonStyle}
                    startIcon={<PhotoCamera />}
                    variant="contained"
                    component="label"
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

export default AddBrand;
