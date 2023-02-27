import { Stack, Typography } from "@mui/material";
import React from "react";
import { PageName } from "../../assets/theme/theme";

const Inbox = () => {
  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} pb={3}>
        <Typography sx={PageName}>Inbox</Typography>
      </Stack>
    </>
  );
};

export default Inbox;
