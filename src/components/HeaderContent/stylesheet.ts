import { Box, styled } from "@mui/material";

export const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        position: relative;
  
        .MuiTabs-root {
          height: 48px;
          min-height: 48px;
        }
  
        .MuiTabs-scrollableX {
          overflow-x: auto !important;
        }
  
        .MuiTabs-indicator {
            display:none;
        }
  
        .MuiTab-root {
            &.MuiButtonBase-root {
                height: 44px;
                min-height: 44px;
                background: ${theme.colors.alpha.white[50]};
                border: 1px solid ${theme.colors.alpha.black[10]};
                border-bottom: 0;
                position: relative;
                margin-right: 0;
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
                  color: #000;
                  background-color:${theme.colors.alpha.trueWhite[50]};
                }
            }
  
            &.Mui-selected {
                color: #000;
                background: ${theme.colors.alpha.trueWhite[100]};
               
            }
        }
    `
);
