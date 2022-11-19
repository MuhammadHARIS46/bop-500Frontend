import { ICityType } from "@/types/CityType";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { FieldInputProps, FieldProps, FormikProps } from "formik";

interface IProps extends Partial<FieldProps> {
  options: ICityType[];
  selectedCities?: ICityType[];
  onChange: (e: React.SyntheticEvent, value: ICityType[]) => void;
  loading?: boolean;
  onClick?: () => void;
  multiple?: boolean;
  label?: string;
  name?: string;
  size?: "small" | "medium";
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
}

const CityAutocomplete = ({
  options,
  selectedCities,
  loading,
  onChange,
  onClick,
  label,
  size,
  disabled,
  multiple = true,
  placeholder,
  name,
  helperText,
  error,
  field,
  form,
  ...rest
}: IProps) => {
  return (
    <Autocomplete
      multiple={multiple}
      disabled={disabled}
      size={size || "small"}
      sx={{
        m: 0,
        "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
          padding: "9px !important",
        },
        width: "30rem",
      }}
      options={options}
      getOptionLabel={(option) => `${(option as ICityType)?.city_name}`}
      value={multiple ? selectedCities : form?.values[field?.name]}
      loading={loading}
      onBlur={() =>
        form?.setTouched &&
        form?.setTouched({
          [field?.name]: true,
        })
      }
      onChange={(e, value: any) =>
        form?.setFieldValue
          ? form?.setFieldValue(field?.name, value === null ? undefined : value)
          : onChange && onChange(e, value)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          name={field?.name || name}
          fullWidth
          label={label || "Location"}
          variant="outlined"
          placeholder={placeholder}
          helperText={
            helperText ??
            (form?.touched[field?.name] && form?.errors[field?.name])
          }
          error={
            error ?? (form?.touched[field?.name] && !!form?.errors[field?.name])
          }
        />
      )}
      onClickCapture={onClick}
      renderOption={(props, option: ICityType) => {
        return (
          <Box
            key={option.city_name + option.city_id}
            sx={{ padding: "0.1rem" }}
          >
            <Typography {...props}>
              {option?.city_name} | {option?.state_name} |{" "}
              {option?.country_name}
            </Typography>
          </Box>
        );
      }}
      {...rest}
    />
  );
};

export default CityAutocomplete;
