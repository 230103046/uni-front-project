const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const startersBtn = document.getElementById("startersBtn");
const mainCourseBtn = document.getElementById("mainCourseBtn");
const soupsBtn = document.getElementById("soupsBtn");
const dessertsBtn = document.getElementById("dessertsBtn");
const starters = document.getElementById("starters");
const mainCourse = document.getElementById("mainCourse");
const soups = document.getElementById("soups");
const desserts = document.getElementById("desserts");

if (
  startersBtn && mainCourseBtn && soupsBtn && dessertsBtn &&
  starters && mainCourse && soups && desserts
) {
  startersBtn.addEventListener("click", () => logRegSwitch("starters"));
  mainCourseBtn.addEventListener("click", () => logRegSwitch("mainCourse"));
  soupsBtn.addEventListener("click", () => logRegSwitch("soups"));
  dessertsBtn.addEventListener("click", () => logRegSwitch("desserts"));
}

function logRegSwitch(name) {
    if (name === "starters") {
        starters.style.display = "";
        mainCourse.style.display = "none";
        soups.style.display = "none";
        desserts.style.display = "none";
        startersBtn.style.color = "#9fc4ce";
        mainCourseBtn.style.color = "#000";
        soupsBtn.style.color = "#000";
        dessertsBtn.style.color = "#000";
    } else if (name === "mainCourse") {
        starters.style.display = "none";
        mainCourse.style.display = "";
        soups.style.display = "none";
        desserts.style.display = "none";
        startersBtn.style.color = "#000";
        mainCourseBtn.style.color = "#9fc4ce";
        soupsBtn.style.color = "#000";
        dessertsBtn.style.color = "#000";
    } else if (name === "soups") {
        starters.style.display = "none";
        mainCourse.style.display = "none";
        soups.style.display = "";
        desserts.style.display = "none";
        startersBtn.style.color = "#000";
        mainCourseBtn.style.color = "#000";
        soupsBtn.style.color = "#9fc4ce";
        dessertsBtn.style.color = "#000";
    } else if (name === "desserts") {
        starters.style.display = "none";
        mainCourse.style.display = "none";
        soups.style.display = "none";
        desserts.style.display = "";
        startersBtn.style.color = "#000";
        mainCourseBtn.style.color = "#000";
        soupsBtn.style.color = "#000";
        dessertsBtn.style.color = "#9fc4ce";
    }
}