class ExperienceCard extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
        this.render();
    }
  
    static get observedAttributes() {
      return ["title", "company", "date", "description", "link", "tags"];
    }
  
    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.render();
      }
    }
  
    render() {
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
                    ${this.getAttribute("title") || "Project Title"} · <i>${this.getAttribute("company") || "Company"}</i>
                    <a title="Link" target="_blank" href="${this.getAttribute("link") || "#"}" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="link" aria-hidden="true" viewBox="0 0 16 12"><line x1="3" y1="13" x2="13" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="8,3 13,3 13,8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                </span>
            </h3>
            <p>
                ${this.getAttribute("description") || "Project Description"}                          
            </p>
            <ul class="skill">
                ${tagsHTML}
            </ul>
        </div>    
      `;
    }
  }
  
customElements.define("experience-card", ExperienceCard);
  