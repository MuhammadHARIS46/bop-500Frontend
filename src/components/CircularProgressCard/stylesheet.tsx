import {
  Card,
  alpha,
  styled,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";

export const CardBorderBottom = styled(Card)(
  ({ theme }) => `
      background: linear-gradient(to bottom, #08101d, #0f2633 99%);
      min-width: 285px;
      max-width: 100%;
      border-bottom: transparent 5px solid;
      border-bottom-color: ${theme.colors.secondary.dark};
      padding: ${theme.spacing(1)};
      cursor: pointer;
      @media (min-width: 1500px){
        min-width: 285px;
      }
    `
);

export const StyledLinearProgress = styled(LinearProgress)(
  ({ theme }) => `
          height: 7px;
          border-radius: ${theme.general.borderRadiusLg};
          margin-bottom: -${theme.spacing(0.5)};
          margin-top: ${theme.spacing(0.5)};
          &.${linearProgressClasses.colorPrimary} {
              background-color: ${alpha(theme.colors.secondary.light, 0.1)};
          }
          
          & .${linearProgressClasses.bar} {
              border-radius: ${theme.general.borderRadiusLg};
              background-color: ${theme.colors.secondary.light};
          }
      `
);

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({}) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgb(46 126 161 / 82%)",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(121 169 209 / 97%)",
    padding: 0,
    maxWidth: 400,
    minWidth: 330,
  },
}));
