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
import React, { FC, useState } from "react";
import { Color, Fonts } from "../../assets/theme/theme";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { SubRegionI } from "../../common/model";
import AddSubRegion from "./AddSubRegion";
import { AxiosInstance } from "../../api/AxiosInstance";
import { showError, showSuccess } from "../../components/alert/Alert";
import { useTranslation } from "react-i18next";
import UpdateSubRegion from "./UpdateSubRegion";
import CloseIcon from "@mui/icons-material/Close";

type Anchor = "top" | "left" | "bottom" | "right";
interface IProps {
  subRegion: SubRegionI[];
  regionId: number;
  getData(): void;
}
const SubRegion: FC<IProps> = (props: IProps) => {
  const { t } = useTranslation();
  const [listSub, setList] = useState<SubRegionI[]>(props.subRegion);
  const [rId, setRid] = useState(props.regionId);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function deleteSubRegion(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/sub-region/remove-sub-region/" + id)
        .then((response) => {
          showSuccess(t("Deleted!"));
          // setLoading(false);
          props.getData();
        })
        .catch((err) => {
          // setLoading(false);
          showError(err.toString());
        });
    }
  }

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
      setList(props.subRegion);
      setState({ ...state, [anchor]: open });
      setRid(props.regionId);
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
        <Stack direction="row" spacing={3} alignItems="center">
          <Tooltip title="Close">
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ fontFamily: Fonts.RalewayBold, fontSize: "18px" }}>
            {t("subRegion")}
          </Typography>
        </Stack>
        <AddSubRegion getData={props.getData} regionId={rId} />
      </Stack>

      {listSub.map((item, i) => {
        return (
          <Card key={`sub_region_get_key${i}`} sx={{ marginBottom: "12px" }}>
            <CardActionArea>
              <CardContent>
                <Stack direction="row" pb={2} spacing={10}>
                  <Typography sx={{ fontFamily: Fonts.OpenSansBold }}>
                    {item.id}
                  </Typography>
                  <Typography sx={{ fontFamily: Fonts.OpenSansBold }}>
                    {item.name_tm}
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
                <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                  <UpdateSubRegion
                    getData={props.getData}
                    regionId={rId}
                    item={item}
                  />
                  <Tooltip title="Delete">
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => deleteSubRegion(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
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
        <Tooltip title={t("subRegion")}>
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

export default SubRegion;
