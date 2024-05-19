require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const saltRounds = 10;
let refreshTokens = [];

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = listUserAdmin.find((user) => user.email === email);

  if (!user) {
    return res
      .status(401)
      .json({ message: "Correo electrónico o contraseña incorrectos" });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken({ email: user.email });
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET
      );
      refreshTokens.push(refreshToken);
      res.cookie("session", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({ accessToken, refreshToken });
    } else {
      return res
        .status(401)
        .json({ message: "Correo electrónico o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error al generar tokens:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/profile", authenticateToken, (req, res) => {
  const userEmail = req.user.email;
  const user = listUsers.find((user) => user.email === userEmail);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json({
    username: user.username,
    lastName: user.lastName,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
  });
});

app.get("/contacts", authenticateToken, (req, res) => {
  res.json(listUsers);
});

app.post("/form", authenticateToken, (req, res) => {
  const text = req.body.text;
  res.json({ text: text });
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email });
    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(400);
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.clearCookie("session"); // Elimina la cookie de sesión al cerrar sesión
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
