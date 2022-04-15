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
