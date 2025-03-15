// function loadProjectCards() {
//     const cachedProjects = localStorage.getItem("projectsData");
//     if (cachedProjects) {
//         createProjectCards(JSON.parse(cachedProjects));
//     } else {
//       fetch("json/projects.json")
//         .then((response) => response.json())
//         .then((data) => {
//             localStorage.setItem("projectsData", JSON.stringify(data));
//             createProjectCards(data);
//         })
//         .catch((error) => console.error("Error fetching projects:", error));
//     }
// }
function parseStartDate(dateRangeStr) {
    const startDateStr = dateRangeStr.split(" - ")[0]; 
    return new Date("1 " + startDateStr);
}
function createProjectCards(projects) {
    // projects.sort((a, b) => parseStartDate(b.date) - parseStartDate(a.date));
    projects = projects.slice(0, 2);
    const container = document.querySelector("#projects .project_list");
    container.innerHTML = "";
    projects.forEach((project) => {
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
        container.appendChild(listItem);
    });
}
  
// document.addEventListener("DOMContentLoaded", loadProjectCards);

function loadLocalProjects() {
    const cachedProjects = localStorage.getItem("projectsData");
    if (!cachedProjects) {
        alert("No local projectsData found in localStorage!");
        return;
    }
    const projects = JSON.parse(cachedProjects);
    createProjectCards(projects);
  }
  
function loadRemoteProjects() {
    const REMOTE_URL = "https://my-json-server.typicode.com/AlexanderZhangWang/json/posts";

    fetch(REMOTE_URL)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("projectsData", JSON.stringify(data));
            createProjectCards(data);
        })
        .catch((error) => console.error("Error fetching remote projects:", error));
}

function loadExperienceCards() {
    const cachedExperience = localStorage.getItem("experience.json");
    if (cachedExperience) {
        createExperienceCards(JSON.parse(cachedExperience));
    } else {
      fetch("json/experience.json")
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("experienceData", JSON.stringify(data));
            createExperienceCards(data);
        })
        .catch((error) => console.error("Error fetching experience:", error));
    }
}
function createExperienceCards(experience) {
    experience.sort((a, b) => parseStartDate(b.date) - parseStartDate(a.date));
    // experience = experience.slice(0, 2);
    const container = document.querySelector("#experience .experience_list");
    experience.forEach((project) => {
        const card = document.createElement("experience-card");
        card.setAttribute("title", project.title);
        card.setAttribute("company", project.company);
        card.setAttribute("date", project.date);
        card.setAttribute("description", project.description);
        card.setAttribute("link", project.link);
        
        if (project.tags && Array.isArray(project.tags)) {
            card.setAttribute("tags", project.tags.join(","));
        }
        
        const listItem = document.createElement("li");
        listItem.appendChild(card);
        container.appendChild(listItem);
    });
}


document.addEventListener("DOMContentLoaded", loadExperienceCards);
document.addEventListener("DOMContentLoaded", () => {
    const localBtn = document.getElementById("loadLocal");
    const remoteBtn = document.getElementById("loadRemote");
  
    localBtn.addEventListener("click", loadLocalProjects);
    remoteBtn.addEventListener("click", loadRemoteProjects);
});


  