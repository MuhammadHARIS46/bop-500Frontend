import { useFormik } from "formik";
import Link from "next/link";
import { FC } from "react";
import {
  Box,
  FormHelperText,
  TextField,
  Checkbox,
  Typography,
  FormControlLabel,
  useMediaQuery,
  Zoom,
} from "@mui/material";

import { loginValidationSchema } from "./validationsSchema";
import { StyledAnchor } from "./stylesheet";

import { setIsAuthenticated } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/app/services/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { useDispatch } from "@/app/store";

interface IProps {
  onSingnupClick?: () => void;
  onForgotPasswordClick?: () => void;
  handleAuthModalClose?: () => void;
}
const LoginForm: FC<IProps> = ({
  onSingnupClick,
  onForgotPasswordClick,
  handleAuthModalClose,
  ...rest
}) => {
  const isLargeScreen = useMediaQuery("(min-width:1400px)");
  const [login, { isLoading }] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      terms: false,
      submit: null,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const data = await login({
          username: values.username,
          password: values.password,
        }).unwrap();
        Cookies.set("bop-token", data.access_token);
        Cookies.set("bop-refresh-token", data.refresh_token);
        dispatch(setIsAuthenticated(true));
        enqueueSnackbar("Logged in successfully.", {
          variant: "success",
          TransitionComponent: Zoom,
        });
        handleAuthModalClose && handleAuthModalClose();
      } catch (err) {
        enqueueSnackbar(err?.data?.message, {
          variant: "error",
          TransitionComponent: Zoom,
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box py={1} px={3}>
      <Box>
        <Typography
          variant="h2"
          sx={{
            mb: 1,
          }}
        >
          Sign in
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          fontWeight="normal"
          sx={{
            mb: 3,
          }}
        >
          Fill in the fields below to sign into your account.
        </Typography>
      </Box>
      <form noValidate onSubmit={formik.handleSubmit} {...rest}>
        <TextField
          size={isLargeScreen ? "medium" : "small"}
          error={Boolean(formik.touched.username && formik.errors.username)}
          fullWidth
          margin="normal"
          helperText={formik.touched.username && formik.errors.username}
          label="Username"
          name="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
          variant="outlined"
        />
        <TextField
          size={isLargeScreen ? "medium" : "small"}
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          margin="normal"
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
          variant="outlined"
        />
        <Box alignItems="center" display="flex" justifyContent="space-between">
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.terms}
                name="terms"
                color="primary"
                onChange={formik.handleChange}
              />
            }
            label={
              <>
                <Typography variant="body2">
                  I accept the{" "}
                  <Link href="#">
                    <StyledAnchor>terms and conditions</StyledAnchor>
                  </Link>
                </Typography>
              </>
            }
          />
          {onForgotPasswordClick ? (
            <StyledAnchor fontWeight={600} onClick={onForgotPasswordClick}>
              Lost password?
            </StyledAnchor>
          ) : (
            <Link href="/auth/forgot-password">
              <StyledAnchor fontWeight={600}>Lost password?</StyledAnchor>
            </Link>
          )}
        </Box>

        {Boolean(formik.touched.terms && formik.errors.terms) && (
          <FormHelperText error>{formik.errors.terms}</FormHelperText>
        )}

        <LoadingButton
          loading={isLoading}
          size={isLargeScreen ? "medium" : "medium"}
          sx={{
            mt: 3,
          }}
          color="primary"
          disabled={formik.isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
        >
          Sign in
        </LoadingButton>
      </form>
      <Box my={4}>
        <Typography
          component="span"
          variant="subtitle2"
          color="text.primary"
          fontWeight="bold"
        >
          Don&#x27;t have an account, yet?
        </Typography>{" "}
        {onSingnupClick ? (
          <StyledAnchor onClick={onSingnupClick}>Sign up here</StyledAnchor>
        ) : (
          <Link href="/auth/register">
            <StyledAnchor onClick={onSingnupClick}>Sign up here</StyledAnchor>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default LoginForm;
