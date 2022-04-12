export function handleMouseDown(e: MouseEvent & HTMLInputElement) {
  const el = e.target as HTMLElement;
  const postitList = document.querySelectorAll(".postit");
  const classList = el.parentElement!.classList;

  if (!classList.contains("hold")) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const postitPos = el.getBoundingClientRect();
    const postitX = postitPos.x;
    const postitY = postitPos.y;

    const gapX = mouseX - postitX;
    const gapY = mouseY - postitY;

    el.setAttribute("gap-x", String(gapX));
    el.setAttribute("gap-y", String(gapY));

    const maxPriority = String(
      (postitList.length > 0
        ? Math.max.apply(
            null,
            Array.from(postitList).map((postit) =>
              Number(postit.getAttribute("priority"))
            )
          )
        : 9999) + 1
    );
    el.setAttribute("priority", maxPriority);
    el.style.zIndex = maxPriority;

    classList.add("hold");
  }
}

export function handleMouseMove(e: MouseEvent) {
  e.preventDefault();
  const el: HTMLDivElement | null = document.querySelector(".postit.hold");
  if (el) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const gapX = el.getAttribute("gap-x");
    const gapY = el.getAttribute("gap-y");

    const postitX = mouseX - Number(gapX);
    const postitY = mouseY - Number(gapY);

    el.style.left = postitX + "px";
    el.style.top = postitY + "px";
  }
}

export function handleMouseUp(e: MouseEvent) {
  e.preventDefault();
  const el: HTMLDivElement | null = document.querySelector(".postit.hold");
  if (el) {
    el.removeAttribute("gap-x");
    el.removeAttribute("gap-y");

    el.classList.remove("hold");
  }
}
