// import PostItHandler from "./handler/PostItHandler";
// import PageHandler from "./handler/PageHandler";
// import NavHandler from "./handler/NaviHander";
import App from "./app";
import { setStorage, getStorage } from "./helpers";
import { STORAGE_KEYS } from "./common/constant";

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

localStorage.setItem("postit_page_1", JSON.stringify(postit_list));
interface PageListItem {
  id: number;
  page_name: string;
  total_count: number;
  todo_count: number;
  ing_count: number;
  complete_count: number;
}
interface initState {
  //   [key: string]: number | string | object | [];
  pageList?: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
  maxPageId?: number;
}

const $App: HTMLElement = document.querySelector(".app")!;
const initState: initState = {};

(function fetchInitData() {
  let pageList = getStorage(STORAGE_KEYS.PAGE_LIST);
  if (!pageList) {
    pageList = [
      {
        id: 1,
        page_name: "untitled",
        total_count: 0,
        todo_count: 0,
        ing_count: 0,
        complete_count: 0,
      },
    ];
    setStorage(STORAGE_KEYS.PAGE_LIST, pageList);
  }
  initState["pageList"] = pageList;
  initState["lastPageId"] = pageList[pageList.length - 1].id;
  initState["selectedPageId"] = pageList[pageList.length - 1].id;
  initState["maxPageId"] = Math.max.apply(
    Math,
    pageList.map(function (page: PageListItem) {
      return page.id;
    })
  );
})();
new App($App, initState);

// import {
//   handleMouseDown,
//   handleMouseMove,
//   handleMouseUp,
// } from "./handler/movePostitHandler";
// //*-----------------------------------------------------------------*//
// //? test 데이터 init
// // todo, ing, complete
// // const pageList = [
// //   {
// //     page_id: 1,
// //     page_name: "개발공부",
// //     total_count: 3,
// //     todo_count: 1,
// //     ing_count: 1,
// //     complete_count: 1,
// //   },
// //   {
// //     page_id: 2,
// //     page_name: "블로그 쓰기",
// //     total_count: 3,
// //     todo_count: 1,
// //     ing_count: 1,
// //     complete_count: 1,
// //   },
// // ];

// localStorage.setItem("postit_page_2", JSON.stringify(postit_page_1));
// //*-----------------------------------------------------------------*//

// const $App: HTMLDivElement = document.querySelector(".app")!;
// const AppComponent = new App({
//   el: $App
// });

// const $postitStk: HTMLDivElement = document.querySelector(".postit-stk")!;
// const $nav: HTMLDivElement = document.querySelector(".postit-page-nav")!;
// const pageHandler = new PageHandler($appPage);
// const postItHandler = new PostItHandler($postitStk);
// const navHandler = new NavHandler($nav);

// const app = document.querySelector(".main-section");

// $postitStk?.addEventListener("drop", onDragDrop);
// $postitStk?.addEventListener("dragend", onDragEnd);
// app?.addEventListener("dragover", onDrag);
// function drowPostit() {
//   const postitList = document.querySelectorAll(".postit");
//   console.log(postitList, "!!!");
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
