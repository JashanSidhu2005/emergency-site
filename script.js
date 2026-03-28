/* --------------------------------------
   DATA: COUNTRY WISE EMERGENCY NUMBERS
-------------------------------------- */
const emergencyData = {
  india: [
    { title: "Police", number: "100", img: "images/police.jpg" },
    { title: "Ambulance", number: "102", img: "images/ambulance.jpg" },
    { title: "Fire", number: "101", img: "images/fire.jpg" },
    { title: "Women Helpline", number: "1091", img: "images/women.jpg" },
    { title: "Child Helpline", number: "1098", img: "images/child.jpg" },
    { title: "Cyber Crime", number: "1930", img: "images/cyber.jpg" },
    { title: "Tourist Helpline", number: "1363", img: "images/tourist.jpg" },
    { title: "Road Accident", number: "1073", img: "images/road.jpg" },
    { title: "Disaster Management", number: "108", img: "images/disaster.jpg" }
  ],
  canada: [
    { title: "Police, Fire, Ambulance", number: "911", img: "images/police.jpg" },
    { title: "Poison Control", number: "1-844-POISON-X", img: "images/health.jpg" },
    { title: "Mental Health Crisis", number: "988", img: "images/mental.jpg" },
    { title: "Telehealth Ontario", number: "811", img: "images/ambulance.jpg" },
    { title: "Kids Help Phone", number: "1-800-668-6868", img: "images/child.jpg" }
  ]
};

// --------------------------------------
// THEME TOGGLE (DARK/LIGHT MODE)
// --------------------------------------
const themeToggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

if(themeToggleBtn) {
    // Set initial icon based on theme
    themeToggleBtn.innerHTML = currentTheme === "dark" ? "☀️" : "🌙";

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        let newTheme = theme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        
        themeToggleBtn.innerHTML = newTheme === "dark" ? "☀️" : "🌙";
    });
}

// --------------------------------------
// INITIALIZE GRID
// --------------------------------------
const grid = document.getElementById("cardsGrid");
const countrySelect = document.getElementById("countrySelect");
const searchInput = document.getElementById("searchInput");

function renderCards(country) {
    if (!grid) return; // if not on a page with a grid
    
    grid.innerHTML = "";
    const services = emergencyData[country] || [];
    
    services.forEach((s, index) => {
        const card = document.createElement("div");
        card.className = "col-12 col-md-6 col-lg-4";
        // Adding a slight delay to animation for each card
        card.style.animation = `fadeInUp 0.5s ease forwards ${(index * 0.05)}s`;
        card.style.opacity = "0"; 
        
        // Handle missing images by having a fallback
        const imgSrc = s.img ? s.img : 'images/bg.jpg';
        
        card.innerHTML = `
            <div class="card-box">
                <img src="${imgSrc}" alt="${s.title}" onerror="this.src='https://via.placeholder.com/400x200?text=Emergency'">
                <div class="card-body-custom">
                    <div class="card-title">${s.title}</div>
                    <div class="card-number">${s.number}</div>
                    <a href="tel:${s.number.replace(/\D/g,'')}" class="btn btn-call w-100">Call Now</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Global animation style injection
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

if(countrySelect) {
    // Initial Render
    renderCards(countrySelect.value);

    // Render on Change
    countrySelect.addEventListener("change", (e) => {
        renderCards(e.target.value);
        if(searchInput) searchInput.value = ""; // clear search on country switch
    });
}

// --------------------------------------
// SEARCH BAR
// --------------------------------------
if(searchInput) {
    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase();
        const cards = document.querySelectorAll(".card-box");

        cards.forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            card.parentElement.style.display = title.includes(value) ? "block" : "none";
        });
    });
}

// --------------------------------------
// WHATSAPP SOS & PANIC BUTTON
// --------------------------------------
const panicBtn = document.getElementById("panicBtn");
if(panicBtn) {
    panicBtn.addEventListener("click", function () {
        if ("geolocation" in navigator) {
            panicBtn.innerHTML = "LOCATING...";
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    let message = `🚨 EMERGENCY ALERT 🚨\n\nI need immediate assistance. My live location:\nhttps://www.google.com/maps?q=${lat},${lon}`;
                    let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
                    
                    panicBtn.innerHTML = "🚨 PANIC BUTTON – SHARE LIVE LOCATION";
                    window.location.href = url;
                }, 
                function(error) {
                    alert("Location access is required to send emergency alert. Please enable it in your browser settings.");
                    panicBtn.innerHTML = "🚨 PANIC BUTTON – SHARE LIVE LOCATION";
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });
}
