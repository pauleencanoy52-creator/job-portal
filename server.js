const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DB CONNECTION =================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "job_portal"
});

db.connect(err => {
    if (err) {
        console.log("❌ DB CONNECTION ERROR:", err);
    } else {
        console.log("✅ MySQL Connected");
    }
});

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

// ================= LOGIN =================
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password],
        (err, result) => {

            if (err) {
                return res.status(500).json({ success: false, message: "DB error" });
            }

            if (result.length > 0) {
                res.json({ success: true, user: result[0] });
            } else {
                res.json({ success: false, message: "Invalid login" });
            }
        }
    );
});

// ================= REGISTER =================
app.post("/register", (req, res) => {

    const { name, username, email, password } = req.body;

    db.query(
        "INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)",
        [name, username, email, password],
        (err) => {

            if (err) {
                return res.json({ success: false });
            }

            res.json({ success: true });
        }
    );
});

// =====================================================
// ================= HIRED MODULE ======================
// =====================================================

// 👉 GET ALL HIRED
app.get("/hired", (req, res) => {

    db.query("SELECT * FROM hired", (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json([]);
        }

        res.json(result);
    });
});

// 👉 ADD HIRED (FROM INTERVIEW COMPLETE BUTTON)
app.post("/hired", (req, res) => {

    const { name, position, email, skills, status } = req.body;

    db.query(
        "INSERT INTO hired (name, position, email, skills, status) VALUES (?,?,?,?,?)",
        [name, position, email, skills, status],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({ success: false });
            }

            res.json({ success: true });
        }
    );
});

// 👉 DELETE HIRED
app.delete("/hired/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM hired WHERE id=?",
        [id],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({ success: false });
            }

            res.json({ success: true });
        }
    );
});

// ================= START SERVER =================
app.listen(5001, () => {
    console.log("🚀 Server running on http://localhost:5001");
});