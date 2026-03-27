const express = require("express");
const path = require("path");

const app = express();
const PORT = 80;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let requests = [
  {
    id: 1,
    area: "Recursos Humanos",
    subject: "Solicitud de vacaciones",
    applicant: "Isabela Ortiz",
    status: "Pendiente"
  },
  {
    id: 2,
    area: "Sistemas",
    subject: "Soporte de acceso a plataforma",
    applicant: "Carlos Mendoza",
    status: "En proceso"
  }
];

app.get("/api/requests", (req, res) => {
  res.json({
    success: true,
    data: requests
  });
});

app.post("/api/requests", (req, res) => {
  const { area, subject, applicant } = req.body;

  if (!area || !subject || !applicant) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son obligatorios"
    });
  }

  const newRequest = {
    id: requests.length + 1,
    area,
    subject,
    applicant,
    status: "Pendiente"
  };

  requests.push(newRequest);

  res.status(201).json({
    success: true,
    message: "Solicitud registrada correctamente",
    data: newRequest
  });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});