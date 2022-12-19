import React, { FC, useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Image from "@jy95/material-ui-image";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Backdrop,
  Tab,
  Tabs,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  SwipeableDrawer,
  Card,
  CardActionArea,
  CardContent,
  TextareaAutosize,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import {
  ButtonStyle,
  Color,
  indicatorTable,
  PageName,
  TabsStyle,
  TableCellStyle,
  TableHeadStyle,
  TabStyle,
  Fonts,
} from "../../assets/theme/theme";
import { Tooltip } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ItemStatus } from "../../components/itemStatus/ItemStatus";

// Delete Car modal section starts here ...................................................................
const DeleteCar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="Delete">
        <IconButton sx={{ color: "red" }} onClick={handleOpen}>
          <DeleteIcon />
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
          timeout: 200,
        }}
      >
        <Fade in={open}>
          <Box sx={deleteStyle}>
            <Typography sx={{ textAlign: "center" }}>
              You serously want to delete this car items ?
            </Typography>
            <Stack
              direction="row"
              mt={5}
              justifyContent={"flex-end"}
              spacing={2}
            >
              <Button
                sx={ButtonStyle}
                startIcon={<CancelIcon />}
                onClick={handleClose}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                sx={ButtonStyle}
                startIcon={<CheckIcon />}
                variant="contained"
              >
                yes
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
// Delete Car modal section ends here .....................................................................

