import React, { FC, useContext, useEffect, useState } from "react";
import {
  Autocomplete,
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
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import { ButtonStyle, Color, PageName } from "../../../assets/theme/theme";
import { addCarStyle } from "../../../pages/cars/Cars";
import {
  AllCars,
  Engine,
  Model,
  Option,
  Transmition,
  UserI,
} from "../../../common/model";
import {
  AxiosInstance,
  AxiosInstanceFormData,
} from "../../../api/AxiosInstance";
import { AppContext } from "../../../App";
import { showError, showSuccess } from "../../../components/alert/Alert";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";

interface IProps {
  getData(): void;
  item: AllCars;
}

const UpdateCar: FC<IProps> = (props: IProps) => {
  const { status } = useContext(AppContext);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { t } = useTranslation();
  const [statusValue, setStatusValue] = useState(props.item.status);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setName(props.item.name);
    setModelId(props.item.modelId);
    setOptionId(props.item.optionId);
    setEngineTypeId(props.item.engineTypeId);
    setEnginePower(props.item.enginePower);
    setTransmitionId(props.item.transmitionId);
    setYear(props.item.year);
    setLastMile(props.item.lastMile);
    setPhoneNumber(props.item.phoneNumber);
    setStatusValue(props.item.status);
  };
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(props.item.name);
  const [modelId, setModelId] = useState<any>(props.item.modelId);
  const [optionId, setOptionId] = useState<any>(props.item.optionId);
  const [engineTypeId, setEngineTypeId] = useState<any>(
    props.item.engineTypeId
  );
  const [enginePower, setEnginePower] = useState<any>(props.item.enginePower);
  const [transmitionId, setTransmitionId] = useState<any>(
    props.item.transmitionId
  );
  const [year, setYear] = useState<any>(props.item.year);
  const [lastMile, setLastMile] = useState<any>(props.item.lastMile);
  const [vinCode, setVinCode] = useState(props.item.vinCode);
  const [phoneNumber, setPhoneNumber] = useState(props.item.phoneNumber);
  const [usersId, setUsersId] = useState<any>(1);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  }

  const handleClear = () => {
    setName("");
    setModelId("");
    setOptionId("");
    setEngineTypeId("");
    setEnginePower("");
    setTransmitionId("");
    setYear("");
    setLastMile("");
    setVinCode("");
    setPhoneNumber("");
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value as string);
  };

  const handleChangeModel = (event: SelectChangeEvent) => {
    setModelId(Number(event.target.value));
  };

  const [listModel, setListModel] = useState<Model[]>([]);

  const getModelData = async () => {
    await AxiosInstance.get<Model[]>("/car-model/get-all-models")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setListModel(response.data);
        }
      })
      .catch((error) => {
        alert(error + "");
      });
  };

  useEffect(() => {
    getModelData();
  }, []);

  const handleChangeEngineType = (event: SelectChangeEvent) => {
    setEngineTypeId(Number(event.target.value));
  };

  const [engineList, setEngineList] = useState<Engine[]>([]);

  const getDataEngine = async () => {
    await AxiosInstance.get<Engine[]>("/car-engine/get-all-car-engine")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setEngineList(response.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getDataEngine();
  }, []);

  const handleChangeTransmition = (event: SelectChangeEvent) => {
    setTransmitionId(Number(event.target.value));
  };

  const [transmitionList, setTransmitionList] = useState<Transmition[]>([]);

  const getTransmitionData = async () => {
    await AxiosInstance.get<Transmition[]>("/car-transmition/get-all")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setTransmitionList(response.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getTransmitionData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangeOption = (event: SelectChangeEvent) => {
    setOptionId(Number(event.target.value));
  };

  const [getOptionlist, setGetOption] = useState<Option[]>([]);

  const getOption = async () => {
    await AxiosInstance.get<Option[]>("/car-option/get-car-options")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setGetOption(response.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getOption();
  }, []);

  const [listUsers, setListUsers] = useState<UserI[]>([]);

  const getUsers = async () => {
    await AxiosInstance.get("/users/get-all-users-full")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setListUsers(resp.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      updateCar();
    }
  };

  function addCarImages(id: number) {
    let formData = new FormData();
    if (selectedImages?.length && selectedImages.length > 0) {
      for (let k = 0; k < selectedImages.length; k++) {
        formData.append("image", selectedImages[k]);
      }
    }
    AxiosInstanceFormData.post(`/car-image/add-image/${id}`, formData)
      .then((response) => {
        props.getData();
      })
      .catch((error) => {
        alert(error + "");
      });
  }

  function updateCar() {
    const data = {
      name: name,
      status: statusValue,
      modelId: Number(modelId),
      optionId: Number(optionId),
      engineTypeId: Number(engineTypeId),
      enginePower: Number(enginePower),
      transmitionId: transmitionId,
      year: Number(year),
      lastMile: Number(lastMile),
      vinCode: vinCode,
      phoneNumber: phoneNumber,
      usersId: Number(usersId),
    };
    AxiosInstance.patch(`/cars/update-car/${props.item.id}`, data)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully updated  car!");
          handleClose();
          setLoading(false);
          props.getData();
          addCarImages(response.data.id);
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  const [listAllCars, setListAllCars] = useState<AllCars[]>([]);

  const getAllCarsData = async () => {
    await AxiosInstance.get<AllCars[]>("/cars/get-all-cars")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setListAllCars(resp.data);
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  useEffect(() => {
    getAllCarsData();
  }, []);

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
            <Box sx={addCarStyle}>
              <Stack
                direction="row"
                alignItems={"center"}
                pb={1}
                justifyContent={"space-between"}
              >
                <Typography sx={PageName}>Add Car</Typography>,
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
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Model
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={`${modelId}`}
                      label="Car Model"
                      onChange={handleChangeModel}
                    >
                      {listModel
                        ? listModel?.map((item, i) => {
                            return (
                              <MenuItem
                                value={item.id}
                                key={`get_model_id_key+${i}`}
                              >
                                {item.name}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Engine Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={`${engineTypeId}`}
                      label="Car Engine Type"
                      onChange={handleChangeEngineType}
                    >
                      {engineList
                        ? engineList?.map((item, i) => {
                            return (
                              <MenuItem
                                value={item.id}
                                key={`item_status+${i}`}
                              >
                                {item.name_tm}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Transmition
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={`${transmitionId}`}
                      label="Car Transmition"
                      onChange={handleChangeTransmition}
                    >
                      {transmitionList
                        ? transmitionList?.map((item, i) => {
                            return (
                              <MenuItem
                                value={item.id}
                                key={`item_status+${i}`}
                              >
                                {item.name_tm}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Year"
                    variant="outlined"
                    type={"number"}
                    fullWidth
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Last Mile"
                    variant="outlined"
                    fullWidth
                    value={lastMile}
                    onChange={(e) => setLastMile(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Vin Code"
                    variant="outlined"
                    fullWidth
                    value={vinCode}
                    onChange={(e) => setVinCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Engine Power"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={enginePower}
                    onChange={(e) => setEnginePower(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Option
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={`${optionId}`}
                      label="Car Option"
                      onChange={handleChangeOption}
                    >
                      {getOptionlist
                        ? getOptionlist?.map((item, i) => {
                            return (
                              <MenuItem
                                value={item.id}
                                key={`get_item_status_key+${i}`}
                              >
                                {item.name_tm}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={listUsers}
                    fullWidth
                    getOptionLabel={(user) => user.fullname}
                    renderInput={(params) => (
                      <TextField {...params} label="Users" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    sx={ButtonStyle}
                    startIcon={<PhotoCamera />}
                    variant="contained"
                    component="label"
                    fullWidth
                  >
                    Upload Images
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleImageChange}
                      multiple
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
                  onClick={handleClear}
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

export default UpdateCar;
