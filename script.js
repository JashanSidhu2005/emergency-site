const services = [
  { title: "Police", number: "100", img: "images/police.jpg" },
  { title: "Ambulance", number: "102 / 108", img: "images/ambulance.jpg" },
  { title: "Fire", number: "101", img: "images/fire.jpg" },
  { title: "Women Helpline", number: "1091", img: "images/women.jpg" },
  { title: "Child Helpline", number: "1098", img: "images/child.jpg" },
  { title: "Cyber Crime", number: "1930", img: "images/cyber.jpg" },
  { title: "Tourist Helpline", number: "1363", img: "images/tourist.jpg" },
  { title: "Road Accident", number: "1073", img: "images/road.jpg" },
  { title: "Disaster Management", number: "108 / 112", img: "images/disaster.jpg" }
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
      <a href="tel:${s.number.split(' ')[0]}" class="btn btn-danger mt-2 w-100">Call Now</a>
    </div>
  `;
  grid.appendChild(card);
});

// make all .call-now links use same-tab navigation
document.addEventListener('click', function(e){
  const el = e.target.closest('.call-now');
  if(!el) return;
  e.preventDefault();
  const tel = el.getAttribute('data-tel') || el.getAttribute('href');
  if(tel) window.location.href = tel;
});

// WhatsApp SOS
document.getElementById("whatsappSOS").addEventListener("click", () => {
  if (!confirm("Send your live location on WhatsApp?")) return;

  if (!navigator.geolocation) {
    alert("Location not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const link = `https://www.google.com/maps?q=${lat},${lon}`;
    const msg = `I need help! My location: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  });
});