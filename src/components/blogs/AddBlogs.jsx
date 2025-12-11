"use client";
import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import API from "@/service/api";
import * as mammoth from "mammoth";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [slugs, setSlugs] = useState("");

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle .docx upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      try {
        const result = await mammoth.extractRawText({ arrayBuffer });
        setContent(result.value);
      } catch (err) {
        console.error("Error reading Word file:", err);
        alert("Failed to read the Word file. Please try again.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Submit form with image + data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("creator", creator);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("slug", slugs);
      formData.append("publishDate", publishDate);

      if (image) formData.append("image", image);
      console.log("formdata", formData);

      const res = await API.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res);

      setSnackbar({
        open: true,
        message: res.data.message || "Blog created successfully!",
        severity: "success",
      });

      setTitle("");
      setCreator("");
      setContent("");
      setCategory("");
      setPublishDate("");
      setImage("");
      setImagePreview("");
      setFileName("");
      setSlugs("");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to create blog",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins text-[#4e5da9]">
        ADD BLOGS
      </h1>

      <div className="border border-[#444F87] my-3" />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-bold font-poppins">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:border-[#444F87]"
          />
        </div>

        {/* Creator + Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold font-poppins">
              Creator Name
            </label>
            <input
              type="text"
              name="creator"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold font-poppins">
              Slug (URL Friendly)
            </label>
            <input
              type="text"
              name="slug"
              value={slugs}
              onChange={(e) => setSlugs(e.target.value)}
              placeholder="ex: testimonial-title-url"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold font-poppins">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold font-poppins">
              Publish Date
            </label>
            <input
              type="date"
              name="publishDate"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD + PREVIEW */}
        <div>
          <label className="block mb-1 font-bold font-poppins">
            Upload Image
          </label>

          <div className="flex items-center border rounded-md p-2 gap-3 bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer text-sm w-full"
            />
            <FolderIcon className="text-[#444F87]" />
          </div>

          {/* IMAGE PREVIEW */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-full h-56 object-cover rounded-xl shadow-md"
            />
          )}
        </div>

        {/* BLOG FILE (AUTO EXTRACT TEXT) */}
        <div>
          <label className="block mb-1 font-bold font-poppins">
            Upload Blog File
          </label>

          <div className="flex items-center border rounded-md p-2 gap-3 bg-gray-50">
            <input
              type="file"
              accept=".doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="cursor-pointer text-sm w-full"
            />
            <DescriptionIcon className="text-[#444F87]" />
          </div>
          {fileName && (
            <p className="text-sm text-green-600 mt-1">File: {fileName}</p>
          )}
        </div>

        {/* Blog Text */}
        <div>
          <label className="block mb-1 font-bold font-poppins">Blog Text</label>
          <textarea
            rows="6"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write blog content here..."
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#444F87] text-white font-semibold rounded-md px-6 py-2 hover:bg-[#2f365f] transition"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddBlogs;
