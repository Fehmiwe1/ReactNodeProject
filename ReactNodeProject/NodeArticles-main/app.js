const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const session = require("express-session");
const userRoutes = require("./routes/user");
const incidentRoutes = require("./routes/incident");
const port = 8801;

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // For HTTPS use true
  })
);

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/post", incidentRoutes);
app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
