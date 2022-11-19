import { useState } from "react";

import { citiesApi } from "@/app/services/cities";
import { RootState, useDispatch, useSelector } from "@/app/store";
import { ICity } from "@/types/City";
import { ICityType } from "@/types/CityType";
import {
  setActiveCityId,
  setSelectedCities,
} from "@features/bopView/bopViewSlice";
import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import React from "react";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";
import LoginForm from "../auth/LoginForm";
import RegistrationForm from "../auth/RegistrationForm";
import Modal from "../shared/Modal";
import CityAutocomplete from "./CityAutocomplete";
import { TabsContainerWrapper } from "./stylesheet";

function HeaderContent() {
  const isLargeScreen = useMediaQuery("(min-width:1400px)");

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeAuthForm, setActiveAuthForm] = useState<
    "register" | "login" | "forgot-password"
  >("login");
  const dispatch = useDispatch();

  // Get status of the API request
  const { status } = citiesApi.endpoints.getAllCities.select(undefined)(
    useSelector((state: RootState) => state)
  );

  // Get the list of cities from the API , selectedCities
  const {
    bopView: { cities, selectedCities, activeCityId },
    isAuthenticated,
  } = useSelector((state: RootState) => ({
    bopView: state.bopView,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const handleAutocompleteChange = (_: React.SyntheticEvent, cities: ICity[]) =>
    dispatch(setSelectedCities(cities));

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    setActiveAuthForm("login");
  };

  const handleAuthModalOpen = () =>
    !isAuthenticated && selectedCities.length === 1 && setIsAuthModalOpen(true);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box>
          <CityAutocomplete
            options={cities}
            selectedCities={selectedCities}
            loading={status === "pending"}
            onChange={handleAutocompleteChange}
            onClick={handleAuthModalOpen}
            disabled={!isAuthenticated && selectedCities.length === 1}
          />
        </Box>
        <Box alignItems="center" ml={2}>
          <TabsContainerWrapper>
            <Tabs
              onChange={(_e, selectedCityId: number) => {
                dispatch(setActiveCityId(selectedCityId));
              }}
              value={activeCityId}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {selectedCities.map((city: ICityType) => {
                return (
                  <Tab
                    key={city.city_id}
                    label={city.city_name}
                    value={city.city_id}
                  />
                );
              })}
            </Tabs>
          </TabsContainerWrapper>
        </Box>
      </Box>
      <Modal
        open={isAuthModalOpen}
        maxWidth={activeAuthForm === "register" && isLargeScreen ? "md" : "sm"}
        handleClose={handleAuthModalClose}
      >
        <>
          {activeAuthForm === "login" && (
            <LoginForm
              onSingnupClick={() => setActiveAuthForm("register")}
              onForgotPasswordClick={() => setActiveAuthForm("forgot-password")}
              handleAuthModalClose={handleAuthModalClose}
            />
          )}
          {activeAuthForm === "register" && (
            <RegistrationForm onLoginClick={() => setActiveAuthForm("login")} />
          )}
          {activeAuthForm === "forgot-password" && (
            <ForgotPasswordForm
              onSigninClick={() => setActiveAuthForm("login")}
            />
          )}
        </>
      </Modal>
    </>
  );
}

export default React.memo(HeaderContent);