// Add car modal section starts here ..............................................................
const AddCar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("Active");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <div>
        <Button sx={ButtonStyle} onClick={handleOpen} variant="contained">
          Add car
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
                <Typography sx={PageName}>Add Car</Typography>
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Model
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Model"
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Option
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Option"
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Engine Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Engine Type"
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Transmition
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Transmition"
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
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Year"
                    variant="outlined"
                    type={"number"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Created at"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Updated at"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Users</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Users"
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
// Add car modal section ends here ..............................................................

// Update Car modal section starts here ..........................................................
const UpdateCar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("Active");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <div>
        <Tooltip title="Edit">
          <IconButton sx={{ color: Color.primary }} onClick={handleOpen}>
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
            timeout: 10000,
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
                <Typography sx={PageName}>Edit Car</Typography>
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Model
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Model"
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Option
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Option"
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Engine Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Engine Type"
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Transmition
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Transmition"
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
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Year"
                    variant="outlined"
                    type={"number"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Created at"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Updated at"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Users</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Users"
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
// Update Car modal section ends here ..........................................................

// Car Transmition Table section starts here .......................................................
const CarTransmitionTable = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction="row" pb={3} justifyContent={"flex-end"}>
        <AddTransmitionModal />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Name TM</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Name RU</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Description</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Alyyev Shagen</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Alyyev Shagen</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <DeleteCar />
              </TableCell>
              <TableCell>
                <UpdateTransmitionModal />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const UpdateTransmitionModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
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
                  Edit Car Transmition
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
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name RU"
                    variant="outlined"
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
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={2}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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

const AddTransmitionModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <div>
        <Button onClick={handleOpen} variant="contained" sx={ButtonStyle}>
          Add Transmition
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
                  Add Car Transmition
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
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name RU"
                    variant="outlined"
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
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={2}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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

// Car Transmition Table section ends here ........................................................

// Car Engine Table section ends here .............................................................
const CarEngineTable = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction="row" pb={3} justifyContent={"flex-end"}>
        <AddEngineModal />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Name TM</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Name RU</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Description</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Alyyev Shagen</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Alyyev Shagen</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <DeleteCar />
              </TableCell>
              <TableCell>
                <UpdateEngineModal />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const UpdateEngineModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
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
                  Edit Car Engine
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
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name RU"
                    variant="outlined"
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
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={2}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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

const AddEngineModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <div>
        <Button onClick={handleOpen} variant="contained" sx={ButtonStyle}>
          Add Engine
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
                  Add Car Engine
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
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name RU"
                    variant="outlined"
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
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={2}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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

// Car Engine Table section ends here .............................................................

// Car Option Table section starts here .......................................................
const CarOptionTable = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction="row" pb={3} justifyContent={"flex-end"}>
        <AddOptionModal />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Name</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Description</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Brand</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Alyyev Shagen</Typography>
              </TableCell>
              <TableCell>
                <Image src="https://avatars.mds.yandex.net/get-autoru-vos/2163561/365b94dadbb6697c226eeebf162dd77e/456x342n" />
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <DeleteCar />
              </TableCell>
              <TableCell>
                <UpdateOptionModal />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

// Add Car Option Modal section starts here ......................................
const UpdateOptionModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
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
                  Edit Car Option
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Brand
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Brand"
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
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={2}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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
// Add Car Option Modal section ends here ----------------------------------------

// Add Car Option Modal section starts here ......................................
const AddOptionModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <div>
        <Button sx={ButtonStyle} onClick={handleOpen} variant="contained">
          Add Option
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
                  Add Car Option
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Car Brand
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Car Brand"
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
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={2}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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
// Add Car Option Modal section ends here ----------------------------------------
// Car Option Table section ends here .........................................................

// Second Cars Tab section starts here ...................................................................................................................................
// _______________________________________________________________________________________________________________________________________________________
// _______________________________________________________________________________________________________________________________

//  Delete Model Modal section starts here ........................................
const DeleteModelModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <div>
        <Tooltip title="Delete Model">
          <IconButton sx={{ color: "red" }} onClick={handleOpen}>
            <DeleteIcon />
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
            <Box sx={deleteStyle}>
              <Typography
                sx={{
                  fontFamily: Fonts.RalewayBold,
                  fontSize: "17px",
                  textAlign: "center",
                }}
              >
                Do you want to delete this Car Model Item ?
              </Typography>
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
                  onClick={handleClose}
                >
                  Cancel
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
                    Yes
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
//  Delete Model Modal section ends here ..........................................

//  Add Model Modal section starts here ........................................
const AddModelModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <div>
        <Button sx={ButtonStyle} onClick={handleOpen} variant="contained">
          Add Model
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
                <Grid item xs={12} sm={12} md={12}>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={6}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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
//  Add Model Modal section ends here ..........................................

//  Update Model Modal section starts here ........................................
const UpdateModelModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
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
                  Update Model
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
                <Grid item xs={12} sm={12} md={12}>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={6}
                    style={{ width: "100%" }}
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
//  Update Model Modal section ends here ..........................................

type Anchor = "top" | "left" | "bottom" | "right";
const CarBrandTable = () => {
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 500, p: 5 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        pb={3}
        alignItems="center"
      >
        <Typography sx={{ fontFamily: Fonts.RalewayBold, fontSize: "18px" }}>
          Car Model
        </Typography>
        <AddModelModal />
      </Stack>
      <Card>
        <CardActionArea>
          <CardContent>
            <Stack direction="row" pb={2} spacing={10}>
              <Typography sx={{ fontFamily: Fonts.OpenSansBold }}>
                #ID
              </Typography>
              <Typography sx={{ fontFamily: Fonts.OpenSansBold }}>
                Title Name
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: Fonts.OpenSansMedium,
                color: Color.solid,
              }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatibus repellendus saepe aut ut molestiae expedita tempore
              fuga ipsum. Explicabo saepe reiciendis impedit corrupti, atque
              sequi quod dolores similique nulla aliquid.
            </Typography>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems="center"
              pt={2}
            >
              <Stack>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: Color.solid,
                    fontFamily: Fonts.OpenSansRegular,
                  }}
                >
                  Status
                </Typography>
                <Typography
                  sx={{ fontSize: "15px", fontFamily: Fonts.RalewayBold }}
                >
                  Pending
                </Typography>
              </Stack>
              <Stack direction="row" alignItems={"center"} spacing={2}>
                <UpdateModelModal />
                <DeleteModelModal />
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
  return (
    <>
      <div>
        <React.Fragment key={"right"}>
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", true)}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
      <Stack direction="row" pb={3} justifyContent={"flex-end"}>
        <AddBrandModal />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Name</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Image</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Description</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Model</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Alyyev Shagen</Typography>
              </TableCell>
              <TableCell>
                <Image src="https://avatars.mds.yandex.net/get-autoru-vos/2163561/365b94dadbb6697c226eeebf162dd77e/456x342n" />
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <DeleteCar />
              </TableCell>
              <TableCell>
                <UpdateBrandModal />
              </TableCell>
              <TableCell>
                <Tooltip title="Car Model">
                  <IconButton onClick={toggleDrawer("right", true)}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
// Second Cars Tab section ends here ..................................................................

// General Cars Tab section starts here ...............................................................
const CarTable = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack pb={3} direction="row" justifyContent={"flex-end"}>
        <AddCar />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("user_name")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Image</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Model</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Year</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>More</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Image src="/images/tmFlag.jpg" />
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>PENDING</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>
              <TableCell>
                <UpdateCar />
              </TableCell>
              <TableCell>
                <DeleteCar />
              </TableCell>
              <TableCell>
                <Link to="/carTable">
                  <Tooltip title="Full Information">
                    <IconButton sx={{ color: Color.secondaryDark }}>
                      <ArrowRightAltIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

// Car Table Full Information section starts here ......................................................
export const CarTableInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box sx={{ p: 5 }}>
        <Stack spacing={3} direction="row" alignItems={"center"} pb={3}>
          <Link to="/cars">
            <Tooltip title="Come Back!">
              <IconButton sx={{ color: Color.secondaryDark }}>
                <KeyboardBackspaceIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Typography sx={PageName}>Full Information Table</Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ background: "#f0f0f0" }}>
                <TableCell>
                  <Typography sx={TableHeadStyle}>ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>{t("user_name")}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Image</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Model</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Year</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Option</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Engine Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Car Transmition</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Phone Number</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Created At</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Updated At</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableHeadStyle}>Users</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography sx={TableCellStyle}>1</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
                </TableCell>
                <TableCell>
                  <Image src="/images/tmFlag.jpg" />
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>BMW X7</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>PENDING</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>2022</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Options</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Engine Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Transmition</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>+99363430338</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>13.12.2022</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>14.12.2023</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={TableCellStyle}>Alyyew Shagen</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
// Car Table Full Information section ends here ........................................................

