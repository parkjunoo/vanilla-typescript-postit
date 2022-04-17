import App from "./app";
import { setStorage, getStorage } from "./helpers";
import { STORAGE_KEYS } from "./common/constant";

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
  pageList: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
  maxPageId?: number;
}

const $App: HTMLElement = document.querySelector(".app")!;
const initState: initState = {
  pageList: [],
};

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
