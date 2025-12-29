"use client";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Link from "next/link";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";

const Sidebar = () => {
  const [testimonialOpen, setTestimonialOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: 300,
          top: "64px",
          height: "calc(100vh -64px)",
          color: "white",
          bgcolor: "#737AB0",
          position: "fixed",
          display: { xs: "none", md: "block" },
        },
      }}
    >
      <List>
        {/* Dashboard Link */}
        <Link
          href="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontWeight: "semi-bold",
                fontSize: 20,
                fontFamily: "Poppins",
              }}
            />
          </ListItemButton>
        </Link>

        {/* Testimonial Dropdown */}
        <ListItemButton onClick={() => setTestimonialOpen(!testimonialOpen)}>
          <ArticleIcon sx={{ mr: 2 }} />
          <ListItemText
            primary="Testimonial Management"
            primaryTypographyProps={{
              fontWeight: "semi-bold",
              fontSize: 20,
              fontFamily: "Poppins",
            }}
          />
          {testimonialOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={testimonialOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              href="/testimonials/add"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <AddIcon sx={{ mr: 2 }} />
                <ListItemText
                  primary="Add Testimonials"
                  primaryTypographyProps={{
                    fontWeight: "semi-bold",
                    fontSize: 18,
                    fontFamily: "Poppins",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href="/testimonials"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListAltIcon sx={{ mr: 2 }} />
                <ListItemText
                  primary="View Testimonials"
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

        {/* Blog Dropdown */}
        <ListItemButton onClick={() => setBlogOpen(!blogOpen)}>
          <ArticleIcon sx={{ mr: 2 }} />
          <ListItemText
            primary="Blog Management"
            primaryTypographyProps={{
              fontWeight: "semi-bold",
              fontSize: 20,
              fontFamily: "Poppins",
            }}
          />
          {blogOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={blogOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              href="/blogs/add"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <AddIcon sx={{ mr: 2 }} />
                <ListItemText
                  primary="Add Blog"
                  primaryTypographyProps={{
                    fontWeight: "semi-bold",
                    fontSize: 18,
                    fontFamily: "Poppins",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href="/blogs"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListAltIcon sx={{ mr: 2 }} />
                <ListItemText
                  primary="View Blog"
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

        {/* Reached Users */}
        <Link
          href="/contact"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <GroupIcon sx={{ mr: 2 }} />
            <ListItemText
              primary="Reached Users"
              primaryTypographyProps={{
                fontWeight: "semi-bold",
                fontSize: 20,
                fontFamily: "Poppins",
              }}
            />
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
