"use client";
import { useEffect, useState } from "react";

export default function SeoMaker() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddEntry = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/seoGenerator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, keywords }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Entry added successfully!");

        setTitle("");
        setDescription("");
        setKeywords("");
      } else {
        setError(result.message || "Failed to add entry.");
      }
    } catch (err) {
      setError("An error occurred while adding the entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualOptimize = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/manualSeoGenerator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, keywords }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Entry processed for SEO optimization!");
      } else {
        setError(result.message || "Failed to process entry.");
      }
    } catch (err) {
      setError("An error occurred while processing the entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Add SEO Entry</h1>
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">Keywords (comma separated):</span>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <button
          onClick={handleAddEntry}
          disabled={loading}
          className={`w-full p-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          {loading ? "Adding..." : "Add Entry"}
        </button>

        <button
          onClick={handleManualOptimize}
          disabled={loading}
          className={`w-full p-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          {loading ? "Processing..." : "Process Entry Manually"}
        </button>
      </div>
      {message && <div className="mt-4 text-green-600">{message}</div>}{" "}
      {/* Success message */}
      {error && <div className="mt-4 text-red-600">{error}</div>}{" "}
      {/* Error message */}
    </div>
  );
}
