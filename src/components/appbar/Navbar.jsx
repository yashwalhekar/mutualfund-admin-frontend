"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

import { useRouter } from "next/navigation";
import SideBarItems from "../sidebar/sideBarItems";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [testimonialOpen, setTestimonialOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  const closeAllMenus = () => {
    setBlogOpen(false);
    setTestimonialOpen(false);
    setDrawerOpen(false);
  };
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#444F87" }}>
        <Toolbar className="flex justify-between">
          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" className="font-bold">
            Admin Panel
          </Typography>

          {/* Avatar Menu */}
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar />
          </IconButton>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "red", fontWeight: "bold" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            width: 280,
            bgcolor: "#737AB0",
            height: "100%",
            color: "white",
            pt: 2,
          }}
        >
          <SideBarItems
            testimonialOpen={testimonialOpen}
            setTestimonialOpen={setTestimonialOpen}
            blogOpen={blogOpen}
            setBlogOpen={setBlogOpen}
            closeAllMenus={closeAllMenus}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
