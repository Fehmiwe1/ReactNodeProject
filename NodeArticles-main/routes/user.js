const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const app = express();
app.use(express.json());
const session = require("express-session");
const bcrypt = require("bcrypt");
// Execute a query to the database
const db = dbSingleton.getConnection();

router.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // For HTTPS use true
  })
);

router.get("/showusers", (req, res) => {
  const qString = "SELECT * FROM users";
  db.query(qString, (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    console.table(results);
    res.json(results);
  });
});

// // רישום משתמש חדש
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // שלב 1: בדיקת אם ה-id קיים עם COUNT
  const checkQuery = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
  db.query(checkQuery, [username], async (error, results) => {
    // הפכתי את הבדיקה לאסינכרונית
    if (error) {
      res.status(500).send(error);
      return;
    }
    if (results[0].count > 0) {
      // אם ה-id כבר קיים
      res.status(409).json({ error: "User already exists." });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // שימוש נכון ב-await

      // שלב 2: הכנסה לטבלה אם ה-id לא קיים
      const qString = "INSERT INTO users ( username,password) VALUES (?, ?)";
      db.query(qString, [username, hashedPassword], (error, results) => {
        if (error) {
          res.status(500).send(error);
          return;
        }

        res.json({ message: "User added!" });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
});

module.exports = router;
