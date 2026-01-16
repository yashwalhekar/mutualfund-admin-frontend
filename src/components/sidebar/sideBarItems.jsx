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
  lekhOpen,
  setLekhsOpen,
  questionsOpen,
  setQuestionsOpen,
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

      {/* Lekh Dropdown */}
      <ListItemButton onClick={() => setLekhsOpen(!lekhOpen)}>
        <ArticleIcon sx={{ mr: 2 }} />
        <ListItemText
          primary="Article Management"
          primaryTypographyProps={{
            fontWeight: "semi-bold",
            fontSize: 20,
            fontFamily: "Poppins",
          }}
        />
        {lekhOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={lekhOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            href="/lekh/add"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <AddIcon sx={{ mr: 2 }} />
              <ListItemText
                primary="Add New Article"
                primaryTypographyProps={{
                  fontWeight: "semi-bold",
                  fontSize: 18,
                  fontFamily: "Poppins",
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            href="/lekh"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListAltIcon sx={{ mr: 2 }} />
              <ListItemText
                primary="View Article"
                primaryTypographyProps={{
                  fontWeight: "semi-bold",
                  fontSize: 18,
                  fontFamily: "Poppins",
                }}
              />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      {/* Questions */}
      <ListItemButton onClick={() => setQuestionsOpen(!questionsOpen)}>
        <ArticleIcon sx={{ mr: 2 }} />
        <ListItemText
          primary="Chat-Bot Management"
          primaryTypographyProps={{
            fontWeight: "semi-bold",
            fontSize: 20,
            fontFamily: "Poppins",
          }}
        />
        {questionsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={questionsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            href="/chatbot/add"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <AddIcon sx={{ mr: 2 }} />
              <ListItemText
                primary="Add Questions"
                primaryTypographyProps={{
                  fontWeight: "semi-bold",
                  fontSize: 18,
                  fontFamily: "Poppins",
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            href="/chatbot"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListAltIcon sx={{ mr: 2 }} />
              <ListItemText
                primary="View All Questions"
                primaryTypographyProps={{
                  fontWeight: "semi-bold",
                  fontSize: 18,
                  fontFamily: "Poppins",
                }}
              />
            </ListItemButton>
          </Link>
        </List>
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
