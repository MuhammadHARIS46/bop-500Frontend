import { Button, styled } from "@mui/material";

export const StyledBookButtonWhite = styled(Button)(
  () => `
      background-color: white;
      color: #010216;
      width: max-content;
      height: 33px;
      border-radius: 3px;
      width:max-content;
      :hover{
        background-color: #f1efef;
      }
  `
);

export const StyledBookButtonDark = styled(Button)(
  () => `
      background-color: #010216;
      width: max-content;
      height: 33px;
      border-radius: 3px;
      margin-left: 5px;
      width:max-content;
      :hover{
        background-color: #000000;
      }
  `
);

export const StyledBookButton = styled(Button)(
  ({}) => `
    background-color: #20617c;
    width: max-content;
    height: 33px;
    border-radius: 3px;
    :hover{
      background-color: #206785;
    }
`
);
