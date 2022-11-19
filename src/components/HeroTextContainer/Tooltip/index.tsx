import { useSelector } from "@/app/store";
import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton, styled, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import React from "react";
import { StyledBookButton } from "./stylesheet";

const TooltipComponent = () => {
  const { activeCategory } = useSelector((state) => state.cities);

  const CustomWidthTooltip = styled(({ className, ...props }: any) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 400,
      backgroundColor: "rgb(121 169 209 / 97%)",
      padding: 0,
      overflowTop: "hidden",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "rgb(121 169 209 / 97%)",
    },
  });

  return (
    <CustomWidthTooltip
      placement="top"
      arrow
      title={
        <Box>
          <Box
            sx={{
              backgroundColor: "rgb(46 126 161 / 82%)",
              padding: "10px",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{
                color: (theme) => theme.colors.alpha.trueWhite[70],
              }}
            >
              {activeCategory?.indicator_label}
            </Typography>
            <Typography variant="h4" color="white" sx={{ fontSize: "1rem" }}>
              What {activeCategory?.indicator_label} are there in the city?
            </Typography>
            <Typography
              variant="h5"
              my={1.5}
              sx={{
                color: (theme) => theme.colors.alpha.trueWhite[70],
                fontWeight: 500,
              }}
            >
              Measure of the total {activeCategory?.indicator_label} asset base.
            </Typography>
          </Box>
          <Box sx={{ padding: "10px", display: "flex", alignItems: "center" }}>
            <Typography fontWeight={600} mr={2}>
              {`Need support to analyse your cities data or get additional data
              sets?`}
            </Typography>
            <StyledBookButton variant="contained">{`Book a call`}</StyledBookButton>
          </Box>
        </Box>
      }
    >
      <IconButton component="span" size="small" color="secondary">
        <InfoIcon fontSize="small" />
      </IconButton>
    </CustomWidthTooltip>
  );
};

export default TooltipComponent;
