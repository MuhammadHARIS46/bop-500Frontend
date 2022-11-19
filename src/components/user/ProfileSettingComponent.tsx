import React from "react";
import { Box, Avatar, useTheme, Typography } from "@mui/material";
import userImage from "src/assets/avatars/1.jpg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const ProfileSettingComponent = () => {
  const theme = useTheme();
  const user = {
    avatar: userImage,
    name: "Rachael Simons",
    jobtitle: "Lead Developer",
  };

  const { activeCityId, selectedCities } = useSelector(
    (state: RootState) => state.bopView
  );

  return (
    <Box
      p={1.5}
      mb={1}
      sx={{
        background: "#131623",
        borderRadius: "0.2rem",
      }}
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      <Avatar
        sx={{
          width: theme.spacing(5.5),
          height: theme.spacing(5.5),
        }}
        alt={user.name}
        src={user.avatar}
      />
      <Box>
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ color: (theme) => theme.colors.alpha.trueWhite[70] }}
        >
          Rachael Simons
        </Typography>
        <Typography variant="body2" fontWeight={600} sx={{ color: "#fff" }}>
          {selectedCities.find(({ city_id }) => city_id === activeCityId)
            ?.city_name ?? ""}
        </Typography>
      </Box>
      <SettingsOutlinedIcon />
    </Box>
  );
};

export default ProfileSettingComponent;
