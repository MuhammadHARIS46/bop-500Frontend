import InfoIcon from "@mui/icons-material/Info";
import { alpha, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import React from "react";

import CircularProgressbarContainer from "./CircularProgressbarContainer";
import { iconList } from "./Icons";
import {
  CardBorderBottom,
  StyledLinearProgress,
  StyledTooltip,
} from "./stylesheet";

interface IProps {
  title: string;
  progressbarValue?: number;
  value: string | number | JSX.Element;
  icon: "Up" | "Down" | "Plus";
  isActive?: boolean;
  showCircularProgressBar?: boolean;
  subtitle?: string;
  linearProgressColor?: string;
  linearProgressBgColor?: string;
  sx?: SxProps<Theme>;
  onClick?: (title: string) => void;
  onFocus?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  tooltipTitle?: React.ReactNode;
  titleStyles?: SxProps<Theme>;
  valueColor?: string;
}

const CircularProgressCard = ({
  title,
  progressbarValue,
  value,
  icon,
  isActive,
  showCircularProgressBar = false,
  subtitle,
  linearProgressColor,
  linearProgressBgColor,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  tooltipTitle,
  titleStyles,
  valueColor,
}: IProps) => {
  const theme = useTheme();

  const newShadow = `0.5rem 0.5rem 1rem rgb(6 4 16 / 76%), 0 0.2rem 0.9rem rgb(11 10 22 / 81%)`;
  const mainShadow = `0.5rem 0.5rem 1rem rgb(6 4 16 / 42%), 0 0.2rem 0.9rem rgb(11 10 22 / 42%)`;

  return (
    <CardBorderBottom
      onClick={() => onClick && onClick(title)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocusCapture={onFocus}
      sx={{
        boxShadow: isActive ? newShadow : mainShadow,
        "&:hover": {
          boxShadow: newShadow,
        },
      }}
    >
      <Box width={"100%"} display="flex" alignItems="center">
        <Box flexGrow={1} mr={1}>
          <Box
            display="flex"
            alignItems="center"
            mb={1}
            sx={{ height: "22px" }}
          >
            <Typography
              component="div"
              fontWeight="bold"
              color={theme.colors.alpha.trueWhite[70]}
              variant="caption"
              sx={{
                mr: 0.5,
                fontSize: ".75rem",
                lineHeight: 0,
                ...titleStyles,
              }}
            >
              {title}
            </Typography>
            {tooltipTitle && (
              <StyledTooltip title={tooltipTitle} placeholder="right">
                <IconButton component="span" size="small" color="secondary">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </StyledTooltip>
            )}
          </Box>

          <Typography
            sx={{
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              fontSize: "1.4rem",
            }}
            variant="h4"
          >
            {iconList[icon]}
            <Typography
              sx={{ fontSize: "1rem", fontWeight: 600, color: valueColor }}
            >
              {value}
            </Typography>
            <Typography
              variant="body2"
              sx={{ ml: 1, color: theme.colors.secondary.main }}
            >
              {subtitle}
            </Typography>
          </Typography>
        </Box>
        {showCircularProgressBar && (
          <CircularProgressbarContainer circularPercentage={progressbarValue} />
        )}
      </Box>

      <StyledLinearProgress
        variant="determinate"
        value={progressbarValue ?? 0}
        sx={{
          "&.MuiLinearProgress-root": {
            backgroundColor:
              linearProgressBgColor ?? alpha(theme.colors.secondary.light, 0.1),
          },
          "& .MuiLinearProgress-bar": {
            backgroundColor: linearProgressColor
              ? linearProgressColor
              : theme.colors.secondary.light,
          },
        }}
      />
    </CardBorderBottom>
  );
};

export default CircularProgressCard;
