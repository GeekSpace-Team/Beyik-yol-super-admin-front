import { FC } from "react";
import { Box, Stack } from "@mui/material";

const Push: FC = () => {
  return (
    <>
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={-6}
        justifyContent={"center"}
      >
        <img
          src="/images/Tm.svg"
          style={{ width: "35px", height: "35px", zIndex: "10" }}
          alt="Alt"
        />
        <div className="switch">
          <input type="checkbox" />
          <label htmlFor="chechkbox"></label>
        </div>
        <img
          src="/images/ru.svg"
          alt="Alt"
          style={{ width: "35px", height: "35px", zIndex: "10" }}
        />
      </Stack>
    </>
  );
};

export default Push;
