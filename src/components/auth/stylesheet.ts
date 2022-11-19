import { styled } from "@mui/material";

export const StyledAnchor = styled("a")<{
  fontWeight?: number;
}>(({ theme, fontWeight }) => ({
  color: theme.palette.primary.main,
  fontWeight,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));
