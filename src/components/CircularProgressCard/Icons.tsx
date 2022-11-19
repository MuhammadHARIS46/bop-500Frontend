import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import KeyboardArrowUpTwoToneIcon from "@mui/icons-material/KeyboardArrowUpTwoTone";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";

export type iconTypes = "Up" | "Down" | "Plus";
export const iconList = {
  Up: (
    <KeyboardArrowUpTwoToneIcon
      sx={{
        mr: 0.5,
        color: (theme) => `${theme.colors.secondary.dark}`,
      }}
    />
  ),
  Down: (
    <KeyboardArrowDownTwoToneIcon
      sx={{
        mr: 0.5,
        color: (theme) => `${theme.colors.secondary.dark}`,
      }}
    />
  ),
  Plus: (
    <AddTwoToneIcon
      sx={{
        mr: 0.5,
        color: (theme) => `${theme.colors.secondary.dark}`,
      }}
    />
  ),
};
