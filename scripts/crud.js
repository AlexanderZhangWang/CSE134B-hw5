document.addEventListener("DOMContentLoaded", () => {
    const fetchBtn = document.getElementById("fetchBtn");
    const readBtn = document.getElementById("readBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const crudForm = document.getElementById("crudForm");

    fetchBtn.addEventListener("click", fetchCrudJson);
  
    readBtn.addEventListener("click", displayCrudData);
  
    crudForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleCreateOrUpdate();
    });
  
    deleteBtn.addEventListener("click", handleDelete);
});
  
function fetchCrudJson() {
    fetch("/json/crud.json")     
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("crudData", JSON.stringify(data));
            displayCrudData();
        })
      .catch((err) => console.error("Error fetching crud.json:", err));
}
  
function displayCrudData() {
    const crudList = document.getElementById("crudList");
    crudList.innerHTML = ""; 

    const data = getCrudFromLocalStorage();
    if (!data || data.length === 0) {
        crudList.innerHTML = "<li>No data found.</li>";
        return;
    }

    data.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>ID:</strong> ${item.id} 
                        <br><strong>Title:</strong> ${item.title} 
                        <br><strong>Description:</strong> ${item.description}`;
        crudList.appendChild(li);
    });
}
  
function getCrudFromLocalStorage() {
    const jsonStr = localStorage.getItem("crudData");
    if (!jsonStr) return [];
    return JSON.parse(jsonStr);
}
  

function saveCrudToLocalStorage(arr) {
    localStorage.setItem("crudData", JSON.stringify(arr));
}
  
function handleCreateOrUpdate() {
    const idInput = document.getElementById("crudId");
    const titleInput = document.getElementById("crudTitle");
    const descInput = document.getElementById("crudDesc");

    const idStr = idInput.value.trim();  
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title) {
        alert("Title is required!");
        return;
    }

  let data = getCrudFromLocalStorage(); 

  if (idStr) {
      const idx = data.findIndex((item) => parseInt(item.id, 10) === parseInt(idStr, 10));      
      if (idx >= 0) {
          data[idx].title = title;
          data[idx].description = description;
      } else {
          data.push({ id: idStr, title, description });
      }
  } else {
      const newId = generateNextId(data);  
      const newItem = {
          id: newId,
          title,
          description,
      };
      data.push(newItem);
  }
  saveCrudToLocalStorage(data);

  idInput.value = "";
  titleInput.value = "";
  descInput.value = "";

  displayCrudData();
}

function generateNextId(dataArray) {
    if (dataArray.length === 0) return "1";  
    let maxId = dataArray.reduce((acc, item) => {
        const numericId = parseInt(item.id, 10) || 0; 
        return Math.max(acc, numericId);
    }, 0);

  return String(maxId + 1);
}

  
function handleDelete() {
    const deleteId = document.getElementById("deleteId").value.trim();
    if (!deleteId) {
        return;
    }

    let data = getCrudFromLocalStorage();
    const before = data.length;
    data = data.filter((item) => item.id !== deleteId);
    const after = data.length;

    if (after < before) {
      
    } else {
        alert("No item found with ID " + deleteId);
    }

    saveCrudToLocalStorage(data);
    displayCrudData();
    document.getElementById("deleteId").value = "";
}
  