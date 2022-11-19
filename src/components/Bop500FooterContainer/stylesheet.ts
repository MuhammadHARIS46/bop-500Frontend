import { Avatar, Box, Button, Dialog, styled } from "@mui/material";

export const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: 0.5rem;
        
        .MuiTabs-root {
          height: 48px;
          min-height: 48px;
        }
  
        .MuiTabs-scrollableX {
          overflow-x: auto !important;
        }
  
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            background: none;
            border: 0;
  
            &:after {
              position: absolute;
              left: 50%;
              width: 28px;
              content: ' ';
              margin-left: -14px;
              background: ${theme.colors.primary.main};
              border-radius: inherit;
              height: 100%;
            }
           
        }
  
        .MuiTab-root {
            &.MuiButtonBase-root {
                height: 44px;
                min-height: 44px;
                background: ${theme.colors.alpha.white[50]};
                border: 1px solid ${theme.colors.alpha.black[10]};
                border-bottom: 0;
                position: relative;
                margin-right: ${theme.spacing(1)};
                font-size: ${theme.typography.pxToRem(14)};
                color: ${theme.colors.alpha.black[80]};
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
  
                .MuiTouchRipple-root {
                  opacity: .1;
                }
  
                &:after {
                  position: absolute;
                  left: 0;
                  right: 0;
                  width: 100%;
                  bottom: 0;
                  height: 1px;
                  content: '';
                  background: ${theme.colors.alpha.black[10]};
                }
  
                &:hover {
                  color: ${theme.colors.alpha.black[100]};
                }
            }
  
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
                background: ${theme.colors.alpha.white[100]};
                border-bottom-color: ${theme.colors.alpha.white[100]};
  
                &:after {
                  height: 0;
                }
            }
        }
    `
);

export const DialogWrapper = styled(Dialog)(
  () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
);

export const ImgWrapper = styled("img")(
  ({ theme }) => `
        width: ${theme.spacing(8)};
        height: auto;
  `
);

export const AvatarError = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.error.lighter};
        color: ${theme.colors.error.main};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
);

export const ButtonError = styled(Button)(
  ({ theme }) => `
       background: ${theme.colors.error.main};
       color: ${theme.palette.error.contrastText};
  
       &:hover {
          background: ${theme.colors.error.dark};
       }
      `
);
