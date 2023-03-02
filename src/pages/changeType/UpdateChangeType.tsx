import React, { FC, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { AxiosInstance } from "../../api/AxiosInstance";
import { showError, showSuccess } from "../../components/alert/Alert";
import { ButtonStyle, Color, Fonts } from "../../assets/theme/theme";
import { style } from "../cars/Cars";
import EditIcon from "@mui/icons-material/Edit";
import { ChangeTypeI } from "./ChangeType";

interface IProps {
  getData(): void;
  item: ChangeTypeI;
}

const UpdateChangeType: FC<IProps> = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setNameRu(props.item.name_tm);
    setNameRu(props.item.name_ru);
  };
  const handleClose = () => setOpen(false);
  const [name_tm, setNameTm] = useState(props.item.name_tm);
  const [name_ru, setNameRu] = useState(props.item.name_ru);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      updateData();
    }
  };

  function updateData() {
    const body = {
      name_tm: name_tm,
      name_ru: name_ru,
    };
    AxiosInstance.patch(
      `/change-type/update-change-type/${props.item.id}`,
      body
    )
      .then((response) => {
        if (!response.data.error) {
          showSuccess("Successfully edited Price!");
          handleClose();
          setLoading(false);
          props.getData();
        } else {
          showError("Something went wrong!");
        }
      })
      .catch((error) => {
        showError(error + "");
      });
  }

  return (
    <>
      <div>
        <Tooltip title="Edit Price">
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
                  Add Change Type
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
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={name_tm}
                    onChange={(e) => setNameTm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={7} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={name_ru}
                    onChange={(e) => setNameRu(e.target.value)}
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

export default UpdateChangeType;
