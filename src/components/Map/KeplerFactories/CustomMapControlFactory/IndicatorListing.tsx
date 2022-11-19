import { List } from "@mui/material";
import React from "react";

import { useSelector } from "@/app/store";
import { IndicatorSubListItem } from ".";
import IndicatorSubListing from "./IndicatorSubListing";

type indicatorDataType = {
  label: string;
  subList: IndicatorSubListItem[];
};

interface IProps {
  indicatorDataList: indicatorDataType[];
  activeIndicatorMenu: string;
  toggleIndicatorSubMenu: (indicatorName: string) => void;
}
const IndicatorListing = ({
  indicatorDataList,
  activeIndicatorMenu,
  toggleIndicatorSubMenu,
}: IProps) => {
  const { isPaid } = useSelector((state) => ({
    isPaid: state.auth.isPaid,
    activeSubcategoryTab: state.cities.activeSubcategoryTab,
  }));
  return (
    <List component="div">
      {indicatorDataList.map((data, index) => {
        const isActiveIndicator = activeIndicatorMenu === data.label;
        return isPaid ? (
          <IndicatorSubListing
            key={index}
            isPaid={isPaid}
            mainIndicatorName={data.label} // prop name can be changed
            label={data.label}
            subList={data.subList}
            toggleIndicatorSubMenu={toggleIndicatorSubMenu}
            isActiveIndicator={isActiveIndicator}
          />
        ) : (
          <IndicatorSubListing
            key={index}
            isPaid={isPaid}
            mainIndicatorName={data.label}
            label={data.label}
            subList={data.subList}
            toggleIndicatorSubMenu={toggleIndicatorSubMenu}
            isActiveIndicator={isActiveIndicator}
          />
        );
      })}
    </List>
  );
};

export default IndicatorListing;
