let menuGrid = document.getElementById("menuGrid");
const searchInput = document.getElementById("menuSearch");
let filterCategory = document.getElementById("filterCategory");

if (!menuGrid) {
  const container = document.querySelector(".container") || document.body;
  const grid = document.createElement("div");
  grid.id = "menuGrid";
  grid.className = "menu-grid";
  container.appendChild(grid);
  menuGrid = grid;
}

if (!searchInput) {
  const tools =
    document.querySelector(".menu-tools") ||
    document.querySelector(".container") ||
    document.body;
  const input = document.createElement("input");
  input.id = "menuSearch";
  input.placeholder = "Поиск блюда...";
  if (tools) tools.appendChild(input);
}

if (!filterCategory) {
  const tools =
    document.querySelector(".menu-tools") ||
    document.querySelector(".container") ||
    document.body;
  const select = document.createElement("select");
  select.id = "filterCategory";
  select.innerHTML = `<option value="all">Все категории</option>`;
  if (tools && tools.firstChild) tools.insertBefore(select, tools.firstChild);
  else if (tools) tools.appendChild(select);
  filterCategory = select;
}

let modal = document.getElementById("mealModal");
if (!modal) {
  modal = document.createElement("div");
  modal.id = "mealModal";
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal" style="cursor:pointer;font-size:22px;float:right;margin-left:8px;">&times;</span>
      <img id="modalImg" style="width:100%;border-radius:8px;margin-bottom:12px;" alt="">
      <h2 id="modalTitle" style="margin-top:0;"></h2>
      <p><strong>Category:</strong> <span id="modalCategory"></span></p>
      <p><strong>Country:</strong> <span id="modalArea"></span></p>
      <h3>Ingredients:</h3>
      <ul id="modalIngredients"></ul>
      <h3>Instructions:</h3>
      <p id="modalInstructions"></p>
    </div>
  `;
  document.body.appendChild(modal);
}

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalArea = document.getElementById("modalArea");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");

let allMeals = [];
let detailedMeals = [];

function randomPrice() {
  return Math.floor(Math.random() * (10000 - 2000)) + 2000;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function getShortDescription(meal) {
  return `A traditional ${meal.strArea} dish in the ${meal.strCategory} category.`;
}

function renderMenu(list) {
  menuGrid.innerHTML = "";

  if (!list || list.length === 0) {
    menuGrid.innerHTML =
      "<p style='grid-column:1/-1;text-align:center;color:#666;'>No results.</p>";
    return;
  }

  list.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.dataset.name = (meal.strMeal || "").toLowerCase();
    card.dataset.category = meal.strCategory || "Different";

    card.innerHTML = `
      <img src="${meal.strMealThumb || ""}" alt="${meal.strMeal || ""}">
      <div class="menu-content">
        <h3>${meal.strMeal || "Without a title"}</h3>
        <p class="desc">Category: ${meal.strCategory || "Different"}</p>
        <p class="price">${randomPrice()} ₸</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(meal));
    menuGrid.appendChild(card);
  });
}

// function openModal(meal) {
//   if (!meal) return;
//   modal.style.display = "flex";
//   modalImg.src = meal.strMealThumb || "";
//   modalTitle.textContent = meal.strMeal || "";
//   modalCategory.textContent = meal.strCategory || "";
//   modalArea.textContent = meal.strArea || "";

//   modalInstructions.textContent = meal.strInstructions || getShortDescription(meal);

//   modalIngredients.innerHTML = "";
//   for (let i = 1; i <= 20; i++) {
//     const ing = meal[`strIngredient${i}`];
//     const meas = meal[`strMeasure${i}`];
//     if (ing && ing.trim()) {
//       const li = document.createElement("li");
//       li.textContent = `${ing} — ${meas || ""}`;
//       modalIngredients.appendChild(li);
//     }
//   }
// }

function openModal(meal) {
  if (!meal) return;
  modal.style.display = "flex";
  modalImg.src = meal.strMealThumb || "";
  modalTitle.textContent = meal.strMeal || "";
  modalCategory.textContent = meal.strCategory || "";
  modalArea.textContent = meal.strArea || "";
  modalInstructions.textContent = getShortDescription(meal);

  // Ingredients list:
  modalIngredients.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      const li = document.createElement("li");
      li.textContent = `${ing} — ${meas || ""}`;
      modalIngredients.appendChild(li);
    }
  }
}

document.querySelector(".close-modal").onclick = () => {
  modal.style.display = "none";
};
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

const searchEl = document.getElementById("menuSearch");
const categoryEl = document.getElementById("filterCategory");

function applyFilters() {
  const q = (searchEl.value || "").toLowerCase();
  const cat = categoryEl.value || "all";

  const filtered = detailedMeals.filter((meal) => {
    const matchesQ = (meal.strMeal || "").toLowerCase().includes(q);
    const matchesCat = cat === "all" ? true : meal.strCategory === cat;
    return matchesQ && matchesCat;
  });

  renderMenu(filtered);
}

searchEl.addEventListener("input", debounce(applyFilters, 200));
categoryEl.addEventListener("change", applyFilters);

function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

async function loadGlobalMenu() {
  try {
    const categoriesUrl =
      "https://www.themealdb.com/api/json/v1/1/categories.php";
    const catRes = await fetch(categoriesUrl);
    const catData = await catRes.json();
    const categories =
      catData && catData.categories
        ? catData.categories.map((c) => c.strCategory)
        : [];

    if (categoryEl && categoryEl.children.length <= 1) {
      categories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categoryEl.appendChild(opt);
      });
    }

    let meals = [];
    for (const category of categories) {
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
          category
        )}`;
        const r = await fetch(url);
        const d = await r.json();
        if (d && d.meals) meals.push(...d.meals);
      } catch (e) {
        console.warn("Ошибка загрузки категории", category, e);
      }
    }

    if (meals.length === 0) {
      menuGrid.innerHTML =
        "<p style='grid-column:1/-1;text-align:center;color:#666;'>Не удалось загрузить блюда.</p>";
      return;
    }

    shuffleArray(meals);
    allMeals = meals.slice(0, 10);

    const lookups = allMeals.map((m) => {
      const id = m.idMeal;
      return fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
          id
        )}`
      )
        .then((r) => r.json())
        .then((data) => (data.meals ? data.meals[0] : null))
        .catch((err) => {
          console.warn("lookup error for", id, err);
          return null;
        });
    });

    const detailed = await Promise.all(lookups);
    detailedMeals = detailed.filter(Boolean);

    renderMenu(detailedMeals);
  } catch (err) {
    console.error("Error loading menu:", err);
    menuGrid.innerHTML =
      "<p style='grid-column:1/-1;text-align:center;color:#666;'>Ошибка загрузки меню.</p>";
  }
}

loadGlobalMenu();
