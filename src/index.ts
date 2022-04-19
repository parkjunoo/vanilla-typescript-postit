import App from "./app";
import { setStorage, getStorage } from "./helpers";
import { STORAGE_KEYS } from "./common/constant";

interface PageListItem {
  id: number;
  pageName: string;
  totalCount: number;
  doingCount: number;
  doneCount: number;
}
interface initState {
  //   [key: string]: number | string | object | [];
  pageList: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
  selectedPageInfo?: PageListItem;
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
        pageName: "untitled",
        totalCount: 0,
        doingCount: 0,
        doneCount: 0,
      },
    ];
    setStorage(STORAGE_KEYS.PAGE_LIST, pageList);
  }
  initState["pageList"] = pageList;
  initState["lastPageId"] = pageList[pageList.length - 1].id;
  initState["selectedPageId"] = pageList[pageList.length - 1].id;
  initState["selectedPageInfo"] = pageList[pageList.length - 1];
  initState["maxPageId"] = Math.max.apply(
    Math,
    pageList.map(function (page: PageListItem) {
      return page.id;
    })
  );
})();
new App($App, initState);
