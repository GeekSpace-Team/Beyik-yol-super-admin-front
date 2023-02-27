import {
  Button,
  Pagination,
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
import { useTranslation } from "react-i18next";
import { UserI } from "../../common/model";
import { AxiosInstance } from "../../api/AxiosInstance";
import { convertToDate, getImageUrl, ImageType } from "../../common/utils";

const Users: FC = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<UserI[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const blockUser = async (id: number) => {
    await AxiosInstance.patch("/users/toggle-user-block/" + id)
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          getData();
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getData = async () => {
    await AxiosInstance.get(`/users/get-all-users?page=${page}&limit=20`)
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setList(resp.data.users);
          setPageCount(resp.data.pageCount);
        }
      })
      .catch((err) => {
        alert(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <>
      <Stack
        direction="row"
        alignItems={"center"}
        pb={3}
        justifyContent={"space-between"}
      >
        <Typography sx={PageName}>{t("user")}</Typography>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell>
                <Typography sx={TableHeadStyle}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Full Name</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>User Name</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Phone Number</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Date</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Image</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Blocked</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, i) => {
              return (
                <TableRow key={`get_all_users_key${i}`}>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.fullname}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.username}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>
                      {item.phonenumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>
                      {convertToDate(item.dob)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={
                        item.image && item.image.length > 0
                          ? getImageUrl(item.image, ImageType.User)
                          : ""
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {!item.blocked ? (
                      <Button
                        sx={{
                          ...TableCellStyle,
                          color: "green",
                          textTransform: "none",
                        }}
                        onClick={(e) => blockUser(item.id)}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        sx={{
                          ...TableCellStyle,
                          color: "red",
                          textTransform: "none",
                        }}
                        onClick={(e) => blockUser(item.id)}
                      >
                        Unblock
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography sx={TableCellStyle}>{item.status}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent={"center"}>
        <Pagination
          count={pageCount}
          onChange={handleChange}
          color="primary"
          page={page}
          sx={{ mt: 3 }}
        />
      </Stack>
    </>
  );
};

export default Users;
