import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "./handler/movePostitHandler";

const postitList = document.querySelectorAll(".postit");
const postitStk = document.querySelector(".postit-stk");

postitStk?.addEventListener("dragstart", onDragStart);
postitStk?.addEventListener("dragend", onDragEnd);
postitStk?.addEventListener("drag", onDrag);

postitList.forEach(function (postit: any, idx) {
  let priority: any = postit.getAttribute("priority");
  if (!priority) {
    priority = idx + 1;
    postit.setAttribute("priority", priority);
  }
  postit.style["z-index"] = priority;

  postit.addEventListener("mousedown", handleMouseDown);
});

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);

function onDragStart(event: any) {
  console.log("drag start");
}

function onDragEnd(event: any) {
  console.log("drag end");
}

function onDrag(event: any) {
  console.log("on dragging");
}
