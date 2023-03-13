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
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
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

const Ads: FC = () => {
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
      <Stack direction="row" justifyContent={"space-between"} pb={3}>
        <Typography sx={PageName}>Ads</Typography>
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
                <Typography sx={TableHeadStyle}>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
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
                    <IconButton
                      color={"error"}
                      onClick={() => deleteAds(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
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
