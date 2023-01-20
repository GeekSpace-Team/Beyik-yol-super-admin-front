import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import Image from "@jy95/material-ui-image";
import {
  ButtonStyle,
  Color,
  Fonts,
  PageName,
  TableCellStyle,
  TableHeadStyle,
} from "../../assets/theme/theme";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { ItemStatus } from "../../components/itemStatus/ItemStatus";
import { deleteStyle, style } from "../cars/Cars";
import { useTranslation } from "react-i18next";

const Ads: FC = () => {
  // Delete user modal section starts here ...................................................................
  const DeleteAds = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <>
        <Tooltip title={t("delete")}>
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
                You serously want to delete this user items ?
              </Typography>
              <Stack
                direction="row"
                mt={5}
                justifyContent={"flex-end"}
                spacing={2}
              >
                <Button
                  startIcon={<CancelIcon />}
                  onClick={handleClose}
                  variant="contained"
                  sx={ButtonStyle}
                >
                  Cancel
                </Button>
                <Button
                  sx={ButtonStyle}
                  startIcon={<CheckIcon />}
                  variant="contained"
                >
                  Yes
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </>
    );
  };
  // Delete user modal section ends here .....................................................................

  // Add user modal section starts here ..............................................................
  const AddAds = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [year, setYear] = useState("2022");
    const [status, setStatus] = useState("Active");

    const handleChange = (event: SelectChangeEvent) => {
      setStatus(event.target.value as string);
    };
    return (
      <>
        <div>
          <Button onClick={handleOpen} sx={ButtonStyle} variant="contained">
            Add Ads
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
                  <Typography sx={PageName}>Add Ads</Typography>
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
                      label="Title TM"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Title RU"
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
                    <TextField
                      id="outlined-basic"
                      label="Type"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="URL / Link"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Created At"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Updated At"
                      variant="outlined"
                      fullWidth
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
                    startIcon={<ClearIcon />}
                    sx={ButtonStyle}
                    variant="contained"
                  >
                    Clear
                  </Button>
                  <Button
                    startIcon={<SaveIcon />}
                    sx={ButtonStyle}
                    variant="contained"
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Modal>
        </div>
      </>
    );
  };
  // Add user modal section ends here ..............................................................

  // Update user modal section starts here ..........................................................
  const UpdateAds = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [year, setYear] = useState("2022");
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
                  <Typography sx={PageName}>Edit Ads</Typography>
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
                      label="Title TM"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Title RU"
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
                    <TextField
                      id="outlined-basic"
                      label="Type"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="URL / Link"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Created At"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Updated At"
                      variant="outlined"
                      fullWidth
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
                    startIcon={<ClearIcon />}
                    sx={ButtonStyle}
                    variant="contained"
                  >
                    Clear
                  </Button>
                  <Button
                    startIcon={<SaveIcon />}
                    sx={ButtonStyle}
                    variant="contained"
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Modal>
        </div>
      </>
    );
  };
  // Update user modal section ends here ..........................................................

  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} pb={3}>
        <Typography sx={PageName}>Ads</Typography>
        <AddAds />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Title TM</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Title RU</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Image</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Type</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>URL/Link</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Created At</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Updated At</Typography>
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
                <Typography sx={TableCellStyle}>Halil</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Active</Typography>
              </TableCell>
              <TableCell>
                <Image src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80" />
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Type</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>youtube.com</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>13.12.2022</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>17.12.2022</Typography>
              </TableCell>
              <TableCell>
                <UpdateAds />
              </TableCell>
              <TableCell>
                <DeleteAds />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Ads;
