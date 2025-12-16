"use client";
import React from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import Link from "next/link";

const SideBarItems = ({
  testimonialOpen,
  setTestimonialOpen,
  blogOpen,
  setBlogOpen,
  closeAllMenus,
}) => {
  return (
    <List>
      {/* Dashboard */}
      <Link
        href="/dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItemButton onClick={closeAllMenus}>
          <DashboardIcon sx={{ mr: 2 }} />
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      {/* Testimonial */}
      <ListItemButton onClick={() => setTestimonialOpen(!testimonialOpen)}>
        <ArticleIcon sx={{ mr: 2 }} />
        <ListItemText primary="Testimonial Management" />
        {testimonialOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={testimonialOpen}>
        <Link
          href="/testimonials/add"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={{ pl: 6 }} onClick={closeAllMenus}>
            <AddIcon sx={{ mr: 2 }} />
            <ListItemText primary="Add Testimonial" />
          </ListItemButton>
        </Link>

        <Link
          href="/testimonials"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={{ pl: 6 }} onClick={closeAllMenus}>
            <ListAltIcon sx={{ mr: 2 }} />
            <ListItemText primary="View Testimonials" />
          </ListItemButton>
        </Link>
      </Collapse>

      {/* Blog */}
      <ListItemButton onClick={() => setBlogOpen(!blogOpen)}>
        <ArticleIcon sx={{ mr: 2 }} />
        <ListItemText primary="Blog Management" />
        {blogOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={blogOpen}>
        <Link
          href="/blogs/add"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={{ pl: 6 }} onClick={closeAllMenus}>
            <AddIcon sx={{ mr: 2 }} />
            <ListItemText primary="Add Blog" />
          </ListItemButton>
        </Link>

        <Link
          href="/blogs"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={{ pl: 6 }} onClick={closeAllMenus}>
            <ListAltIcon sx={{ mr: 2 }} />
            <ListItemText primary="View Blogs" />
          </ListItemButton>
        </Link>
      </Collapse>

      {/* Users */}
      <Link
        href="/contact"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItemButton onClick={closeAllMenus}>
          <GroupIcon sx={{ mr: 2 }} />
          <ListItemText primary="Reached Users" />
        </ListItemButton>
      </Link>
    </List>
  );
};

export default SideBarItems;
