import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  SwipeableDrawer,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddModel from "./AddModel";
import UpdateModel from "./UpdateModel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Color, Fonts } from "../../../assets/theme/theme";
import { Model } from "../../../common/model";
import { AxiosInstance } from "../../../api/AxiosInstance";
import { showError, showSuccess } from "../../../components/alert/Alert";

type Anchor = "top" | "left" | "bottom" | "right";
interface IProps {
  models: Model[];
  brandId: number;
  getData(): void;
}
const CarModel: FC<IProps> = (props: IProps) => {
  const [listModel, setListModel] = useState<Model[]>(props.models);
  const [brId, setBrId] = useState(props.brandId);
  const [state, setState] = useState({
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
      setListModel(props.models);
      setBrId(props.brandId);
      setState({ ...state, [anchor]: open });
    };

  function deleteCarModel(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/car-model/delete-car-model/" + id)
        .then((response) => {
          showSuccess("Deleted!");
          // setLoading(false);
          props.getData();
        })
        .catch((err) => {
          // setLoading(false);
          showError(err.toString());
        });
    }
  }

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
        <AddModel getData={props.getData} brandId={brId} />
      </Stack>
      {listModel.map((item, i) => {
        return (
          <Card key={`car_model_get_key${i}`} sx={{ marginBottom: 3 }}>
            <CardActionArea>
              <CardContent>
                <Stack direction="row" pb={2} spacing={10}>
                  <Typography sx={{ fontFamily: Fonts.OpenSansBold }}>
                    {item.id}
                  </Typography>
                  <Typography sx={{ fontFamily: Fonts.OpenSansBold }}>
                    {item.name}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: Fonts.OpenSansMedium,
                    color: Color.solid,
                  }}
                >
                  {item.description}
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
                      {item.status}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems={"center"} spacing={2}>
                    <UpdateModel
                      getData={props.getData}
                      item={item}
                      brandId={brId}
                    />
                    <Tooltip title="Delete">
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() => deleteCarModel(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
  return (
    <div>
      <React.Fragment key={"right"}>
        <Tooltip title="Car Model">
          <IconButton onClick={toggleDrawer("right", true)}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
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
  );
};

export default CarModel;
