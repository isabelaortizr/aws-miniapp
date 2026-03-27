const express = require("express");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/message", (req, res) => {
  res.json({ success: true, message: "Hola desde AWS 🚀" });
});

app.post("/api/contact", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      success: false,
      message: "Nombre y mensaje son obligatorios"
    });
  }

  res.json({
    success: true,
    message: `Gracias ${name}, tu mensaje fue recibido correctamente`
  });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});