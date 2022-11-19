import LayerIcon from "@/components/icons/LayerIcon";
import { KEPLER_DATASET_TYPE, KEPLER_INSTANCE_IDS } from "@/enums/kepler.enums";
import { getColorCode } from "@/utils/bop500Cities/cityIndicatorColorCodes";
import { useDispatch, useSelector } from "@app/store";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Collapse, ListItem, Typography } from "@mui/material";
import clsx from "clsx";
import { layerConfigChange, setFilter } from "kepler.gl/actions";
import React from "react";
import {} from "react-redux";
import { IndicatorSubListItem } from ".";
import { StyledIndicatorDataButton } from "./stylesheet";
interface IProps {
  isActiveIndicator: boolean;
  toggleIndicatorSubMenu: (indicatorName: string) => void;
  label: string;
  subList: IndicatorSubListItem[];
  isPaid: boolean;
  mainIndicatorName: string;
}

function IndicatorSubListing({
  isActiveIndicator,
  toggleIndicatorSubMenu,
  label,
  subList,
  isPaid,
  mainIndicatorName,
}: IProps) {
  const dispatch = useDispatch();
  const { visState } = useSelector(
    (state) => state.keplerGl[KEPLER_INSTANCE_IDS.MAP]
  );
  const { activeCityId } = useSelector((state) => state.bopView);

  return (
    <ListItem component="div" className="Mui-children">
      <Button
        className={clsx({
          "Mui-active": isActiveIndicator,
          "accordion-button": true,
        })}
        onMouseEnter={() => {
          if (!isPaid) return;
          const layers = visState.layers;
          const layersToHide = layers.filter((layer) => {
            if (layer.config.dataId.includes(label)) return false;
            return (
              layer.config.dataId.includes(
                `${KEPLER_DATASET_TYPE.FREE_DATA}_${activeCityId}`
              ) ||
              layer.config.dataId.includes(
                `${KEPLER_DATASET_TYPE.PAID_DATA}_${activeCityId}`
              )
            );
          });
          //* Hiding layers
          layersToHide.forEach((layer) => {
            dispatch(
              layerConfigChange(layer, {
                ...layer.config,
                isVisible: false,
              })
            );
          });
        }}
        onMouseLeave={() => {
          if (!isPaid) return;
          const layers = visState.layers;
          const layersToHide = layers.filter((layer) => {
            return (
              layer.config.dataId.includes(
                `${KEPLER_DATASET_TYPE.FREE_DATA}_${activeCityId}`
              ) ||
              layer.config.dataId.includes(
                `${KEPLER_DATASET_TYPE.PAID_DATA}_${activeCityId}`
              )
            );
          });
          //* Show layers
          layersToHide.forEach((layer) => {
            dispatch(
              layerConfigChange(layer, {
                ...layer.config,
                isVisible: true,
              })
            );
          });
        }}
        onClick={() => toggleIndicatorSubMenu(label)}
        endIcon={
          isActiveIndicator ? (
            <ExpandLessTwoToneIcon />
          ) : (
            <ExpandMoreTwoToneIcon />
          )
        }
      >
        <LayerIcon sx={{ width: "17px", height: "17px" }} />
        <Typography ml={2} fontWeight={600}>
          {label}
        </Typography>
        <InfoIcon
          sx={{
            height: (theme) => theme.typography.pxToRem(17),
          }}
        />
      </Button>
      <Collapse in={isActiveIndicator} sx={{ mt: { sm: 0.5, xl: 1 } }}>
        {subList.map((indicatorType, index) => (
          <ListItem component="div" key={index}>
            {isPaid ? (
              <>
                <StyledIndicatorDataButton
                  key={index}
                  indicatorcolor={getColorCode(mainIndicatorName, true)}
                  disableRipple
                  className="Mui-child-button"
                  onMouseEnter={() => {
                    // apply filter
                    let filters = JSON.parse(
                      JSON.stringify(visState.filters)
                    ) as any[];
                    filters.forEach((filter: { id: string }, idx) => {
                      if (filter.id.includes(`${activeCityId}`)) {
                        dispatch(setFilter(idx, "value", [indicatorType.name]));
                      } else {
                        dispatch(setFilter(idx, "value", []));
                      }
                    });
                  }}
                  onMouseLeave={() => {
                    let filters = JSON.parse(
                      JSON.stringify(visState.filters)
                    ) as any[];
                    filters.forEach((_: { dataId: string }, idx) => {
                      dispatch(setFilter(idx, "value", []));
                    });
                  }}
                >
                  {indicatorType.name}
                  <small>{indicatorType.count}</small>
                </StyledIndicatorDataButton>
              </>
            ) : (
              <Typography variant="body1">{indicatorType.name}</Typography>
            )}
          </ListItem>
        ))}
      </Collapse>
    </ListItem>
  );
}

export default IndicatorSubListing;
