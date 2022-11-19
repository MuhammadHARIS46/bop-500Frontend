import {
  alpha,
  Box,
  Button,
  LinearProgress,
  linearProgressClasses,
  ListItemButton,
  styled,
  Typography,
} from "@mui/material";

export const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
        color: ${theme.colors.alpha.trueWhite[100]};  
    `
);

export const HeroTextContent = styled(Box)`
  position: absolute;
  bottom: 14rem;
  left: 4rem;
  width: max-content;
  min-width: 300px;
`;

export const LinearProgressSuccess = styled(LinearProgress)(
  ({ theme }) => `
            height: 6px;
            margin-top: 0px !important;
            border-radius: ${theme.general.borderRadiusLg};
    
            &.${linearProgressClasses.colorPrimary} {
                background: ${alpha(theme.colors.alpha.black[100], 0.1)};
            }
            
            & .${linearProgressClasses.bar} {
                border-radius: ${theme.general.borderRadiusLg};
                background-color: ${theme.colors.warning.main}
              }
        `
);

export const ListItemButtonWrapper = styled(ListItemButton)(
  ({ theme }) => `
        transition: ${theme.transitions.create(["transform", "box-shadow"])};
        transform: scale(1);
      
        position: relative;
        z-index: 5;
        &:hover {
          border-radius: ${theme.general.borderRadius};
          background: transparent;
      }
        `
);

export const StyledBookButton = styled(Button)`
  background-color: #20617c;
  width: 180px;
  height: max-content;
  border-radius: 3px;
  :hover {
    background-color: #206785;
  }
`;

export const UnlockCityDataButton = styled(Button)`
  background-color: #e3c21b;
  color: #000;
  border-radius: 3px;
  padding-right: 2rem;
  :hover {
    background-color: #cdaf1c;
  }
  & .MuiIconButton-root{
      position: absolute;
      right: 0;
      top: -2px;
      color: #000;
    }
  }
`;
