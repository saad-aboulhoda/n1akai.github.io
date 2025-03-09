import { select, selectAll } from "../utils.js";
import { projects as data } from "../data/projects.js";
import { createObservable } from "../functions/createObservable.js";

export function projects() {
  select("#projects .cards-wrapper").innerHTML = renderProjects(data);

  const targets = selectAll("[more-details-target]");

  targets.forEach((element) => {
    element.addEventListener("click", () => {
      const targetId = element.getAttribute("more-details-target");
      const project = data.find(
        (element) => element.moreDetailsTarget === targetId
      );
      select(".project-details .container").innerHTML = renderDetails(project);
      /**
       * Show details
       */
      const elementTarget = select(".project-details");
      elementTarget.classList.add("active");
      /**
       * Next & Prev Buttons
       */
      let currentIndex = 0;
      const image = select(".images-wrapper img");

      const imageObservable = createObservable();
      const unsubscribeImage = imageObservable.subscribe((index) => {
        const startImageLoading = () => {
          select(".images-wrapper .loading").classList.add("active");
        };

        const stopImageLoading = () => {
          select(".images-wrapper .loading").classList.remove("active");
        };

        const removeActiveFromDot = () => {
          selectAll("#dots span").forEach((element) =>
            element.classList.remove("active")
          );
        };

        const addActiveToDot = (index) => {
          select(`#dot-${index}`).classList.add("active");
        };

        const blockNavigatingBetweenImages = () => {
          select("#slider-prev").style.pointerEvents = "none";
          select("#slider-next").style.pointerEvents = "none";
        };

        const unBlockNavigatingBetweenImages = () => {
          select("#slider-prev").style.pointerEvents = "auto";
          select("#slider-next").style.pointerEvents = "auto";
        };

        const onLoadedImage = () => {
          removeActiveFromDot();

          addActiveToDot(currentIndex);

          stopImageLoading();

          unBlockNavigatingBetweenImages();

          image.removeEventListener("load", onLoadedImage);
        };

        image.src = project.imgs[index];

        startImageLoading();

        blockNavigatingBetweenImages();

        image.addEventListener("load", onLoadedImage);
      });

      select("#slider-prev").addEventListener("click", () => {
        if (currentIndex === 0) {
          currentIndex = project.imgs.length - 1;
        } else {
          currentIndex -= 1;
        }
        imageObservable.broadcast(currentIndex);
      });

      select("#slider-next").addEventListener("click", () => {
        if (currentIndex === project.imgs.length - 1) {
          currentIndex = 0;
        } else {
          currentIndex += 1;
        }
        imageObservable.broadcast(currentIndex);
      });
      /**
       * Close Button
       */
      select(".project-details .content .close").addEventListener(
        "click",
        () => {
          unsubscribeImage();
          elementTarget.classList.remove("active");
        }
      );
      /**
       * Expand & Minimize Buttons
       */
      select("#expand").addEventListener("click", () => {
        // Change close button to white
        select(".project-details .container .content .close").style.color =
          "white";
        select(
          ".project-details .container .content .details .images-wrapper"
        ).classList.add("expand");
        select("#expand").classList.toggle("active");
        select("#minimize").classList.toggle("active");
      });
      select("#minimize").addEventListener("click", () => {
        select(".project-details .container .content .close").style.color = "";
        select(
          ".project-details .container .content .details .images-wrapper"
        ).classList.remove("expand");
        select("#expand").classList.toggle("active");
        select("#minimize").classList.toggle("active");
      });
    });
  });
}

function renderProjects(projectsArray) {
  return projectsArray
    .map(
      (project) => `
    <div class="card">
      <div class="${project.moreDetailsTarget ? "more-details" : ""}" 
           ${
             project.moreDetailsTarget
               ? `more-details-target="${project.moreDetailsTarget}"`
               : ""
           }>
        <img src="${project.imgs[0]}" />
      </div>
      <div class="card-body">
        <h4 class="card-title">${project.title}</h4>
        <div class="card-description line line-clamp-2">
          ${project.description}
        </div>
        <div class="badges-wrapper">
          ${project.tags
            .map((tag) => `<div class="badge">${tag}</div>`)
            .join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function renderDetails(detail) {
  return `<div class="content">
      <div class="close">
        <i class="fa-solid fa-xmark fa-xl"></i>
      </div>
      <div class="details">
        <div class="images-wrapper">
        <div class="loading"><i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i></div>
          <img  src="${detail.imgs[0]}" />
          <div id="expand">
            <i class="fa-solid fa-expand"></i>
          </div>
          <div id="dots">
            ${detail.imgs
              .map(
                (_, index) => `
              <span id="dot-${index}" ${
                  index == 0 ? `class="active"` : ""
                }></span>
            `
              )
              .join("")}
          </div>
          <div id="minimize" class="active">
            <i class="fa-solid fa-minimize"></i>
          </div>
          <div id="slider-prev">
            <i class="fa-solid fa-chevron-left"></i>
          </div>
          <div id="slider-next">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
        <div class="info">
          <h3 class="title">${detail.shortTitle}</h3>
          <p class="date">${detail.date}</p>
          <div class="my-2"></div>
          <p class="description">${detail.description}</p>
          <div class="my-2"></div>
          <h4>Technologies and Features</h4>
          <div class="my-2"></div>
          <div class="technologies">
            ${detail.technologies
              .map(
                (tech) => `
              <div class="tech">
                <i class="${
                  tech.icon === "" ? "fa-solid fa-tag" : tech.icon
                }" ${tech.icon === "" ? 'style="color: #e83538"' : ""}></i> ${
                  tech.text
                }
              </div>
            `
              )
              .join("")}
          </div>
          <div class="my-2"></div>
          <h4 class="${detail.links.length > 0 ? "" : "hidden"}"">Links</h4>
          <div class="my-2"></div>
          <div class="link">
            ${detail.links
              .map(
                (link) => `
              <a target="_blank" href="${link.link}">
                <i class="${link.icon}"></i> ${link.text}
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}
