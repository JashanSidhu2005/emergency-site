// --------------------------------------
// EMERGENCY CARDS
// --------------------------------------
const services = [
  { title: "Police", number: "100", img: "images/police.jpg" },
  { title: "Ambulance", number: "102", img: "images/ambulance.jpg" },
  { title: "Fire", number: "101", img: "images/fire.jpg" },
  { title: "Women Helpline", number: "1091", img: "images/women.jpg" },
  { title: "Child Helpline", number: "1098", img: "images/child.jpg" },
  { title: "Cyber Crime", number: "1930", img: "images/cyber.jpg" },
  { title: "Tourist Helpline", number: "1363", img: "images/tourist.jpg" },
  { title: "Road Accident", number: "1073", img: "images/road.jpg" },
  { title: "Disaster Management", number: "108", img: "images/disaster.jpg" }
];

const grid = document.getElementById("cardsGrid");

services.forEach(s => {
  const card = document.createElement("div");
  card.className = "col-12 col-md-6 col-lg-4";
  card.innerHTML = `
    <div class="card-box">
      <img src="${s.img}" alt="${s.title}">
      <div class="card-title">${s.title}</div>
      <div class="card-number">${s.number}</div>
      <a href="tel:${s.number}" class="btn btn-danger mt-2 w-100">Call Now</a>
    </div>
  `;
  grid.appendChild(card);
});

// --------------------------------------
// SEARCH BAR
// --------------------------------------
document.getElementById("searchInput").addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card-box");

    cards.forEach(card => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        card.parentElement.style.display = title.includes(value) ? "block" : "none";
    });
});

// --------------------------------------
// WHATSAPP SOS
// --------------------------------------
document.getElementById("whatsappSOS").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let message = `I need help. My location: https://www.google.com/maps?q=${lat},${lon}`;
        let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

        window.location.href = url;
    });
});

// --------------------------------------
// DARK MODE
// --------------------------------------
document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// --------------------------------------
// VOICE SEARCH
// --------------------------------------
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

document.getElementById("voiceBtn").addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = function(event) {
    document.getElementById("searchInput").value = event.results[0][0].transcript;
    document.getElementById("searchInput").dispatchEvent(new Event("input"));
};

// --------------------------------------
// NEARBY HOSPITALS & POLICE
// --------------------------------------
document.getElementById("nearbyBtn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        window.open(`https://www.google.com/maps/search/hospital+police/@${lat},${lon},14z`);
    });
});

// --------------------------------------
// PANIC BUTTON
// --------------------------------------
document.getElementById("panicBtn").addEventListener("click", () => {
    document.getElementById("whatsappSOS").click();
});
