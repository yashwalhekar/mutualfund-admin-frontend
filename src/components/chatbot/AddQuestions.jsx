"use client";
import React, { useState } from "react";
import API from "@/service/api";

const AddQuestions = () => {
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [route, setRoute] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [language, setLanguage] = useState("en");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questions || !answer) {
      alert("Question and Answer are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        questions,
        answer,
        route,
        buttonText,
        language,
        isActive,
        order,
      };

      const res = await API.post("/chatbot", payload);

      if (res.data.success) {
        alert("Chatbot question added successfully");

        // reset form
        setQuestions("");
        setAnswer("");
        setRoute("");
        setButtonText("");
        setLanguage("en");
        setIsActive(true);
        setOrder(0);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins text-[#4e5da9]">
        ADD CHATBOT QUESTION
      </h1>

      <div className="border border-[#444F87] my-3" />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg space-y-5"
      >
        {/* Question */}
        <div>
          <label className="block mb-1 font-bold font-poppins">Question</label>
          <input
            type="text"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block mb-1 font-bold font-poppins">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Route */}
        <div>
          <label className="block mb-1 font-bold font-poppins">
            Route (Optional)
          </label>
          <input
            type="text"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="/sip-calculator"
          />
        </div>

        {/* Button Text */}
        <div>
          <label className="block mb-1 font-bold font-poppins">
            Button Text (Optional)
          </label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Calculate SIP"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block mb-1 font-bold font-poppins">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="en">English</option>
            <option value="mr">Marathi</option>
          </select>
        </div>

        {/* Order */}
        <div>
          <label className="block mb-1 font-bold font-poppins">
            Display Order
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Active */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          <label className="font-poppins">Active</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#444F87] text-white font-semibold rounded-md px-6 py-2 hover:bg-[#2f365f] transition"
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AddQuestions;