// General Cars Tab section ends here ........................................................

// Tabs style section starts here ..............................................................
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const AnimationTab = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          position: "relative",
          minHeight: 200,
          border: "1px solid #fff",
          background: "#fff",
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
          position="static"
          color="default"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="action tabs example"
            TabIndicatorProps={{
              sx: { ...indicatorTable },
            }}
            sx={{
              ...TabsStyle,
            }}
          >
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px" }}
              label="Car"
              {...a11yProps(0)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Car Brand"
              {...a11yProps(1)}
            />

            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Car Option"
              {...a11yProps(2)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Car Engine"
              {...a11yProps(2)}
            />
            <Tab
              iconPosition="start"
              icon={<AirportShuttleIcon />}
              sx={{ ...TabStyle, height: "20px", marginLeft: "5px" }}
              label="Car Transmition"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <CarTable />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CarBrandTable />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <CarOptionTable />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <CarEngineTable />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <CarTransmitionTable />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};
// Tabs style section ends here ..............................................................

// Brand Table Section starts here .................................................................

// ++++++++++++++++++
// ----------------------------------------------------------------
// Add Brand Table Modal section starts here .............................
const AddBrandModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
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
                <Grid item xs={12} sm={12} md={12}>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={6}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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
// Add Brand Table Modal section ends here ...............................
//
//
// Update Brand Table section starts here ................................
const UpdateBrandModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [year, setYear] = useState("2022");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
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
                <Grid item xs={12} sm={12} md={12}>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Description"
                    minRows={6}
                    style={{
                      width: "100%",
                      fontFamily: Fonts.OpenSansMedium,
                      outline: "none",
                      padding: "10px",
                    }}
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
// Update Brand Table section ends here ..................................
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "#ffffff",
  border: "2px solid transparent",
  boxShadow: 24,
  borderRadius: "3px",
  p: 4,
};

const addCarStyle = {
  position: "absolute" as "absolute",
  width: "100%",
  height: "100%",
  bgcolor: "#ffffff",
  border: "2px solid transparent",
  boxShadow: 24,
  borderRadius: "3px",
  p: 4,
};

const deleteStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "#ffffff",
  border: "2px solid transparent",
  boxShadow: 24,
  borderRadius: "3px",
  p: 4,
};

const Cars: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack
        direction="row"
        alignItems={"center"}
        pb={3}
        justifyContent={"space-between"}
      >
        <Typography sx={PageName}>{t("cars_page")}</Typography>
      </Stack>
      <AnimationTab />
    </>
  );
};

export default Cars;
