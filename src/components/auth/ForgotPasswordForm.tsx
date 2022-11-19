import { useState, forwardRef, Ref } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  TextField,
  Typography,
  Alert,
  Slide,
  Dialog,
  Collapse,
  Button,
  Avatar,
  IconButton,
  styled,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import type { ReactElement } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useRefMounted } from "src/hooks/useRefMounted";
import CloseIcon from "@mui/icons-material/Close";

import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import { StyledAnchor } from "@/components/auth/stylesheet";
import { validateEmail } from "./validationsSchema";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      top: -${theme.spacing(6)};
      position: absolute;
      left: 50%;
      margin-left: -${theme.spacing(6)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

interface IProps {
  onSigninClick?: () => void;
}

const ForgotPasswordForm = ({ onSigninClick }: IProps) => {
  const isMountedRef = useRefMounted();
  const [openAlert, setOpenAlert] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    onSigninClick && onSigninClick();
  };
  return (
    <>
      <Box px={3} py={1}>
        <Box>
          <Typography
            variant="h2"
            sx={{
              mb: 1,
            }}
          >
            Recover Password
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
            sx={{
              mb: 3,
            }}
          >
            Enter the email used for registration to reset your password.
          </Typography>
        </Box>

        <Formik
          initialValues={{
            email: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            email: validateEmail,
          })}
          onSubmit={async (
            _values,
            { setErrors, setStatus, setSubmitting }
          ) => {
            try {
              if (isMountedRef()) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              console.error(err);
              if (isMountedRef()) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />

              <Button
                sx={{
                  mt: 3,
                }}
                color="primary"
                disabled={Boolean(touched.email && errors.email)}
                onClick={handleOpenDialog}
                type="submit"
                fullWidth
                size="large"
                variant="contained"
              >
                Send me a new password
              </Button>
            </form>
          )}
        </Formik>
        <Box mt={3} textAlign="right">
          <Typography
            component="span"
            variant="subtitle2"
            color="text.primary"
            fontWeight="bold"
          >
            {"Want to try to sign in again?"}
          </Typography>{" "}
          {onSigninClick ? (
            <StyledAnchor onClick={onSigninClick}>
              <b>Click here</b>
            </StyledAnchor>
          ) : (
            <Link href="/auth/login">
              <StyledAnchor>
                <b>Click here</b>
              </StyledAnchor>
            </Link>
          )}
        </Box>
      </Box>

      <DialogWrapper
        open={openDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <Box
          sx={{
            px: 4,
            pb: 4,
            pt: 10,
          }}
        >
          <AvatarSuccess>
            <CheckTwoToneIcon />
          </AvatarSuccess>

          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="info"
            >
              The password reset instructions have been sent to your email
            </Alert>
          </Collapse>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 10,
            }}
            variant="h3"
          >
            Check your email for further instructions
          </Typography>

          {onSigninClick ? (
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleCloseDialog}
            >
              Continue to login
            </Button>
          ) : (
            <Button
              fullWidth
              component={MuiLink}
              size="large"
              variant="contained"
              onClick={handleCloseDialog}
              href={`/auth/login`}
            >
              Continue to login
            </Button>
          )}
        </Box>
      </DialogWrapper>
    </>
  );
};

export default ForgotPasswordForm;
