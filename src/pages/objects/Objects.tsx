import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
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
import Image from "@jy95/material-ui-image";
import {
  ButtonStyle,
  Color,
  Fonts,
  PageName,
  TableCellStyle,
  TableHeadStyle,
} from "../../assets/theme/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { deleteStyle, style } from "../cars/Cars";
import { useTranslation } from "react-i18next";

const Objects: FC = () => {
  // Delete user modal section starts here ...................................................................
  const DeleteObject = () => {
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
  const AddObject = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <div>
          <Button onClick={handleOpen} sx={ButtonStyle} variant="contained">
            Add Object
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
                  <Typography sx={PageName}>Add Object</Typography>
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
  const UpdateObject = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                  <Typography sx={PageName}>Edit Object</Typography>
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
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
        pb={3}
      >
        <Typography sx={PageName}>Objects</Typography>
        <AddObject />
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
                <Typography sx={TableHeadStyle}>Address TM</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Address RU</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Phone Number</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Image</Typography>
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
                <Typography sx={TableCellStyle}>Dashoguz</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Dasoguz</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>+993 63 430338</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableCellStyle}>Active</Typography>
              </TableCell>
              <TableCell>
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknCejVZRaaamdFukqNwV_yrvVEvGqBX-khigi2jcyWEziAp2c4Hu_rp_xfn8SIVVTv94&usqp=CAU" />
              </TableCell>
              <TableCell>
                <UpdateObject />
              </TableCell>
              <TableCell>
                <DeleteObject />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Objects;
