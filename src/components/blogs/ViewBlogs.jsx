"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Avatar,
  IconButton,
  Switch,
  Tooltip,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "@/service/api";

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // EDIT STATES
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs");

      const list = res.data || [];

      const normalized = list.map((b) => ({
        _id: b._id,
        title: b.title || "",
        creator: b.creator || "",
        slug: b.slug || "",
        content: b.content || "",
        category: b.category || "",
        publishDate: b.publishDate?.substring(0, 10) || "",
        image: b.imgUrl || "",
        status: b.status ?? false,
      }));

      setBlogs(normalized);
    } catch (error) {
      console.error("Failed to load blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleToggleStatus = async (id) => {
    try {
      await API.put(`/blogs/${id}/status`);
      fetchBlogs();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleEditOpen = (blog) => {
    setSelectedBlog(blog);
    setOpenDialog(true);
  };

  const handleEditClose = () => {
    setOpenDialog(false);
    setSelectedBlog(null);
  };

  const handleEditChange = (e) => {
    setSelectedBlog({
      ...selectedBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      await API.put(`/blogs/${selectedBlog._id}`, selectedBlog);
      setOpenDialog(false);
      fetchBlogs();
    } catch (error) {
      console.error("Failed to update blog", error);
    }
  };

  // DELETE BLOG
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins text-[#4e5da9]">
        BLOGS DETAILS
      </h1>

      <div className="border border-[#444F87] my-3" />

      <TableContainer component={Paper} className="shadow-lg rounded-xl">
        <Table>
          <TableHead>
            <TableRow className="bg-[#444F87]">
              {[
                "Date",
                "Image",
                "Slug",
                "Creator",
                "Blog Text",
                "Status",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  className="font-bold"
                  sx={{ color: "white" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog.publishDate}</TableCell>

                  <TableCell>
                    <Avatar src={blog.image} variant="rounded" />
                  </TableCell>

                  <TableCell>{blog.slug}</TableCell>

                  <TableCell>{blog.creator}</TableCell>

                  <TableCell>
                    {blog.content.length > 40
                      ? blog.content.substring(0, 40) + "..."
                      : blog.content}
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={blog.status}
                      onChange={() => handleToggleStatus(blog._id)}
                      color="primary"
                    />
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditOpen(blog)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={blogs.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      {/* EDIT BLOG DIALOG */}
      <Dialog open={openDialog} onClose={handleEditClose} fullWidth>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontFamily: "poppins",
            textAlign: "center",
            color: "#4e5da9",
          }}
        >
          Edit Blog
        </DialogTitle>

        <DialogContent className="space-y-4">
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={selectedBlog?.title || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Creator"
            name="creator"
            fullWidth
            value={selectedBlog?.creator || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Slug"
            name="slug"
            fullWidth
            value={selectedBlog?.slug || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Category"
            name="category"
            fullWidth
            value={selectedBlog?.category || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Publish Date"
            name="publishDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={selectedBlog?.publishDate || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Content"
            name="content"
            multiline
            rows={4}
            fullWidth
            value={selectedBlog?.content || ""}
            onChange={handleEditChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewBlogs;
