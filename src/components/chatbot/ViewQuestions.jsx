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

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // EDIT STATES
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await API.get("/chatbot");
      console.log(res.data.data);
      setQuestions(res.data.data);
    } catch (error) {
      console.error("Failed to load Questions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleToggleStatus = async (id) => {
  //   try {
  //     await API.put(`/blogs/${id}/status`);
  //     fetchBlogs();
  //   } catch (err) {
  //     console.error("Status update failed", err);
  //   }
  // };

  const handleEditOpen = (question) => {
    setSelectedQuestion(question);
    setOpenDialog(true);
  };

  const handleEditClose = () => {
    setOpenDialog(false);
    setSelectedQuestion(null);
  };

  const handleEditChange = (e) => {
    setSelectedQuestion({
      ...selectedQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      await API.put(`/chatbot/${selectedQuestion._id}`, selectedQuestion);
      setOpenDialog(false);
      fetchQuestions();
    } catch (error) {
      console.error("Failed to update blog", error);
    }
  };

  // DELETE BLOG
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Question?")) return;

    try {
      await API.delete(`/chatbot/${id}`);
      fetchQuestions();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins text-[#4e5da9]">
        QUESTIONS DETAILS
      </h1>

      <div className="border border-[#444F87] my-3" />

      <TableContainer component={Paper} className="shadow-lg rounded-xl">
        <Table>
          <TableHead>
            <TableRow className="bg-[#444F87]">
              {["Question", "Answer", "Language", "Status", "Order"].map(
                (header) => (
                  <TableCell
                    key={header}
                    className="font-bold"
                    sx={{ color: "white" }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {questions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question) => (
                <TableRow key={question._id}>
                  <TableCell>{question.questions}</TableCell>

                  <TableCell>
                    {question.answer.length > 40
                      ? question.answer.substring(0, 40) + "..."
                      : question.answer}
                  </TableCell>

                  <TableCell>{question.language}</TableCell>

                  <TableCell>
                    <Switch
                      checked={question.isActive}
                      // onChange={() => handleToggleStatus(bl._id)}
                      color="primary"
                    />
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditOpen(question)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(question._id)}
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
          count={questions.length}
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
          Edit Question
        </DialogTitle>

        <DialogContent className="space-y-4">
          <TextField
            margin="dense"
            label="Question"
            name="questions"
            fullWidth
            value={selectedQuestion?.questions || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Answer"
            name="answer"
            fullWidth
            value={selectedQuestion?.answer || ""}
            onChange={handleEditChange}
          />

          {/* <TextField
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
          /> */}
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

export default ViewQuestions;
