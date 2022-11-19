import React, { forwardRef, Ref } from "react";
import type { ReactElement } from "react";
import { Dialog, DialogProps, Slide, IconButton, Box } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";

interface IProps extends DialogProps {
  handleClose: () => void;
  children: React.ReactNode;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Modal({ handleClose, children, ...rest }: IProps) {
  return (
    <Dialog
      fullWidth
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      {...rest}
      sx={{
        "& .MuiPaper-root": {
          background: (theme) => theme.colors.alpha.white[100],
        },
      }}
    >
      <Box p={0.8} display="flex" justifyContent={"end"}>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Dialog>
  );
}

export default Modal;
