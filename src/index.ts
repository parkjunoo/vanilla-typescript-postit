import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "./handler/eventHandler.js";

const balls = document.querySelectorAll(".ball");

balls.forEach(function (ball: any, idx) {
  // 공의 우선순위 설정
  let priority: any = ball.getAttribute("priority");
  if (!priority) {
    priority = idx + 1;
    ball.setAttribute("priority", priority);
  }
  ball.style["z-index"] = priority;

  // 공 선택 이벤트 바인딩
  ball.addEventListener("mousedown", handleMouseDown);
});

// 마우스 이벤트 바인딩
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
