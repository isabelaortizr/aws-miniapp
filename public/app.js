const requestForm = document.getElementById("requestForm");
const formResponse = document.getElementById("formResponse");
const requestsList = document.getElementById("requestsList");
const loadRequestsBtn = document.getElementById("loadRequestsBtn");

async function loadRequests() {
  requestsList.innerHTML = "<p>Cargando solicitudes...</p>";

  try {
    const response = await fetch("/api/requests");
    const result = await response.json();

    if (!result.success || !result.data.length) {
      requestsList.innerHTML = "<p>No hay solicitudes registradas.</p>";
      return;
    }

    requestsList.innerHTML = result.data
      .map(
        (request) => `
          <div class="request-item">
            <h3>${request.subject}</h3>
            <p><strong>ID:</strong> ${request.id}</p>
            <p><strong>Área:</strong> ${request.area}</p>
            <p><strong>Solicitante:</strong> ${request.applicant}</p>
            <span class="status">${request.status}</span>
          </div>
        `
      )
      .join("");
  } catch (error) {
    requestsList.innerHTML = "<p>Error al cargar las solicitudes.</p>";
  }
}

requestForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const area = document.getElementById("area").value;
  const subject = document.getElementById("subject").value;
  const applicant = document.getElementById("applicant").value;

  try {
    const response = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ area, subject, applicant })
    });

    const result = await response.json();

    if (!result.success) {
      formResponse.textContent = result.message;
      return;
    }

    formResponse.textContent = result.message;
    requestForm.reset();
    loadRequests();
  } catch (error) {
    formResponse.textContent = "Error al registrar la solicitud.";
  }
});

loadRequestsBtn.addEventListener("click", loadRequests);

loadRequests();