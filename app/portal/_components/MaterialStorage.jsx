import Loader from "@/components/Loader";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const MaterialStorage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editInterface, setEditInterface] = useState("hidden");
  const [viewState, setViewState] = useState("");
  const [material, setMaterial] = useState({});
  const url = "https://veteran-api-for-kim.vercel.app";
  const routeToValue = {
    "get-news": "News",
    "get-story": "Stories",
    "get-lessons": "Lessons",
  };

  // Fetch materials
  const getMaterial = async () => {
    const cache = new Map();
    setLoading(true);
    try {
      const promises = ["get-news", "get-story", "get-lessons"].map((route) => {
        if (cache.has(routeToValue[route])) return cache.get(routeToValue[route]);
        return new Promise(async (resolve, reject) => {
          const response = await fetch(`${url}/${route}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          if (!data.Success) reject(data.Message);
          const payload = data[routeToValue[route]];
          cache.set(routeToValue[route], payload);
          resolve(payload);
        });
      });
      const [News, Stories, Lessons] = await Promise.all(promises);
      setMaterial({ News, Stories, Lessons });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setLoading(false);
      alert("Failed to load materials. Please try again.");
    }
  };

  // Handle delete
  const handleDelete = async (item, route) => {
    const confirmDeletion = confirm("Are you sure you want to delete this item?");
    if (!confirmDeletion) return;

    try {
      const response = await fetch(
        `${url}/delete-material?material=${viewState.slice(0, -1)}&id=${item.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!data.Success) {
        alert(data.Message);
        return;
      }
      alert("Material deleted successfully!");
      await getMaterial();
    } catch (error) {
      console.error("Error deleting material:", error);
      alert("Failed to delete material. Please try again.");
    }
  };

  // Fetch materials on mount
  useEffect(() => {
    getMaterial();
  }, []);

  // Log material changes for debugging
  useEffect(() => {
    if (Object.entries(material).length > 0) {
      console.log("Material updated:", material);
    }
  }, [material]);

  // ManageMenu component
  const ManageMenu = ({ selectedItem, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      summary: selectedItem?.summary || "",
      link: selectedItem?.link || "",
      img: null,
    });
    const [errors, setErrors] = useState({ summary: "", link: "", img: "" });
    const [dragActive, setDragActive] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Update formData when selectedItem changes
    useEffect(() => {
      setFormData({
        summary: selectedItem?.summary || "",
        link: selectedItem?.link || "",
        img: null,
      });
      setErrors({ summary: "", link: "", img: "" });
    }, [selectedItem]);

    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    };

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFormData((prev) => ({ ...prev, img: e.dataTransfer.files[0] }));
        setErrors((prev) => ({ ...prev, img: "" }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = { summary: "", link: "", img: "" };
      if (!formData.summary) newErrors.summary = "Description is required";
      if (!formData.link) newErrors.link = "Link is required";
      if (Object.values(newErrors).some((error) => error)) {
        setErrors(newErrors);
        return;
      }

      setSubmitting(true);
      const data = new FormData();
      data.append("material", viewState.slice(0, -1));
      data.append("summary", formData.summary);
      data.append("link", formData.link);
      data.append("id", selectedItem.id);
      if (formData.img) data.append("img", formData.img);

      try {
        const response = await fetch(`${url}/edit-material`, {
          method: "PUT",
          body: data,
        });
        const result = await response.json();
        if (!result.Success) {
          alert(result.Message);
          setSubmitting(false);
          return;
        }
        alert("Material updated successfully!");
        setFormData({ summary: "", link: "", img: null });
        setErrors({ summary: "", link: "", img: "" });
        onSubmit(); // Trigger parent refresh
      } catch (error) {
        console.error("Error updating material:", error);
        alert("Failed to update material. Please try again.");
        setSubmitting(false);
      }
    };

    const getImageDisplay = () => {
      if (formData.img) {
        return formData.img.name;
      }
      if (selectedItem.img) {
        if (typeof selectedItem.img === "string") {
          return selectedItem.img;
        }
        if (selectedItem.img.data && Array.isArray(selectedItem.img.data)) {
          const base64String = btoa(
            selectedItem.img.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
          );
          return `data:${selectedItem.img.type || "image/jpeg"};base64,${base64String}`;
        }
      }
      return null;
    };

    const imageDisplay = getImageDisplay();

    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Edit {viewState.slice(0, -1)}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="summary" className="block text-white mb-1">
              Description
            </label>
            <input
              id="summary"
              name="summary"
              type="text"
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
            />
            {errors.summary && (
              <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
            )}
          </div>
          <div>
            <label htmlFor="link" className="block text-white mb-1">
              Link
            </label>
            <input
              id="link"
              name="link"
              type="text"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter link"
            />
            {errors.link && (
              <p className="text-red-500 text-sm mt-1">{errors.link}</p>
            )}
          </div>
          <div>
            <label className="block text-white mb-1">Image Upload</label>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`w-full p-4 border-2 border-dashed rounded-lg text-center ${
                dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-600"
              }`}
            >
              <input
                type="file"
                name="img"
                onChange={handleChange}
                accept="image/*"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {formData.img ? (
                  <p className="text-white">Selected: {formData.img.name}</p>
                ) : imageDisplay ? (
                  <>
                    <p className="text-white mb-2">Current image:</p>
                    <img
                      src={imageDisplay}
                      alt="Current material"
                      className="max-w-[200px] mx-auto rounded"
                    />
                  </>
                ) : (
                  <p className="text-gray-400">
                    Drag and drop an image here or{" "}
                    <span className="text-blue-500 hover:underline">click to upload</span>
                  </p>
                )}
              </label>
            </div>
            {errors.img && (
              <p className="text-red-500 text-sm mt-1">{errors.img}</p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-neutral-600 text-white rounded hover:bg-neutral-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  if (loading) return <Loader />;
  if (editInterface === "visible")
    return (
      <ManageMenu
        selectedItem={selectedItem}
        onSubmit={() => {
          setEditInterface("hidden");
          setSelectedItem(null);
          getMaterial();
        }}
        onCancel={() => {
          setEditInterface("hidden");
          setSelectedItem(null);
        }}
      />
    );

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">Material Manager</h2>
          <p className="text-gray-400">
            Update or delete existing documents of material.
          </p>
        </div>

        {Object.entries(material).length > 0 && (
          <div className="flex flex-wrap mt-10 gap-5">
            {material?.Stories && (
              <div
                title="View Stories"
                onClick={() => setViewState("Stories")}
                className="px-12 cursor-pointer hover:scale-105 hover:bg-neutral-900 duration-300 py-8 shadow-md bg-neutral-800 relative text-white grid place-items-center"
              >
                <div className="absolute top-0 bg-white text-black px-2 rounded-br-sm font-bold left-0">
                  {material.Stories.length}
                </div>
                <b>Stories</b>
              </div>
            )}
            {material?.News && (
              <div
                title="View News"
                onClick={() => setViewState("News")}
                className="px-12 cursor-pointer hover:scale-105 hover:bg-neutral-900 duration-300 py-8 shadow-md bg-neutral-800 text-white grid place-items-center relative"
              >
                <div className="absolute top-0 bg-white text-black px-2 rounded-br-sm font-bold left-0">
                  {material.News.length}
                </div>
                <b>News</b>
              </div>
            )}
            {material?.Lessons && (
              <div
                title="View Lessons"
                onClick={() => setViewState("Lessons")}
                className="px-12 cursor-pointer hover:scale-105 hover:bg-neutral-900 duration-300 py-8 shadow-md bg-neutral-800 text-white grid place-items-center relative"
              >
                <div className="absolute top-0 bg-white text-black px-2 rounded-br-sm font-bold left-0">
                  {material.Lessons.length}
                </div>
                <b>Lessons</b>
              </div>
            )}
          </div>
        )}

        {!viewState && (
          <p className="mt-10 text-gray-400">Click on a material type to start managing.</p>
        )}
        {["Stories", "News", "Lessons"].includes(viewState) && (
          <table className="w-full mt-10">
            <thead>
              <tr className="bg-neutral-800">
                <th className="text-left p-4 text-white">Description</th>
                <th className="text-left p-4 bg-neutral-700 text-white">Manage</th>
              </tr>
            </thead>
            <tbody>
              {material[viewState]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="flex flex-col gap-5 relative items-center p-10 bg-neutral-800 text-white md:table-row border border-neutral-600"
                  >
                    <td className="text-black font-bold px-10 py-5 bg-white">
                      {item.summary}
                      <br />
                      <small className="text-neutral-600">
                        {format(new Date(item.createdAt), "MMM dd, yyyy HH:mm:ss")}
                      </small>
                    </td>
                    <td className="flex h-full">
                      <div className="flex flex-col text-center h-full w-full gap-2 bg-neutral-700 p-2">
                        <button
                          className="w-[80px] bg-neutral-800 px-2 h-full hover:underline text-white"
                          aria-label="Edit item"
                          onClick={() => {
                            setSelectedItem(item);
                            setEditInterface("visible");
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-[80px] bg-neutral-800 px-2 h-full hover:underline text-white"
                          aria-label="Delete item"
                          onClick={() => handleDelete(item, viewState)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MaterialStorage;