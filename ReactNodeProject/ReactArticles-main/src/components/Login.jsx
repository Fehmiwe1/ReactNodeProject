import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To capture login errors
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false); // To toggle sign-up modal
  const [newUser, setNewUser] = useState({ username: "", password: "" }); // For new user sign-up form data
  const [successMessage, setSuccessMessage] = useState(null); // Success message for sign-up

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      // Make a POST request to your backend for authentication
      const response = await axios.post("http://localhost:8801/users/login", {
        username,
        password,
      });

      // If login is successful, navigate to the main page
      if (response.data.message === "Logged in successfully.") {
        navigate("/mainPage");
      }
    } catch (error) {
      // If there is an error, display it (e.g., incorrect username/password)
      setError("Invalid username or password.");
    }
  };

  // Handle sign up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8801/users/register",
        {
          username: newUser.username,
          password: newUser.password,
        }
      );

      if (response.data.message === "User added!") {
        setSuccessMessage("Sign-up successful! You can now log in."); // Set success message

        // Clear the sign-up form fields
        setNewUser({ username: "", password: "" });

        // Close the sign-up modal after 2 seconds
        setTimeout(() => {
          setShowSignUp(false); // Close the modal after 2 seconds
          setSuccessMessage(null); // Hide success message after modal closes
        }, 2000);
      }
    } catch (error) {
      setError("Error creating user.");
    }
  };

  return (
    <div className="LoginP">
      <section>
        <div className="container">
          <div className="mainPageContainer">
            <div className="login-container">
              <form className="login-form" onSubmit={handleLogin}>
                <h1>LogIn</h1>
                {/* Display error message */}
                {error && <div className="error-message">{error}</div>}
                <div className="login-form-group">
                  <div className="username-form">
                    <label className="login-label" htmlFor="username">
                      User Name:
                    </label>
                    <input
                      type="text"
                      className="login-form-control"
                      id="username"
                      name="name"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="password-form">
                    <label className="login-label" htmlFor="password">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="password-form-control"
                      id="password"
                      name="name"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  <h3>Don't have an account?</h3>
                  <button
                    type="button" // Change to 'button' to prevent form submission
                    className="signup-btn"
                    onClick={() => setShowSignUp(true)} // Open sign-up modal
                  >
                    SIGN UP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="signup-modal">
          <div className="signup-modal-content">
            <span className="close-btn" onClick={() => setShowSignUp(false)}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <p>Sign up to continue</p>
            {/* Success Message */}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <form className="signup-form" onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="new-username">Username:</label>
                <input
                  type="text"
                  id="new-username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">Password:</label>
                <input
                  type="password"
                  id="new-password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
