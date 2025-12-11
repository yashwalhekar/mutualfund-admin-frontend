"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Switch,
  Tooltip,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "@/service/api";

const List = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page

  const handleFetchTestimonial = async () => {
    try {
      const res = await API.get("/testimonials");
      setTestimonials(res.data.data);
      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleFetchTestimonial();
  }, []);
  // Handle switching
  const handleToggleStatus = async (id) => {
    try {
      const res = await API.put(`/testimonials/${id}/status`); // backend returns updated testimonial
      const updated = res.data.data; // this is the updated testimonial

      // update state for that specific testimonial without refetching whole list
      setTestimonials((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: updated.status } : item
        )
      );

      setSnackbar({
        open: true,
        message: `Status ${
          updated.status ? "Activated" : "Deactivated"
        } Successfully!`,
        severity: "success",
      });
    } catch (error) {
      console.log("Failed to update status", error.message);
      setSnackbar({
        open: true,
        message: "Failed to update status",
        severity: "error",
      });
    }
  };

  // Pagination handlers
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page when changing page size
  };
  const handleEdit = (id) => {
    const testimonial = testimonials.find((item) => item._id === id);
    setEditId(id);
    setEditedData(testimonial);
    setOpenDialog(true); // open dialog
  };
  const handleCancel = () => {
    setEditId(null);
    setEditedData({});
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };
  console.log(editedData);
  const handleSave = async (id) => {
    try {
      await API.put(`/testimonials/${id}`, editedData);
      setSnackbar({
        open: true,
        message: "Updated successfully!",
        severity: "success",
      });
      setEditId(null);
      handleFetchTestimonial();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating testimonial:", error);
      setSnackbar({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;
    try {
      await API.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter((t) => t._id !== id));
      setSnackbar({
        open: true,
        message: "Deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    }
  };
  const filteredTestimonials = testimonials.filter((t) =>
    t.fullName?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <h1 className="text-2xl font-bold font-poppins text-[#4e5da9]">
        TESTIMONIAL DETAILS
      </h1>

      {/* Divider */}
      <div className="border border-[#444F87] my-3" />

      <div className="flex justify-start mb-3">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 500 }}
        />
      </div>

      <TableContainer component={Paper} className="shadow-lg rounded-2xl">
        <Table>
          <TableHead>
            <TableRow className="bg-[#444F87]">
              {[
                "Name",
                "Mobile Number",
                "Email",
                "Country",
                "City",
                "Text",
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
            {filteredTestimonials
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((testimonial) => (
                <TableRow key={testimonial._id}>
                  <TableCell>{testimonial.fullName}</TableCell>
                  <TableCell>{testimonial.phone}</TableCell>
                  <TableCell>{testimonial.email}</TableCell>
                  <TableCell>{testimonial.country}</TableCell>
                  <TableCell>{testimonial.city}</TableCell>
                  <TableCell>
                    {testimonial.feedbackText?.length > 40
                      ? testimonial.feedbackText.substring(0, 40) + "..."
                      : testimonial.feedbackText}
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={testimonial.status}
                      onChange={() => handleToggleStatus(testimonial._id)}
                      color="primary"
                    />
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(testimonial._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Delete"
                      onClick={() => handleDelete(testimonial._id)}
                    >
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredTestimonials.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontFamily: "poppins",
            textAlign: "center",
            color: "#4e5da9",
          }}
        >
          Edit Testimonial
        </DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-4 mt-4">
            <TextField
              label="Full Name"
              name="fullName"
              value={editedData.fullName || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              value={editedData.email || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Country"
              name="country"
              value={editedData.country || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="City"
              name="city"
              value={editedData.city || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Feedback"
              name="feedbackText"
              value={editedData.feedbackText || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={5}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={() => handleSave(editId)}
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

export default List;
