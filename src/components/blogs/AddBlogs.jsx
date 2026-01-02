"use client";
import React, { useState, useRef } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import API from "@/service/api";
import * as mammoth from "mammoth";
import sanitizeHtml from "sanitize-html";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [fileName, setFileName] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [publishDate, setPublishDate] = useState("");
  const [slugs, setSlugs] = useState("");

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const fileInputRef = useRef(null);
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    // 🔥 THIS LINE FIXES THE ISSUE
    fileInputRef.current.value = "";
  };

  // Handle .docx upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // ❗ Allow only .docx
    if (!file.name.endsWith(".docx")) {
      alert("Please upload a .docx file only");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;

      try {
        const result = await mammoth.convertToHtml({ arrayBuffer });

        // ✅ SANITIZE HTML (PRODUCTION SAFE)
        const safeHTML = sanitizeHtml(result.value, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            "h1",
            "h2",
            "h3",
            "img",
            "table",
            "tr",
            "td",
          ]),
          allowedAttributes: {
            img: ["src", "alt"],
          },
        });

        setContent(safeHTML);
      } catch (err) {
        console.error("Error reading Word file:", err);
        alert("Failed to read the Word file");
      }
    };

    reader.readAsArrayBuffer(file);
  };
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thakurfinservblogs");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dukykfqu6/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error("Cloudinary upload failed: " + text);
    }

    return res.json();
  };
  // Submit form with image + data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 1️⃣ Upload images to Cloudinary
      const uploadedImages = await Promise.all(
        images.map((img) => uploadToCloudinary(img))
      );

      const imageUrls = uploadedImages.map((res) => res.secure_url);

      // 2️⃣ Send only JSON to backend
      await API.post("/blogs/create", {
        title,
        creator,
        content,
        category,
        slug: slugs,
        publishDate,
        images: imageUrls,
      });

      alert("Blog created successfully");

      // reset
      setTitle("");
      setCreator("");
      setContent("");
      setCategory("");
      setPublishDate("");
      setImages([]);
      setImagePreviews([]);
      setFileName("");
      setSlugs("");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
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
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="cursor-pointer text-sm w-full"
              onChange={handleImageUpload}
            />

            <FolderIcon className="text-[#444F87]" />
          </div>

          {/* IMAGE PREVIEW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  className="h-32 w-full object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== index));
                    setImagePreviews(
                      imagePreviews.filter((_, i) => i !== index)
                    );
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
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
          <div
            className="border p-4 rounded-md prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#444F87] text-white font-semibold rounded-md px-6 py-2 hover:bg-[#2f365f] transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AddBlogs;
