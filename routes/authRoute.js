const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  // Mock User
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com",
  };
  jwt.sign({ user }, "secretKey", { expiresIn: "1h" }, (err, token) => {
    user.token = token;
    res.json(user);
  });
});

module.exports = router;
