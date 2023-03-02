import React, { FC, useContext, useEffect, useRef, useState } from "react";
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
import { ButtonStyle, Color, Fonts } from "../../../assets/theme/theme";
import { style } from "../../../pages/cars/Cars";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { Model } from "../../../common/model";
import { AxiosInstance } from "../../../api/AxiosInstance";
import { showError, showSuccess } from "../../../components/alert/Alert";
import { AppContext } from "../../../App";

interface IProps {
  getData(): void;
  brandId: number;
  item: Model;
}

const UpdateModel: FC<IProps> = (props: IProps) => {
  const { status } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setName(props.item.name);
    setDescription(props.item.description);
    setStatusValue(props.item.status);
  };
  const [statusValue, setStatusValue] = useState(props.item.status);
  const [name, setName] = useState(props.item.name);
  const [description, setDescription] = useState(props.item.description);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      addCarModel();
    }
  };

  function addCarModel() {
    const data = {
      name: name,
      description: description,
      status: statusValue,
      brandId: props.brandId,
    };
    AxiosInstance.patch(`/car-model/update-car-model/${props.item.id}`, data)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully edited car model");
          props.getData();
          handleClose();
          setLoading(false);
          setName("");
          setDescription("");
          setStatusValue("");
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        alert(error + "");
      });
  }

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value as string);
  };
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
                  Add Model
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
                    label="Title Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
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
                <Grid item xs={12} sm={12} md={12}>
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

export default UpdateModel;
