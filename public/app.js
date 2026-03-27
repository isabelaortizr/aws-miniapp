const loadMessageBtn = document.getElementById("loadMessageBtn");
const backendMessage = document.getElementById("backendMessage");
const contactForm = document.getElementById("contactForm");
const formResponse = document.getElementById("formResponse");

loadMessageBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/message");
    const data = await response.json();
    backendMessage.textContent = data.message;
  } catch (error) {
    backendMessage.textContent = "Error al conectar con el backend";
  }
});

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, message })
    });

    const data = await response.json();
    formResponse.textContent = data.message;
  } catch (error) {
    formResponse.textContent = "Error al enviar el formulario";
  }
});