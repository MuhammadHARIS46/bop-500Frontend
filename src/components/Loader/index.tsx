import { Box, CircularProgress } from "@mui/material";
import { SxProps } from "@mui/system";

export type CircularProgressType = {
  size?: number;
  thickness?: number;
};

export interface IProps {
  circularProgressbarProps?: CircularProgressType;
  sx?: SxProps;
}

function Loader({ circularProgressbarProps, sx }: IProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        ...sx,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        size={64}
        disableShrink
        thickness={3}
        {...circularProgressbarProps}
      />
    </Box>
  );
}

export default Loader;
