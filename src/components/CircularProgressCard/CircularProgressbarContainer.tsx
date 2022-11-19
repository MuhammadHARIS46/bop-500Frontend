import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  circularProgressClasses,
  useTheme,
} from "@mui/material";

interface IProps {
  circularPercentage: number;
}
function CircularProgressbarContainer({ circularPercentage }: IProps) {
  const theme = useTheme();
  return (
    <Box display="inline-flex" position="relative">
      <Box
        sx={{
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: `${theme.colors.secondary.dark}`,
          }}
          variant="h5"
        >
          {circularPercentage}%
        </Typography>
      </Box>
      <CircularProgress
        variant="determinate"
        sx={{
          color: theme.colors.secondary.lighter,
        }}
        size={55}
        thickness={2}
        value={100}
      />
      <CircularProgress
        size={55}
        sx={{
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          color: theme.colors.secondary.dark,
          top: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        thickness={2}
        variant="determinate"
        value={circularPercentage}
      />
    </Box>
  );
}

export default CircularProgressbarContainer;
