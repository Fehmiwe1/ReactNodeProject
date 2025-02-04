import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/EditPost.css";

function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();

  const { post } = location.state;

  const [editedPost, setEditedPost] = useState({ ...post });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Post:", editedPost);

    navigate("/");
  };

  return (
    <div className="main">
      <h2 >Edit article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="title"
            value={editedPost.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={editedPost.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditPost;
