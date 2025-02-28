const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const app = express();
app.use(express.json());
const session = require("express-session");
const bcrypt = require("bcrypt");
// Execute a query to the database
const db = dbSingleton.getConnection();

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }, // 1 hour
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

// התחברות משתמש
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // בדיקה שהשדות קיימים
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  // שליפת המשתמש מבסיס הנתונים לפי שם משתמש
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }

    // בדיקה אם המשתמש קיים
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid username or password." });
      return;
    }

    const user = results[0];

    // השוואת הסיסמה מול ה-Hash
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ error: "Invalid username or password." });
        return;
      }

      // שמירת פרטי המשתמש ב-Session
      req.session.user = {
        id: user.id,
        username: user.username,
      };

      res.json({ message: "Logged in successfully." });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error terminating session." });
    }
    res.clearCookie("connect.sid"); // Clears the session cookie
    res.json({ message: "Session ended successfully." });
  });
});

module.exports = router;
