import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Tooltip, Typography } from "@mui/material";
import clsx from "clsx";

import { MenuButtonsWrapper } from "./stylesheet";
import LayerIcon from "@/components/icons/LayerIcon";
import { MenuTypes } from ".";

interface IProps {
  onClick: (menuName: MenuTypes) => void;
  activeMenu: MenuTypes;
}

const MenuButtonsContainer = ({ onClick, activeMenu }: IProps) => {
  const menuButtons = [
    {
      menuType: MenuTypes.CART,
      icon: <ShoppingCartIcon />,
      info: "Cart",
    },
    {
      menuType: MenuTypes.INDICATORS,
      icon: <LayerIcon />,
      info: "Indicators",
    },
    {
      menuType: MenuTypes.C,
      icon: <Typography>C</Typography>,
      info: "This is demo button",
    },
    {
      menuType: MenuTypes.D,
      icon: <Typography>D</Typography>,
      info: "This is demo button",
    },
    {
      menuType: MenuTypes.E,
      icon: <Typography>E</Typography>,
      info: "This is demo button",
    },
    {
      menuType: MenuTypes.F,
      icon: <Typography>F</Typography>,
      info: "This is demo button",
    },
  ];
  return (
    <MenuButtonsWrapper>
      {menuButtons.map(({ menuType, icon, info }, index) => (
        <Tooltip
          key={index}
          arrow
          title={info}
          placement="left"
          sx={{ zIndex: 999999 }}
        >
          <IconButton
            key={`meny-${index}`}
            onClick={() => onClick(menuType)}
            className={clsx({ active: activeMenu === menuType })}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </MenuButtonsWrapper>
  );
};

export default MenuButtonsContainer;
