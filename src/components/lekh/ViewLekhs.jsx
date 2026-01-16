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
  Snackbar,
  Alert,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "@/service/api";

const ViewLekhs = () => {
  const [lekhs, setLekhs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLekh, setSelectedLekh] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: true,
    message: "",
    severity: "primary",
  });

  const showSnackbar = (message, severity = "primary") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const fetchLekhs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/lekh");

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

      setLekhs(normalized);
    } catch (error) {
      showSnackbar("Failed to load Article", "error");
      console.error("Failed to load Article", error);
    } finally {
      setLoading(false);
    }
  };
  const filteredLekhs = lekhs.filter((lekh) =>
    lekh.category?.toLowerCase().includes(categoryFilter.toLowerCase())
  );
  useEffect(() => {
    fetchLekhs();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleToggleStatus = async (id) => {
    try {
      await API.put(`/lekh/${id}/status`);
      showSnackbar("Status updated successfully", "primary");
      fetchLekhs();
    } catch (err) {
      showSnackbar("Status update failed", "error");
      console.error("Status update failed", err);
    }
  };

  const handleEditOpen = (lekh) => {
    setSelectedLekh(lekh);
    setOpenDialog(true);
  };

  const handleEditClose = () => {
    setOpenDialog(false);
    setSelectedLekh(null);
  };

  const handleEditChange = (e) => {
    setSelectedLekh({
      ...selectedLekh,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      await API.put(`/lekh/${selectedLekh._id}`, selectedLekh);
      setOpenDialog(false);
      showSnackbar("Article updated successfully", "primary");
      fetchLekhs();
    } catch (error) {
      showSnackbar("Failed to update Article", "error");
      console.error("Failed to update Article", error);
    }
  };

  // DELETE Lekh
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Article?")) return;

    try {
      await API.delete(`/lekh/${id}`);
      showSnackbar("Article deleted successfully", "primary");
      fetchLekhs();
    } catch (err) {
      showSnackbar("Delete failed", "error");
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins text-[#4e5da9]">
        ARTICLE's DETAILS
      </h1>

      <div className="border border-[#444F87] my-3" />
      <div className="flex justify-end mb-4">
        <TextField
          label="Search by Category"
          variant="outlined"
          size="small"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(0);
          }}
          sx={{ width: 250 }}
        />
      </div>
      <TableContainer component={Paper} className="shadow-lg rounded-xl">
        <Table>
          <TableHead>
            <TableRow className="bg-[#444F87]">
              {[
                "Date",
                "Creator",
                "Title",
                "Category",
                "Lekh Text",
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
            {filteredLekhs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lekh) => (
                <TableRow key={lekh._id}>
                  <TableCell>{lekh.publishDate}</TableCell>

                  <TableCell>{lekh.creator}</TableCell>
                  <TableCell>{lekh.title}</TableCell>
                  <TableCell>{lekh.category}</TableCell>

                  <TableCell>
                    {lekh.content.length > 40
                      ? lekh.content.substring(0, 40) + "..."
                      : lekh.content}
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={lekh.status}
                      onChange={() => handleToggleStatus(lekh._id)}
                      color="primary"
                    />
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditOpen(lekh)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(lekh._id)}
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
          count={filteredLekhs.length}
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

      {/* EDIT lekh DIALOG */}
      <Dialog open={openDialog} onClose={handleEditClose} fullWidth>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontFamily: "poppins",
            textAlign: "center",
            color: "#4e5da9",
          }}
        >
          Edit Article
        </DialogTitle>

        <DialogContent className="space-y-4">
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={selectedLekh?.title || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Creator"
            name="creator"
            fullWidth
            value={selectedLekh?.creator || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Slug"
            name="slug"
            fullWidth
            value={selectedLekh?.slug || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Category"
            name="category"
            fullWidth
            value={selectedLekh?.category || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Publish Date"
            name="publishDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={selectedLekh?.publishDate || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Content"
            name="content"
            multiline
            rows={4}
            fullWidth
            value={selectedLekh?.content || ""}
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ViewLekhs;
