"use client";
import API from "@/service/api";
import React, { useState } from "react";

const Add = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    feedbackText: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Country & City
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    // Feedback
    if (!formData.feedbackText.trim())
      newErrors.feedbackText = "Feedback is required";

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await API.post("/testimonials/", formData);
      alert(res.data.message);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        feedbackText: "",
      });
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("Failed to submit testimonial");
    }
  };
  return (
    <>
      {/* Page Title */}
      <h1 className="text-2xl font-bold font-Poppins  text-[#4e5da9]">
        ADD TESTIMONIAL
      </h1>

      {/* Divider */}
      <div className="border border-[#444F87] my-3 mb-4" />

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6  rounded-lg space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-bold font-poppins">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:border-[#444F87] outline-none"
          />
        </div>

        {/* Mobile Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold font-poppins">
              Mobile Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:border-[#444F87]"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold font-poppins">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:border-[#444F87]"
            />
          </div>
        </div>

        {/* Country and City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold font-poppins">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:border-[#444F87]"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold font-poppins">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:border-[#444F87]"
            />
          </div>
        </div>

        {/* Testimonials Text */}
        <div>
          <label className="block mb-1 font-bold font-poppins">
            Testimonials Text
          </label>
          <textarea
            rows="6"
            name="feedbackText"
            value={formData.feedbackText}
            onChange={handleChange}
            placeholder="Write Testimonials content here..."
            className="w-full border border-gray-300 rounded-md p-2 resize-none focus:border-[#444F87]"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full  bg-[#444F87] text-white font-semibold rounded-md px-6 py-2 hover:bg-[#2f365f] transition"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Add;
