import PostItHandler from "./handler/PostItHandler";

const $postitStk: HTMLDivElement = document.querySelector(".postit-stk")!;
const postItHandler = new PostItHandler($postitStk);
// const app = document.querySelector(".main-section");

// postitStk?.addEventListener("drop", onDragDrop);
// postitStk?.addEventListener("dragend", onDragEnd);

// app?.addEventListener("dragover", onDrag);
// function drowPostit() {
//   const postitList = document.querySelectorAll(".postit");
//   postitList.forEach(function (postit: any, idx) {
//     let priority: any = postit.getAttribute("priority");
//     if (!priority) {
//       priority = idx + 1;
//       postit.setAttribute("priority", priority);
//     }
//     postit.style["z-index"] = priority;

//     postit.addEventListener("mousedown", handleMouseDown);
//   });
// }

// document.addEventListener("mouseup", handleMouseUp);

// function onDragDrop(event: any) {}

// function onDragEnd(e: any) {
//   console.log("!!!!!!!!!!!!!!!!!!", e);
//   const newPostit = document.createElement("div");
//   newPostit.classList.add("postit");
//   newPostit.innerHTML = `
//   <div class="postit-top-area" ></div>
//   <div
//   class="postit-contents-area"
//   >안녕하세요</div>
//   `;
//   app?.appendChild(newPostit);
//   const mouseX = e.clientX;
//   const mouseY = e.clientY;

//   newPostit.style.left = mouseX + "px";
//   newPostit.style.top = mouseY + "px";
//   drowPostit();
// }

// function onDrag(e: any) {
//   console.log(e.target);
// }
// drowPostit();
