export function createNewPostit(e) {
  console.log(e);
}

export function handleMouseDown(event) {
  event.preventDefault();

  const postitList = document.querySelectorAll(".postit");
  const el = event.target;
  const classList = el.classList;

  if (!classList.contains("hold")) {
    // 공을 클릭했을 때, 마우스 커서의 XY좌표
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 선택한 공의 XY좌표 (왼쪽 상단 모서리 기준)
    const postitPos = el.getBoundingClientRect();
    const postitX = postitPos.x;
    const postitY = postitPos.y;

    // 선택한 공 안에 있는 마우스 커서의 XY좌표
    const gapX = mouseX - postitX;
    const gapY = mouseY - postitY;

    el.setAttribute("gap-x", gapX);
    el.setAttribute("gap-y", gapY);

    // 선택한 공을 맨 앞으로 가지고 오기
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

    // 선택한 공에 'hold' class를 추가
    classList.add("hold");
  }
}

// 공 움직임 이벤트 핸들러
export function handleMouseMove(event) {
  event.preventDefault();

  const el = document.querySelector(".postit.hold");
  if (el) {
    // 움직이는 마우스 커서의 XY좌표
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 선택한 공 안에 있는 마우스 커서의 XY좌표
    const gapX = el.getAttribute("gap-x");
    const gapY = el.getAttribute("gap-y");

    // 마우스 커서의 위치에 따른 공의 XY좌표
    const postitX = mouseX - gapX;
    const postitY = mouseY - gapY;

    // 공의 위치를 변경
    el.style.left = postitX + "px";
    el.style.top = postitY + "px";
  }
}

// 공 놓기 이벤트 핸들러
export function handleMouseUp(event) {
  event.preventDefault();

  const el = document.querySelector(".postit.hold");
  if (el) {
    // 움직이면 적용된 속성 및 class를 삭제
    el.removeAttribute("gap-x");
    el.removeAttribute("gap-y");

    el.classList.remove("hold");
  }
}
