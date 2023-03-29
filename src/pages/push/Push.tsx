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
import {
  PageName,
  TableCellStyle,
  TableHeadStyle,
} from "../../assets/theme/theme";
import SendPush from "./SendPush";
import DeleteIcon from "@mui/icons-material/Delete";
import { PusherI } from "../../common/model";
import { AxiosInstance } from "../../api/AxiosInstance";
import { showError, showSuccess } from "../../components/alert/Alert";
import { AppContext } from "../../App";
import { Helmet } from "react-helmet-async";

const Push: FC = () => {
  const { t } = useContext(AppContext);
  const [list, setList] = useState<PusherI[]>([]);

  const getData = async () => {
    await AxiosInstance.get("/inbox/get-all-inbox")
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList(resp.data);
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteInbox(id: number) {
    if (window.confirm("want_delete")) {
      AxiosInstance.delete("/inbox/delete-inbox/" + id)
        .then((response) => {
          showSuccess("Deleted Inbox!");
          getData();
        })
        .catch((err) => {
          showError(err.toString());
        });
    }
  }

  return (
    <>
      <Helmet>
        <title> Beyik Yol | Inbox Table </title>
      </Helmet>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
        pb={3}
      >
        <Typography sx={PageName}>{t("inbox")}</Typography>
        <SendPush getData={getData} />
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
                <Typography sx={TableHeadStyle}>{t("messageTm")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("messageRu")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("url")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("delete")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, i) => {
              return (
                <TableRow key={`get_all_inbox_key${i}`}>
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
                    <Typography sx={TableCellStyle}>
                      {item.messageTm}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography sx={TableCellStyle}>
                      {item.messageRu}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.url}</Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={t("delete")}>
                      <IconButton
                        color={"error"}
                        onClick={() => deleteInbox(item.id)}
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

export default Push;
