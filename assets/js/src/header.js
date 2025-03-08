import { select, selectAll } from "../utils.js";

export function header() {
  checkScrollForHeader();
  addEventListener("scroll", () => {
    checkScrollForHeader();
  });
  selectAll("[toggle-target]").forEach((element) => {
    element.addEventListener("click", () => {
      const targetId = element.getAttribute("toggle-target");
      const target = select(targetId);
      target.classList.toggle(target.getAttribute("toggle-style"));
    });
  });
}

function checkScrollForHeader() {
  if (window.scrollY > 50) {
    select("header").classList.add("active");
  } else {
    select("header").classList.remove("active");
  }
}
