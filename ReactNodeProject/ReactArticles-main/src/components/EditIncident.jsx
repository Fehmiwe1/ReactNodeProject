import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import "../assets/styles/EditIncident.css";

function EditIncident() {
  const [post, setPost] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const [editReport, setEditReport] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  // Fetch post data for editing
  const fetchData = () => {
    axios
      .get(`/post/${id}`)
      .then((res) => {
        if (res.data.length > 0) {
          const reportData = res.data[0];

          // Ensure Incident_Date is properly formatted for datetime-local input
          if (reportData.Incident_Date) {
            const dateObj = new Date(reportData.Incident_Date);
            reportData.Incident_Date = dateObj.toISOString().slice(0, 16);
          }

          setEditReport(reportData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
        setError("Failed to fetch post data.");
        setLoading(false);
      });
  };

  const updateReport = (reportToSend) => {
    axios
      .put(`/post/${id}`, reportToSend)
      .then((res) => {
        console.log("Report updated:", res.data);
        setMsg("Report was updated successfully.");
        setTimeout(() => {
          setMsg("");
          navigate("/Incident");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to update the post.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditReport((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const cleanString = (str) => str.trim().replace(/\s+/g, " ");

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString().slice(0, 16);

    if (!editReport) return;

    // Clean and validate fields
    const cleanedReport = {
      Incident_Name: cleanString(editReport.Incident_Name),
      Incident_Date: editReport.Incident_Date,
      ID_Employee: editReport.ID_Employee,
      Description: cleanString(editReport.Description),
    };

    if (
      !cleanedReport.Incident_Name ||
      !cleanedReport.Incident_Date ||
      !cleanedReport.ID_Employee ||
      !cleanedReport.Description
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (cleanedReport.Incident_Name.length < 5) {
      setError("Incident name must be at least 5 characters long.");
      return;
    }

    if (!cleanedReport.Incident_Date || cleanedReport.Incident_Date > now) {
      setError("Incident date must be today or earlier.");
      return;
    }

    if (isNaN(cleanedReport.ID_Employee) || cleanedReport.ID_Employee <= 0) {
      setError("Employee ID must be a positive number.");
      return;
    }

    if (cleanedReport.Description.length < 11) {
      setError("Description must be at least 11 characters long.");
      return;
    }

    setError("");
    updateReport(cleanedReport);
  };

  if (loading) {
    return <div>Loading report data...</div>;
  }

  return (
    <div className="main">
      <ul className="menu afterIn">
              <li>
                <NavLink
                  to="/mainPage"
                  className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                  }
                  end
                >
                  Main Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Incident"
                  className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                  }
                  end
                >
                  Incident Page
                </NavLink>
              </li>
            </ul>
      <div className="edit-report">
        <h2>Edit Incident Report</h2>
        {error && <p className="error-message">{error}</p>}
        {msg && <p className="success-msg">{msg}</p>}
        {editReport && (
          <form className="edit-Report-form" onSubmit={handleSubmit}>
            <div className="edit-Report-div">
              <label className="edit-Report-label">Incident Name:</label>
              <input
                type="text"
                name="Incident_Name"
                value={editReport.Incident_Name}
                onChange={handleChange}
                required
                className="edit-Report-input"
              />
            </div>
            <div className="edit-Report-div">
              <label className="edit-Report-label">Incident Date:</label>
              <input
                type="datetime-local"
                name="Incident_Date"
                value={editReport.Incident_Date}
                onChange={handleChange}
                required
                className="edit-Report-input"
              />
            </div>
            <div className="edit-Report-div">
              <label className="edit-Report-label">Employee ID:</label>
              <input
                type="number"
                name="ID_Employee"
                value={editReport.ID_Employee}
                onChange={handleChange}
                required
                className="edit-Report-input"
              />
            </div>
            <div className="edit-Report-div">
              <label className="edit-Report-label">Description:</label>
              <textarea
                name="Description"
                value={editReport.Description}
                onChange={handleChange}
                required
                className="edit-Report-textarea"
              />
            </div>
            <button className="edit-Report-btn" type="submit">
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditIncident;
