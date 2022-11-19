import { gql } from "@apollo/client";

export class CitiesService {
  public constructor() {}

  public GET_ALL_CITIES_QUERY = gql`
    query AllCitiesQuery {
      getAllCities {
        city_id
        city_name
        state_name
        country_name
        city_latitude
        city_longitude
        city_administrative_level
      }
    }
  `;

  public GET_CITY_QUERY = gql`
    query getCity($city: String!) {
      getCity(city: $city) {
        city_name
        country_name
      }
    }
  `;

  public GET_BOP500_CITY_TABLE_QUERY = gql`
    query All500CitiesTableData {
      getAllCities {
        city_id
        city_name
        country_name
        city_population
        cityIndicators {
          cityName
          cityAdminLevel
          isSuccess
          indicatorName
          cityAdminLevel
          indicatorId
          indicatorDetails {
            count
          }
        }
        countryDetail {
          country_region
          country_subregion
        }
      }
    }
  `;

  public GET_CITY_LONGITUDE_AND_LATITUDE = gql`
    query GetCity($city: String!) {
      getCity(city: $city) {
        city_latitude
        city_longitude
      }
    }
  `;
}