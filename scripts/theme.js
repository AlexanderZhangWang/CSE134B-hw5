document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleBtn = document.getElementById("themeToggle");
  
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      body.classList.add("light-theme");
    }
  
    if (toggleBtn) {
        toggleBtn.style.display = "inline-block";
    
        toggleBtn.addEventListener("click", () => {
            body.classList.toggle("light-theme");
            if (body.classList.contains("light-theme")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
            });
    }
});
  