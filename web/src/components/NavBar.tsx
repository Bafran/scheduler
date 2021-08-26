import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {
  title?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ title }) => {
  const { data, loading } = useMeQuery();

  const [logout] = useLogoutMutation();

  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleClick = (event: any) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
        <Button href="/login" color="inherit">
          Login
        </Button>
      </>
    );
  } else {
    body = (
      <>
        <Box display="flex" justifyContent="center" flexDirection="row">
          <Box margin="auto">
            <Typography align="center">{data?.me?.firstName}</Typography>
          </Box>
          <Box marginLeft={2}>
            <Button
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </>
    );
  }

  let menu = (
    <>
      <Menu
        id="simple-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Your Schedule</MenuItem>
      </Menu>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
              {menu}
            </IconButton>
          </div>
        </ClickAwayListener>
        <Typography variant="h6">{title}</Typography>
        <Box ml="auto" justifyContent="center" flexDirection="row">
          {body}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
