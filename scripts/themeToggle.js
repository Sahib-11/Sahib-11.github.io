const toggleBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-bs-theme", savedTheme);
updateButton(savedTheme);

toggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateButton(newTheme);
});

function updateButton(theme) {
  toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}
