import PostItHandler from "./handler/PostItHandler";
import PageHandler from "./handler/PageHandler";
import NavHandler from "./handler/NaviHander";

//*-----------------------------------------------------------------*//
//? test 데이터 init
// todo, ing, complete
const pageList = [
  {
    page_id: 1,
    page_name: "개발공부",
    total_count: 3,
    todo_count: 1,
    ing_count: 1,
    complete_count: 1,
  },
  {
    page_id: 2,
    page_name: "블로그 쓰기",
    total_count: 3,
    todo_count: 1,
    ing_count: 1,
    complete_count: 1,
  },
];
const postit_list = [
  {
    postit_id: 1,
    contents: "안녕하세요 포스트1111이에요.",
    status: "ing",
    pos_X: 100,
    pos_Y: 200,
  },
  {
    postit_id: 2,
    contents: "안녕하세요 포스트2222이에요.",
    status: "todo",
    pos_X: 300,
    pos_Y: 200,
  },
  {
    postit_id: 3,
    contents: "안녕하세요 포스트3333이에요.",
    status: "complete",
    pos_X: 500,
    pos_Y: 200,
  },
];
const postit_page_1 = {
  page_id: 1,
  page_name: "개발공부",
  postit_list: postit_list,
  total_count: 3,
  todo_count: 1,
  ing_count: 1,
  complete_count: 1,
} as const;
const postit_page_2 = {
  page_id: 2,
  page_name: "블로그 쓰기",
  postit_list: postit_list,
  total_count: 3,
  todo_count: 1,
  ing_count: 1,
  complete_count: 1,
};
localStorage.setItem("page_list", JSON.stringify(pageList));
localStorage.setItem("postit_page_1", JSON.stringify(postit_page_1));
localStorage.setItem("postit_page_2", JSON.stringify(postit_page_1));
//*-----------------------------------------------------------------*//

const $appPage: HTMLDivElement = document.querySelector(".app")!;
const $postitStk: HTMLDivElement = document.querySelector(".postit-stk")!;
const $nav: HTMLDivElement = document.querySelector(".page-nav")!;
const pageHandler = new PageHandler($appPage);
const postItHandler = new PostItHandler($postitStk);
const navHandler = new NavHandler($nav);

// const app = document.querySelector(".main-section");

// $postitStk?.addEventListener("drop", onDragDrop);
// $postitStk?.addEventListener("dragend", onDragEnd);

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
