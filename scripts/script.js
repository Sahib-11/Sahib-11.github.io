const projectsContainer = document.getElementById("projectsContainer");

async function loadProjects() {
  try {
    const res = await fetch("data/projects.json", {
      cache: "no-store",
    });

    const projects = await res.json();

    projects.forEach((project) => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      // Carousel
      const carouselId = `carousel-${Math.random().toString(36).substr(2, 5)}`;
      const images = project.images || [project.image];

      card.innerHTML = `
        <div class="project-card">

          <!-- Carousel -->
          ${
            project.images?.length || project.image
              ? `
          <div id="${carouselId}" class="carousel slide">

            <div class="carousel-inner">
              ${images
                .map(
                  (img, index) => `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                  <img src="${img}" class="d-block w-100 project-img">
                </div>
              `,
                )
                .join("")}
            </div>

            ${
              images.length > 1
                ? `
              <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>

              <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            `
                : ""
            }
          </div>
          `
              : ""
          }
          <!-- END Carousel -->
          
          <br>
          <h5>${project.title}</h5>

          <p class="text-secondary">
            ${
              Array.isArray(project.description)
                ? project.description.join(" ")
                : project.description
            }
          </p>

          <div class="tech-list">
            ${project.tech.map((t) => `${t}`).join("")}
          </div>

          <div class="d-flex gap-2 mt-3">
            ${project.liveLink ? `<a href="${project.liveLink}" class="btn btn-primary btn-sm" target="_blank">Live Site</a>` : ""}
            ${project.githubLink ? `<a href="${project.githubLink}" class="btn btn-outline-primary btn-sm" target="_blank">GitHub</a>` : ""}
          </div>
        </div>
      `;

      projectsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    projectsContainer.innerHTML = `<p class="text-danger">Failed to load projects</p>`;
  }
}

loadProjects();
