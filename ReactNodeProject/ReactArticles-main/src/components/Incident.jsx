import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Incident.css";
import { Link, NavLink } from "react-router-dom";

function Incident() {
  const [incident, setIncident] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/post") // Relative URL, no base URL needed
      .then((res) => {
        setIncident(res.data);
        console.log(res.data); // Check the data structure in console
      })
      .catch((error) => {
        console.error("Error:", error);
        setMsg("Failed to fetch incident data.");
      });
  };

  const handleDelete = (post) => {
    if (
      window.confirm(
        `Are you sure you want to delete post: ${post.Incident_Name}`
      )
    ) {
      axios
        .delete(`/post/${post.id}`)
        .then((res) => {
          console.log("Post deleted:", res.data); // Article deleted
          // After deletion, update the list of articles
          setIncident(incident.filter((incident) => incident.id !== post.id));
          setMsg("Post was deleted");
          // Clear the message after 1 second
          setTimeout(() => {
            setMsg(""); // Clear the message after 1 second
          }, 2000); // 1000 ms = 1 second
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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
      </ul>
      <section>
        <div className="container-Incident">
          <div className="incidentPageContainer">
            <h1 className="incident-page-title">
              Here you can view unusual event reports
            </h1>
            <div className="create-incident">
              <Link to="/createincident" className="btn">
                New Report
              </Link>
            </div>
            <div className="msg">{msg}</div>
            <div className="incident-containers">
              {incident &&
                incident.map((incident) => (
                  <div key={incident.id} className="incident-card">
                    <h1 className="incident-title">{incident.id}</h1>
                    <h2 className="incident-title">{incident.Incident_Name}</h2>
                    <p className="incident-p">{incident.Incident_Date}</p>

                    <Link
                      to={`/post/${incident.id}`} // Relative link
                      className="view-button mr1"
                    >
                      View
                    </Link>
                    <Link
                      to={`/editincident/${incident.id}`} // Relative link
                      className="view-button"
                    >
                      Edit
                    </Link>
                    <button
                      className="delete-btn-incident"
                      onClick={() => handleDelete(incident)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Incident;
