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
import { showError } from "../../components/alert/Alert";
import { Helmet } from "react-helmet-async";

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
        showError(err + "");
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
        showError(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <>
      <Helmet>
        <title> Beyik Yol | Users Table </title>
      </Helmet>
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
                <Typography sx={TableHeadStyle}>{t("fullname")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("user_name")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("phoneNumber")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("date")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("image")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("blocked")}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TableHeadStyle}>{t("status")}</Typography>
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
                        onClick={(e) => blockUser(item.id ? item.id : 0)}
                      >
                        {t("blocked")}
                      </Button>
                    ) : (
                      <Button
                        sx={{
                          ...TableCellStyle,
                          color: "red",
                          textTransform: "none",
                        }}
                        onClick={(e) => blockUser(item.id ? item.id : 0)}
                      >
                        {t("unBlock")}
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
