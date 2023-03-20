import ClearIcon from "@mui/icons-material/Clear";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import React, { FC, useContext, useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { AppContext } from "../../../App";
import { ButtonStyle, Color, PageName } from "../../../assets/theme/theme";
import { showError, showSuccess } from "../../../components/alert/Alert";
import { addCarStyle } from "../../../pages/cars/Cars";

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
  Typography,
} from "@mui/material";
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

interface IProps {
  getData(): void;
}

const AddCar: FC<IProps> = (props: IProps) => {
  const { t } = useContext(AppContext);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { status } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [statusValue, setStatusValue] = useState("");
  const [name, setName] = useState("");
  const [modelId, setModelId] = useState("");
  const [optionId, setOptionId] = useState("");
  const [engineTypeId, setEngineTypeId] = useState("");
  const [enginePower, setEnginePower] = useState("");
  const [transmitionId, setTransmitionId] = useState("");
  const [year, setYear] = useState("");
  const [lastMile, setLastMile] = useState("");
  const [vinCode, setVinCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [usersId, setUsersId] = useState("");
  const [userValue, setUserValue] = useState<UserI | null>();

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  }

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value as string);
  };

  const handleChangeModel = (event: SelectChangeEvent) => {
    setModelId(event.target.value);
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
        showError(error + "");
      });
  };

  useEffect(() => {
    getModelData();
  }, []);

  const handleChangeEngineType = (event: SelectChangeEvent) => {
    setEngineTypeId(event.target.value);
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
        showError(err + "");
      });
  };

  useEffect(() => {
    getDataEngine();
  }, []);

  const handleChangeTransmition = (event: SelectChangeEvent) => {
    setTransmitionId(event.target.value);
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
        showError(err + "");
      });
  };

  useEffect(() => {
    getTransmitionData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangeOption = (event: SelectChangeEvent) => {
    setOptionId(event.target.value);
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
        showError(err + "");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      addAllCars();
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

  function addAllCars() {
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
    AxiosInstance.post("/cars/add-car", data)
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully added new car!");
          handleClose();
          setLoading(false);
          props.getData();
          addCarImages(response.data.id);
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
    setName("");
    setModelId("");
    setOptionId("");
    setEngineTypeId("");
    setEnginePower("");
    setTransmitionId("");
    setLastMile("");
    setVinCode("");
    setPhoneNumber("");
    setUsersId("");
    setYear("");
    setStatusValue("");
  };

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


  useEffect(() => {
    if(userValue && userValue.id) {
      setUsersId(`${userValue?.id.toString()}`);
    }
  },[userValue])

  return (
    <>
      <div>
        <Button sx={ButtonStyle} onClick={handleOpen} variant="contained">
          {t("addCar")}
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
                <Typography sx={PageName}> {t("addCar")}</Typography>,
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
                    onChange={(e) => setYear(e.target.value)}
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
                    onChange={(e) => setLastMile(e.target.value)}
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
                    onChange={(e) => setEnginePower(e.target.value)}
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
                    value={userValue}
                    onChange={(event: any, newValue: UserI | null) => {
                      setUserValue(newValue);
                    }}
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
                    {t("uploadImg")}
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
                onClick={clearInput}
              >
                <Button
                  sx={ButtonStyle}
                  startIcon={<ClearIcon />}
                  variant="contained"
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

export default AddCar;
