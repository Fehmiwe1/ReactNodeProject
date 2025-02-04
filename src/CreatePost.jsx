import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/CreatePost.css";

function CreatePost() {
  const [newPost, setNewPost] = useState({
    title: "",

    content: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState({ style: "", text: "" });
  const navigate = useNavigate();

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };
  const cleanString = (str) => {
    // מוחק אם יש יותר מרווח אחד
    return str.trim().replace(/\s+/g, " ");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Cleaning data from extra spaces
    const cleanedPost = {
      title: cleanString(newPost.title),

      content: cleanString(newPost.content),
      //  מוחק את הרווחים בצדדים
      image: newPost.image.trim(),
    };
    // Check if required fields are filled
    if (!cleanedPost.title || !cleanedPost.content) {
      // setError("Please fill in all the required fields.");
      setMsg({
        calssText: "error",
        text: "Please fill in all the required fields.",
      });
      return;
    }
    if (cleanedPost.title.length < 3) {
      //   setError("The title length must be more than 3 characters.");
      setMsg({
        calssText: "error",
        text: "The title length must be more than 3 characters.",
      });
      return;
    }
    // setError("");
    setMsg({
      calssText: "success",
      text: "Data Was Sent.",
    });
    console.log("New Post:", cleanedPost);
    // Go back to the main page
    // navigate('/');
  };

  return (
    <div className="main">
      <div className="create-post">
        <h2>Create a New Post</h2>
        {msg && <p className={msg.calssText}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Content:</label>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={newPost.image}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
