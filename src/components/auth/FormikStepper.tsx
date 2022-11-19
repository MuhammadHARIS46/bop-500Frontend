import { useState, Children } from "react";
import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  styled,
  Box,
  useMediaQuery,
} from "@mui/material";
import type { ReactElement } from "react";
import { Form, Formik, FormikConfig, FormikValues } from "formik";

const BoxActions = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]}
`
);

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
  const isLargeScreen = useMediaQuery("(min-width:1400px)");
  const childrenArray = Children.toArray(
    children
  ) as ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 2;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild?.props?.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          const status = await props.onSubmit(values, helpers);
          if (status) {
            setCompleted(true);
            setStep((s) => s + 1);
          }
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}
          {!completed ? (
            <BoxActions
              px={4}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                size={isLargeScreen ? "medium" : "small"}
                disabled={isSubmitting || step === 0}
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => setStep((s) => s - 1)}
              >
                {"Previous"}
              </Button>

              <Button
                size={isLargeScreen ? "medium" : "small"}
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? "Submitting"
                  : isLastStep()
                  ? "Complete registration"
                  : "Next step"}
              </Button>
            </BoxActions>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export default FormikStepper;
