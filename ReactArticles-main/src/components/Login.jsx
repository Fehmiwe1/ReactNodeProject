import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // Redirect to the main page directly
    navigate("/mainPage");
  };

  return (
    <div className="LoginP">
      <section>
        <div className="container">
          <div className="mainPageContainer">
            <div className="login-container">
              <form className="login-form">
                <h1>LogIn</h1>
                <div class="login-form-group">
                  <div className="username-form">
                    <label className="login-label" for="name">
                      User Name:
                    </label>
                    <input
                      type="text"
                      class="login-form-control"
                      id="name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="password-form">
                    <label className="login-label" for="name">
                      password:
                    </label>
                    <input
                      type="password"
                      class="password-form-control"
                      id="name"
                      name="name"
                      required
                    />
                  </div>

                  <button type="submit" class="login-btn" onClick={handleLogin}>
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
