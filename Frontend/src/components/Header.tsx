import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { useLocation } from "react-router";

const Header = () => {
  const auth = useAuth();
  const {pathname} = useLocation()
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <Box>
          {auth?.isLoggedIn ? (
            <>
              {pathname !== "/chats" && <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go to Chat"
                textcolor="black"
              />}
              <NavigationLink
                bg="#515384"
                textcolor="white"
                to="/"
                text="logout"
                onClick={auth?.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textcolor="black"
              />
              <NavigationLink
                bg="#515384"
                textcolor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
