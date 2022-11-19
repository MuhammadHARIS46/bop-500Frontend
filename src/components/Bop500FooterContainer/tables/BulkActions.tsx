import { useState, useRef } from "react";
import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  List,
  Typography,
  ListItemButton,
} from "@mui/material";

import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";

function BulkActions() {
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            {"Bulk actions"}:
          </Typography>
          <Button
            sx={{
              ml: 1,
            }}
            variant="contained"
          >
            {"Action"}
          </Button>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{
            ml: 2,
            p: 1,
          }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        disableScrollLock
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          <ListItemButton>
            <ListItemText primary={"Bulk action one"} />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary={"Bulk action two"} />
          </ListItemButton>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
