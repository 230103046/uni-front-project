const form = document.getElementById("reservationForm");

function showPopup(type, message) {
    const popup = document.getElementById(`popup-${type}`);
    popup.textContent = message;
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const date = document.getElementById("date").value;
    const guests = Number(document.getElementById("guests").value);

    const today = new Date().toISOString().split("T")[0];

    if (name.length < 2) {
        return showPopup("error", "Length should be greater than 2");
    } else if (date < today) {
        return showPopup("error", "Cannot schedule past date");
    } else if (guests > 100) {
        return showPopup("error", "Guests cannot exceed 100");
    }
    form.reset();
    showPopup("success", "Reservation has established");
});