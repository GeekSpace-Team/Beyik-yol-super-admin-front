import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { ButtonStyle } from "../../../assets/theme/theme";
import { deleteStyle } from "../../../pages/cars/Cars";

const DeleteCar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="delete">
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

export default DeleteCar;
