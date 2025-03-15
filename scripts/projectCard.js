class ProjectCard extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
        this.render();
    }
  
    static get observedAttributes() {
      return ["title", "date", "img", "alt", "description", "link", "tags"];
    }
  
    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.render();
      }
    }
  
    render() {
        const rawDescription = this.getAttribute("description") || "[]";
        let descriptionHTML = "";
        try {
          const descArray = JSON.parse(rawDescription);
          if (Array.isArray(descArray)) {
            descriptionHTML = descArray
              .map(line => `<p>${line}</p>`)
              .join("");
          } else {
            descriptionHTML = `<p>${rawDescription}</p>`;
          }
        } catch (err) {
          descriptionHTML = `<p>${rawDescription}</p>`;
        }
        const tagsAttr = this.getAttribute("tags");
        let tagsHTML = "";
        if (tagsAttr) {
          const tags = tagsAttr.split(",").map(tag => tag.trim());
          tagsHTML = `<ul class="skill">${tags.map(tag => `<li>${tag}</li>`).join("")}</ul>`;
        }
      this.innerHTML = `  
        <header>${this.getAttribute("date") || "Date"}</header>
        <div>
            <h3>
                <span>
                    ${this.getAttribute("title") || "Project Title"} 
                    <a title="Link" target="_blank" href="${this.getAttribute("link") || "#"}" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="link" aria-hidden="true" viewBox="0 0 16 12"><line x1="3" y1="13" x2="13" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="8,3 13,3 13,8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                </span>
            </h3>
            <article>
              ${descriptionHTML}
            </article>
            <ul class="skill">
                ${tagsHTML}
            </ul>
            <figure>
                <picture>
                    <img src="${this.getAttribute("img") || 'images/default.png'}" alt="${this.getAttribute("alt") || "Project Image"}">
                </picture>
                <figcaption>${this.getAttribute("title")}</figcaption>
            </figure>
        </div>    
      `;
    }
  }
  
customElements.define("project-card", ProjectCard);
  