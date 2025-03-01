import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../assets/styles/CreateIncident.css";

function CreateIncident() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [newReport, setNewReport] = useState({
    Incident_Name: "",
    Incident_Date: "",
    ID_Employee: "",
    Description: "",
  });

  const navigate = useNavigate();

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const cleanString = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };

  const createReport = async (reportToSend) => {
    try {
      const res = await axios.post("/post/", reportToSend, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Report created:", res.data);
      setMsg("Report was created successfully");
      setTimeout(() => {
        setMsg("");
        navigate("/Incident");
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create report. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString().slice(0, 16);

    const cleanedReport = {
      Incident_Name: cleanString(newReport.Incident_Name),
      Incident_Date: newReport.Incident_Date,
      ID_Employee: newReport.ID_Employee.trim(),
      Description: cleanString(newReport.Description),
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
    createReport(cleanedReport);
  };

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
      <div className="create-report">
        <h2>Create New Incident Report</h2>
        <div className="success-msg">{msg}</div>
        {error && <p className="error-message">{error}</p>}
        <form className="create-Report-form" onSubmit={handleSubmit}>
          <div className="create-Report-div">
            <label className="create-Report-label">Incident Name:</label>
            <input
              type="text"
              name="Incident_Name"
              value={newReport.Incident_Name}
              onChange={handleChange}
              required
              className="create-Report-input"
            />
          </div>
          <div className="create-Report-div">
            <label className="create-Report-label">Incident Date:</label>
            <input
              type="datetime-local"
              name="Incident_Date"
              value={newReport.Incident_Date}
              onChange={handleChange}
              required
              className="create-Report-input"
            />
          </div>
          <div className="create-Report-div">
            <label className="create-Report-label">Employee ID:</label>
            <input
              type="number"
              name="ID_Employee"
              value={newReport.ID_Employee}
              onChange={handleChange}
              required
              className="create-Report-input"
            />
          </div>
          <div className="create-Report-div">
            <label className="create-Report-label">Description:</label>
            <textarea
              name="Description"
              value={newReport.Description}
              onChange={handleChange}
              required
              className="create-Report-textarea"
            />
          </div>
          <button className="create-Report-button" type="submit">
            Create Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateIncident;
