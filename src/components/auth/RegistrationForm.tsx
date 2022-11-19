import {
  Typography,
  Container,
  Button,
  Grid,
  Box,
  Avatar,
  styled,
  useMediaQuery,
} from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-mui";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import * as R from "ramda";

import { registrationValidationSchemas } from "./validationsSchema";
import FormikStepper, { FormikStep } from "./FormikStepper";
import CityAutocomplete from "../HeaderContent/CityAutocomplete";
import { RootState, useSelector } from "@/app/store";
import { useRegisterMutation } from "@/app/services/auth";
import { useSnackbar } from "notistack";
import { StyledAnchor } from "./stylesheet";

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
      margin-left: auto;
      margin-right: auto;

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(35)};
      }
`
);

export interface IProps {
  onLoginClick?: () => void;
}

function RegistrationForm({ onLoginClick }: IProps) {
  const isLargeScreen = useMediaQuery("(min-width:1400px)");
  const {
    bopView: { cities },
  } = useSelector((state: RootState) => ({
    bopView: state.bopView,
  }));
  const [register] = useRegisterMutation();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Box px={2}>
        <Typography
          variant="h2"
          sx={{
            mb: 1,
          }}
        >
          Create account
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          fontWeight="normal"
          sx={{
            mb: 3,
          }}
        >
          Fill in the fields below to sign up for an account.
        </Typography>
      </Box>

      <FormikStepper
        initialValues={{
          username: "",
          terms: true,
          promo: true,
          password: "",
          password_confirm: "",
          email: "",
          company_name: "",
          company_size: "",
          company_role: "",
          default_city: undefined,
        }}
        onSubmit={async (_values) => {
          try {
            await register({
              username: _values.username,
              email: _values.email,
              default_city: _values.default_city?.city_id,
              password: _values.password,
            }).unwrap();
            return true;
          } catch (error) {
            if (R.equals(R.type(error?.data?.message), "Array")) {
              R.map((msg) => {
                enqueueSnackbar(msg, {
                  variant: "error",
                  autoHideDuration: 4000,
                });
              }, error?.data?.message);
            } else {
              enqueueSnackbar(error?.data?.message, {
                variant: "error",
                autoHideDuration: 4000,
              });
            }
            return false;
          }
        }}
      >
        <FormikStep
          validationSchema={registrationValidationSchemas.personalInformations}
          label={"Personal Informations"}
        >
          <Box p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Field
                  size={isLargeScreen ? "medium" : "small"}
                  fullWidth
                  name="username"
                  component={TextField}
                  label={"Username"}
                  placeholder={"Write username..."}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  size={isLargeScreen ? "medium" : "small"}
                  fullWidth
                  name="email"
                  component={TextField}
                  label={"Email"}
                  placeholder={"Write your email here..."}
                />
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    size={isLargeScreen ? "medium" : "small"}
                    name="default_city"
                    label="Select your city"
                    placeholder="Search"
                    multiple={false}
                    options={cities}
                    component={CityAutocomplete}
                  />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  size={isLargeScreen ? "medium" : "small"}
                  fullWidth
                  type="password"
                  name="password"
                  component={TextField}
                  label={"Password"}
                  placeholder={"Write a password here..."}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  size={isLargeScreen ? "medium" : "small"}
                  fullWidth
                  type="password"
                  name="password_confirm"
                  component={TextField}
                  label={"Confirm password"}
                  placeholder={"Confirm password here..."}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Field
                  name="promo"
                  type="checkbox"
                  component={CheckboxWithLabel}
                  Label={{
                    label:
                      "Yes, I want to receive monthly promotional materials.",
                  }}
                />
                <br />
                <Field
                  name="terms"
                  type="checkbox"
                  component={CheckboxWithLabel}
                  Label={{
                    label: (
                      <Typography variant="body2">
                        {"I accept the"}{" "}
                        <Link href="#">
                          <StyledAnchor>terms and conditions.</StyledAnchor>
                        </Link>
                      </Typography>
                    ),
                  }}
                />
              </Grid> */}
            </Grid>
            {onLoginClick && (
              <Box mt={2}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  Already have an acount?
                </Typography>{" "}
                <StyledAnchor onClick={onLoginClick}>Sign in here</StyledAnchor>
              </Box>
            )}
          </Box>
        </FormikStep>
        <FormikStep
          validationSchema={registrationValidationSchemas.companyDetails}
          label={"Company Details"}
        >
          <Box p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Field
                  size={isLargeScreen ? "medium" : "small"}
                  fullWidth
                  name="company_name"
                  component={TextField}
                  label={"Company name"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  size={isLargeScreen ? "medium" : "small"}
                  fullWidth
                  name="company_size"
                  type="number"
                  component={TextField}
                  label={"Company size"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  size={isLargeScreen ? "medium" : "small"}
                  fullWidth
                  name="company_role"
                  component={TextField}
                  label={"Company role"}
                />
              </Grid>
            </Grid>
          </Box>
        </FormikStep>
        <FormikStep label={"Complete Registration"}>
          <Box p={4}>
            <Container maxWidth="sm">
              <AvatarSuccess sizes="small">
                <CheckTwoToneIcon />
              </AvatarSuccess>
              <Typography
                align="center"
                sx={{
                  pt: 3,
                  pb: 3,
                  lineHeight: 1.5,
                  px: 10,
                }}
                variant="h4"
              >
                {"Registration completed succesfully"}
              </Typography>
              {onLoginClick ? (
                <Button fullWidth variant="contained" onClick={onLoginClick}>
                  Continue to sign in
                </Button>
              ) : (
                <Button fullWidth variant="contained" href="/">
                  Continue to sign in
                </Button>
              )}
            </Container>
          </Box>
        </FormikStep>
      </FormikStepper>
    </Box>
  );
}

export default RegistrationForm;
