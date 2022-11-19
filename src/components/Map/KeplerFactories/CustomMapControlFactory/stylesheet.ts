import { Box, styled, Theme, Button } from "@mui/material";

export const MenuContent = styled("div")`
  background: #1b1e27;
  width: 300px;
  margin-right: 2rem;
  border-radius: 7px;
`;

export const MenuButtonsWrapper = styled("div")(
  ({ theme }) =>
    `
  display: flex;
  flex-direction: column;
  height: max-content;
  svg{
    height: 23px; 
    width: 22px;
  }
  .MuiButtonBase-root {
    margin-bottom: 0.8rem;
    background: #171a29;
    color: #fff;
    &:hover,
    &.active {
      background: ${theme.palette.info.main};
    }
    
  }
`
);

export const StyledMapControlOverlay = styled("div")`
  position: absolute;
  right: 1rem;
  z-index: 999;
  top: 0.5rem;

  .paid-toggle-buttons {
    padding: 0.5rem 0;
    .active {
      background: rgba(140, 124, 240, 0.1);
    }
  }
`;

export const listBeforeStyle = (theme: Theme, color?: string) => `
  content: ' ';
  background: ${color ?? theme.colors.alpha.trueWhite[100]};
  transition: ${theme.transitions.create(["transform", "opacity"])};
  min-width: 7px;
  height: 7px;
  transform-origin: center;
  border-radius: 20px;
  margin-right: ${theme.spacing(1.4)};
`;

export const MenuContentBottom = styled(Box)(
  ({ theme }) => `
    height: 27rem;
    padding: ${theme.spacing(0, 2, 1, 2)};
    overflow-y: scroll;
    overflow-x: hidden;

    @media(max-width: 1400px){
      height: 18rem;
    }
    ::-webkit-scrollbar {
      width: 7px;
    }

    .MuiList-root {
      padding: 0;

      .MuiListItem-root {
        padding: 1px 0;
        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }
          
          &.accordion-button{
            color: ${theme.colors.alpha.trueWhite[100]};
            background-color: #131623;
            padding: 10.8px 15px;
          
            @media(max-width: 1400px){
              padding: 8px 15px;
            }
          }
         
          &.Mui-active,
            &:hover {
              background-color: #0f121e;
              color: ${theme.colors.alpha.trueWhite[100]};

              .MuiButton-startIcon,
              .MuiButton-endIcon {
                color: ${theme.colors.alpha.trueWhite[100]};
              }
          }
        }

        &.Mui-children {
          flex-direction: column;
          margin-bottom:0.4rem;
          
          @media(max-width: 1400px){
            margin-bottom:0px;
          }
          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;
          padding-left: 1rem;

          .MuiListItem-root {
            padding: 0;
            flex-direction: column;
            align-items:flex-start;
            .MuiTypography-root{
              padding: ${theme.spacing(0, 1.2)};
              color: ${theme.colors.alpha.trueWhite[100]};
              font-size: .9rem;
              position: relative;
              display: flex;
              align-items: center;

               &:before {
                ${listBeforeStyle(theme)}
              }
            }
            
          }
        }
      }
    }
`
);

export const StyledIndicatorDataButton = styled(Button)<{
  indicatorcolor: string;
}>(
  ({ theme, indicatorcolor }) => `
      font-size: .9rem;
      line-height: 1.5;
      color: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0, 1.2)};
      font-weight: 500;
      .MuiBadge-root {
        right: ${theme.spacing(3.2)};
      }

      &:before {
        ${listBeforeStyle(theme, indicatorcolor)}
      }
      small{
        font-weight: 600;
        margin-left: auto;
        color: ${theme.colors.alpha.trueWhite[70]}
      }
    `
);
