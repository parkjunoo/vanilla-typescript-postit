export function createNewPostit(e) {
  console.log(e);
}

export function handleMouseDown(event) {
  const postitList = document.querySelectorAll(".postit");
  const el = event.target.parentElement;
  const classList = el.classList;

  if (!classList.contains("hold")) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const postitPos = el.getBoundingClientRect();
    const postitX = postitPos.x;
    const postitY = postitPos.y;

    const gapX = mouseX - postitX;
    const gapY = mouseY - postitY;

    el.setAttribute("gap-x", gapX);
    el.setAttribute("gap-y", gapY);

    const maxPriority =
      (postitList.length > 0
        ? Math.max.apply(
            null,
            Array.from(postitList).map((postit) =>
              postit.getAttribute("priority")
            )
          )
        : 9999) + 1;
    el.setAttribute("priority", maxPriority);
    el.style["z-index"] = maxPriority;

    classList.add("hold");
  }
}

export function handleMouseMove(event) {
  event.preventDefault();

  const el = document.querySelector(".postit.hold");
  if (el) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const gapX = el.getAttribute("gap-x");
    const gapY = el.getAttribute("gap-y");

    const postitX = mouseX - gapX;
    const postitY = mouseY - gapY;

    el.style.left = postitX + "px";
    el.style.top = postitY + "px";
  }
}

export function handleMouseUp(event) {
  event.preventDefault();

  const el = document.querySelector(".postit.hold");
  if (el) {
    el.removeAttribute("gap-x");
    el.removeAttribute("gap-y");

    el.classList.remove("hold");
  }
}
