const express = require("express");
const multer = require("multer");
const app = express();
app.use(express.json());
const session = require("express-session");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const articleRoutes = require("./routes/articles");
const port = 8801;
const dbSingleton = require("./dbSingleton");
const db = dbSingleton.getConnection();

// app.use(
//   session({
//     secret: "your_secret_key",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // For HTTPS use true
//   })
// );


app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/users", userRoutes);
app.use("/prods", productRoutes);
app.use("/post", articleRoutes);
app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});



// app.get("/userspass", (req, res) => {
//   const qString = "SELECT * FROM users";
//   db.query(qString, (error, results) => {
//     if (error) {
//       res.status(500).send(error);
//       return;
//     }
//     console.table(results);
//     res.json(results);
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
