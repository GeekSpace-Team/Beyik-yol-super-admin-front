import {
  Backdrop,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import {
  ButtonStyle,
  Color,
  PageName,
  TableCellStyle,
  TableHeadStyle,
} from "../../assets/theme/theme";
import Fade from "@mui/material/Fade";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 4,
};

const Users: FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Delete user modal section starts here ...................................................................
  const DeleteUser = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <>
        <IconButton sx={{ color: "red" }} onClick={handleOpen}>
          <DeleteIcon />
        </IconButton>
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
              <Typography sx={{ textAlign: "center" }}>
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
  const AddUser = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [year, setYear] = useState("2022");
    return (
      <>
        <div>
          <Button onClick={handleOpen} sx={ButtonStyle} variant="contained">
            Add User
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
                  <Typography>Add User</Typography>
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
                      label="User Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Car Number"
                      variant="outlined"
                      type={"number"}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Car Model"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Car year"
                      variant="outlined"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      type={"number"}
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
  const UpdateUser = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [year, setYear] = useState("2022");
    return (
      <>
        <div>
          <IconButton sx={{ color: Color.primary }} onClick={handleOpen}>
            <EditIcon />
          </IconButton>
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
                  <Typography>Edit User</Typography>
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
                      label="User Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Car Number"
                      variant="outlined"
                      type={"number"}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Car Model"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} sm={7} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Car year"
                      variant="outlined"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      type={"number"}
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
                    sx={ButtonStyle}
                    startIcon={<ClearIcon />}
                    variant="contained"
                  >
                    Clear
                  </Button>
                  <Button
                    sx={ButtonStyle}
                    startIcon={<SaveIcon />}
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
      <Stack
        // direction="row"
        alignItems={"center"}
        pb={3}
        justifyContent={"space-between"}
      >
        <Typography sx={PageName}>{t("user")}</Typography>
        <AddUser />
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
                <Typography sx={TableHeadStyle}>Car Number</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car Model</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Car year</Typography>
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
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>DZ 7777 DZ</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>

              <TableCell>
                <UpdateUser />
              </TableCell>
              <TableCell>
                <DeleteUser />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>DZ 7777 DZ</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>

              <TableCell>
                <UpdateUser />
              </TableCell>
              <TableCell>
                <DeleteUser />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>DZ 7777 DZ</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>

              <TableCell>
                <UpdateUser />
              </TableCell>
              <TableCell>
                <DeleteUser />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography sx={TableCellStyle}>1</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Halil Gayypov</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>DZ 7777 DZ</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>BMW X7</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>2022</Typography>
              </TableCell>

              <TableCell>
                <UpdateUser />
              </TableCell>
              <TableCell>
                <DeleteUser />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
