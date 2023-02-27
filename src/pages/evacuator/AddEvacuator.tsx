import React, { FC, useContext, useEffect, useState } from "react";
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
import { AxiosInstance } from "../../api/AxiosInstance";
import { showError, showSuccess } from "../../components/alert/Alert";
import { ButtonStyle, Color, Fonts } from "../../assets/theme/theme";
import { style } from "../cars/Cars";
import { SubRegionI } from "../../common/model";
import { AppContext } from "../../App";

interface IProps {
  getData(): void;
}

const AddEvacuator: FC<IProps> = (props: IProps) => {
  const { status } = useContext(AppContext);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subRegionId, setSubRegionId] = useState("");
  const [description, setDescription] = useState("");
  const [subRegion, setSubRegion] = useState<SubRegionI[]>([]);
  const [statusValue, setStatusValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      addData();
    }
  };

  function addData() {
    const body = {
      phoneNumber: phoneNumber,
      subRegionId: Number(subRegionId),
      status: statusValue,
      description: description,
    };
    AxiosInstance.post("/evacuator/create-evacuator", body)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully added new evacuator!");
          handleClose();
          setLoading(false);
          props.getData();
          setStatusValue("");
          setDescription("");
          setPhoneNumber("");
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  const getSubRegionData = async () => {
    await AxiosInstance.get("/sub-region/get-all-sub-regions")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setSubRegion(resp.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getSubRegionData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSubRegionId(event.target.value as string);
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value as string);
  };
  return (
    <>
      <div>
        <Stack direction="row" justifyContent={"flex-end"} pb={3}>
          <Button sx={ButtonStyle} onClick={handleOpen} variant="contained">
            Add Evacuator
          </Button>
        </Stack>
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
                  Add Evacuator
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
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={phoneNumber}
                    type={"number"}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>

                <Grid item xs={2} sm={7} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Sub - Region
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={subRegionId}
                      label="Sub - Region"
                      onChange={handleChange}
                    >
                      {subRegion.map((item, i) => {
                        return (
                          <MenuItem
                            value={`${item.id}`}
                            key={`item_status+${i}`}
                          >
                            {t(item.name_tm)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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

export default AddEvacuator;