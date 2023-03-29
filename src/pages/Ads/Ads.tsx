import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import Image from "@jy95/material-ui-image";
import {
  PageName,
  TableCellStyle,
  TableHeadStyle,
} from "../../assets/theme/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import { AxiosInstance } from "../../api/AxiosInstance";
import { AdsI } from "../../common/model";
import { showError, showSuccess } from "../../components/alert/Alert";
import { getImageUrl, ImageType } from "../../common/utils";
import AddAds from "./AddAds";
import UpdateAds from "./UpdateAds";
import { AppContext } from "../../App";
import { Helmet } from "react-helmet-async";

const Ads: FC = () => {
  const { t } = useContext(AppContext);
  const [list, setList] = useState<AdsI[]>([]);

  const getData = async () => {
    await AxiosInstance.get<AdsI[]>("/ads/get-all-ads")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList(resp.data);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteAds(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/ads/delete-ads/" + id)
        .then((response) => {
          showSuccess("Deleted!");
          // setLoading(false);
          getData();
        })
        .catch((err) => {
          // setLoading(false);
          showError(err.toString());
        });
    }
  }

  return (
    <>
      <Helmet>
        <title> Beyik Yol | Ads Table </title>
      </Helmet>
      <Stack direction="row" justifyContent={"space-between"} pb={3}>
        <Typography sx={PageName}>{t("ads")}</Typography>
        <AddAds getData={getData} />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("nameTm")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("nameRu")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("status")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("image")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("type")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("url")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("edit")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("delete")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, i) => {
              return (
                <TableRow key={`get_ads_key${i}`}>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.titleTm}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.titleRu}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.status}</Typography>
                  </TableCell>
                  <TableCell>
                    {/* <Image src={getImageUrl(item.adsImage, ImageType.Ads)} /> */}
                    <Image
                      src={
                        item.adsImage && item.adsImage.length > 0
                          ? getImageUrl(item.adsImage[0].url, ImageType.Ads)
                          : ""
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.adsType}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.url}</Typography>
                  </TableCell>
                  <TableCell>
                    <UpdateAds getData={getData} item={item} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={t("delete")}>
                      <IconButton
                        color={"error"}
                        onClick={() => deleteAds(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Ads;
