export function handleMouseDown(event) {
  event.preventDefault();

  const balls = document.querySelectorAll(".ball");
  const el = event.target;
  const classList = el.classList;
  console.log("!!!!", balls, el, classList);

  if (!classList.contains("hold")) {
    // 공을 클릭했을 때, 마우스 커서의 XY좌표
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 선택한 공의 XY좌표 (왼쪽 상단 모서리 기준)
    const ballPos = el.getBoundingClientRect();
    const ballX = ballPos.x;
    const ballY = ballPos.y;

    // 선택한 공 안에 있는 마우스 커서의 XY좌표
    const gapX = mouseX - ballX;
    const gapY = mouseY - ballY;

    el.setAttribute("gap-x", gapX);
    el.setAttribute("gap-y", gapY);

    // 선택한 공을 맨 앞으로 가지고 오기
    const maxPriority =
      (balls.length > 0
        ? Math.max.apply(
            null,
            Array.from(balls).map((ball) => ball.getAttribute("priority"))
          )
        : 9999) + 1;
    el.setAttribute("priority", maxPriority);
    el.style["z-index"] = maxPriority;

    // 선택한 공에 'hold' class를 추가
    classList.add("hold");
  }
}
