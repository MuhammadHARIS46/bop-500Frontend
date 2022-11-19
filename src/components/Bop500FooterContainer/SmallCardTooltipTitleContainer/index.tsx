import { Box, Typography } from "@mui/material";
import {
  StyledBookButtonDark,
  StyledBookButtonWhite,
  StyledBookButton,
} from "./stylesheet";

interface ITooltipTitleContainerProps {
  category: string;
  title: string;
  description: string;
  buttonType: "AccessData" | "ReadMore";
}

export const TooltipTitleContainer = ({
  category,
  title,
  description,
  buttonType,
}: ITooltipTitleContainerProps) => (
  <Box
    sx={{
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "rgb(46 126 161 / 82%)",
    }}
  >
    <Box>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{
          color: (theme) => theme.colors.alpha.trueWhite[70],
        }}
      >
        {category}
      </Typography>
      <Typography variant="h4" color="white" sx={{ fontSize: "1rem" }}>
        {title}
      </Typography>
      <Typography
        variant="h5"
        my={1.5}
        sx={{
          color: (theme) => theme.colors.alpha.trueWhite[70],
          fontWeight: 500,
        }}
      >
        {description}
      </Typography>
    </Box>
    {buttonType === "ReadMore" && (
      <Box display="flex" justifyContent="end" pt={1} alignItems="end">
        <StyledBookButton size="small" variant="contained">
          READ MORE
        </StyledBookButton>
      </Box>
    )}
    {buttonType === "AccessData" && (
      <Box display="flex" pt={1} alignItems="center">
        <StyledBookButtonWhite size="small" variant="contained">
          Read More
        </StyledBookButtonWhite>
        <StyledBookButtonDark size="small" variant="contained">
          Access All Data
        </StyledBookButtonDark>
      </Box>
    )}
  </Box>
);
