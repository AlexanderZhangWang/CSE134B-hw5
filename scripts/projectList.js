let allProjects = [];

document.addEventListener("DOMContentLoaded", () => {
    loadProjectsData();

    const searchInput = document.getElementById("searchInput");
    const skillFilter = document.getElementById("skill-filter");

    searchInput.addEventListener("input", () => {
        renderProjects();
    });

    skillFilter.addEventListener("change", () => {
        renderProjects();
    });
});


function loadProjectsData() {
    const cached = localStorage.getItem("projectsData");
    if (cached) {
        allProjects = JSON.parse(cached);
        populateSkillDropdown(allProjects);
        renderProjects();
    } else {
        fetch("json/projects.json")
        .then(resp => resp.json())
        .then(data => {
            allProjects = data;
            localStorage.setItem("projectsData", JSON.stringify(data));
            populateSkillDropdown(allProjects);
            renderProjects();
        })
        .catch(err => console.error("ProjectList.html Fetch error:", err));
  }
}

function populateSkillDropdown(projects) {
    const skillFilter = document.getElementById("skill-filter");

    const allTags = new Set();
    projects.forEach(proj => {
        if (Array.isArray(proj.tags)) {
            proj.tags.forEach(tag => allTags.add(tag));
        }
    });

    while (skillFilter.options.length > 1) {
        skillFilter.remove(1);
    }

    allTags.forEach(tag => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        skillFilter.appendChild(option);
    });
}

function renderProjects() {
    const searchInput = document.getElementById("searchInput");
    const skillFilter = document.getElementById("skill-filter");
    const listContainer = document.querySelector(".project_list");
    const projectCountHeading = document.getElementById("projectCount");

    listContainer.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const selectedSkill = skillFilter.value; 

    const filtered = allProjects.filter(proj => {
        const titleDesc = (proj.title + " " + proj.description).toLowerCase();
        const matchesSearch = titleDesc.includes(searchText);

        const matchesSkill = !selectedSkill ||
        (Array.isArray(proj.tags) && proj.tags.includes(selectedSkill));

        return matchesSearch && matchesSkill;
    });
    projectCountHeading.textContent = `Projects (${filtered.length})`;
    filtered.forEach(project => {
        const card = document.createElement("project-card");
        card.setAttribute("title", project.title);
        card.setAttribute("date", project.date);
        card.setAttribute("img", project.img);
        card.setAttribute("alt", project.alt);
        card.setAttribute("description", project.description);
        card.setAttribute("link", project.link);
        
        if (project.tags && Array.isArray(project.tags)) {
            card.setAttribute("tags", project.tags.join(","));
        }

        const listItem = document.createElement("li");
        listItem.appendChild(card);
        listContainer.appendChild(listItem);
    });
}
