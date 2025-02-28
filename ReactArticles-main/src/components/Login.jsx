import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To capture login errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      // Make a POST request to your backend for authentications
      const response = await axios.post("http://localhost:8801/users/login", {
        username,
        password,
      });

      // If login is successful, navigate to the main page
      if (response.data.message === "Logged in successfully." ) {
        navigate("/mainPage");
      }
    } catch (error) {
      // If there is an error, display it (e.g., incorrect username/password)
      setError("Invalid username or password.");
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
                {error && <div className="error-message">{error}</div>}{" "}
                <div class="login-form-group">
                  <div className="username-form">
                    <label className="login-label" for="name">
                      User Name:
                    </label>
                    <input
                      type="text"
                      class="login-form-control"
                      id="username"
                      name="name"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="password-form">
                    <label className="login-label" for="name">
                      password:
                    </label>
                    <input
                      type="password"
                      class="password-form-control"
                      id="password"
                      name="name"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" class="login-btn">
                    Login
                  </button>
                  <h3>Don't have an account?</h3>
                  <button type="button" class="signup-btn">
                    SIGN UP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;
