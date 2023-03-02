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

const Push: FC = () => {
  const [list, setList] = useState<PusherI[]>([]);

  const getData = async () => {
    await AxiosInstance.get("/inbox/get-all-inbox")
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
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
        pb={3}
      >
        <Typography sx={PageName}>Inbox</Typography>
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
                <Typography sx={TableHeadStyle}>Title TM</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Title RU</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Message Tm</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Message Ru</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>URL/Link</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Delete</Typography>
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
                    <IconButton
                      color={"error"}
                      onClick={() => deleteInbox(item.id)}
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

export default Push;
