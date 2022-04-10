import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "./handler/eventHandler.js";

const postitList = document.querySelectorAll(".postit");

postitList.forEach(function (postit: any, idx) {
  // 공의 우선순위 설정
  let priority: any = postit.getAttribute("priority");
  if (!priority) {
    priority = idx + 1;
    postit.setAttribute("priority", priority);
  }
  postit.style["z-index"] = priority;

  // 공 선택 이벤트 바인딩
  postit.addEventListener("mousedown", handleMouseDown);
});

// 마우스 이벤트 바인딩
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
