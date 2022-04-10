import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  createNewPostit,
} from "./handler/eventHandler.js";

const postitList = document.querySelectorAll(".postit");
const postitStk = document.querySelector(".postit-stk");
console.log(postitStk);

postitStk?.addEventListener("mousedown", createNewPostit);

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
