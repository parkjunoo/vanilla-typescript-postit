import App from "./app";
import { setStorage, getStorage } from "./helpers";
import { STORAGE_KEYS } from "./common/constant";

if (!getStorage(STORAGE_KEYS.PAGE_LIST)) {
  setStorage(STORAGE_KEYS.PAGE_LIST, [
    {
      id: 1,
      pageName: "포스트잇 개발",
      totalCount: 1,
      doingCount: 0,
      doneCount: 0,
    },
  ]);
  setStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${1}`, [
    {
      state: {
        postit_id: 10,
        contents: "\n메인페이지 개발\n- 네비\n- 메인\n- 모달",
        status: "done",
        pos_X: 909,
        pos_Y: 126,
        created_date: "2022-03-10 21:36",
        doing_date: "2022-03-11 21:37",
        done_date: "2022-03-18 21:43",
      },
    },
    {
      state: {
        postit_id: 11,
        contents:
          "\n프로세스바 개발\n- 포스트잇 삭제\n- 포스트잇 수정\n- 포스트잇 추가",
        status: "done",
        pos_X: 1022,
        pos_Y: 311,
        created_date: "2022-03-12 21:36",
        doing_date: "2022-04-01 21:37",
        done_date: "2022-04-10 21:43",
      },
    },
    {
      state: {
        postit_id: 12,
        contents: "\n캘린더 개발\n- Fetch데이터\n- 가로로 그리기",
        status: "done",
        pos_X: 975,
        pos_Y: 200,
        created_date: "2022-04-20 21:37",
        doing_date: "2022-04-20 21:37",
        done_date: "2022-04-20 21:43",
      },
    },
    {
      state: {
        postit_id: 15,
        contents:
          "\n애니메이션 개선\n\n- 포스트잇 상태 변경 \n배경변경 애니메이션\n- 코드 리팩토링",
        status: "todo",
        pos_X: 298,
        pos_Y: 144,
        created_date: "2022-03-20 21:37",
        doing_date: null,
        done_date: null,
      },
    },
    {
      state: {
        postit_id: 16,
        contents: "\n타입스크립트 공부하기",
        status: "doing",
        pos_X: 577,
        pos_Y: 141,
        created_date: "2022-03-20 21:37",
        doing_date: "2022-04-01 21:43",
        done_date: null,
      },
    },
    {
      state: {
        postit_id: 18,
        contents: "리엑트 & Nextjs\n공부하기",
        status: "doing",
        pos_X: 671,
        pos_Y: 328,
        created_date: "2022-04-10 21:37",
        doing_date: "2022-04-20 21:43",
        done_date: null,
      },
    },
    {
      state: {
        postit_id: 20,
        contents:
          "\n디자인 & 기능 개선\n\n- 앱 전반적인 디자인\n- 포스트잇 토글 디자인\n- 추가 기능들?",
        status: "todo",
        pos_X: 335,
        pos_Y: 272,
        created_date: "2022-04-20 21:38",
        doing_date: null,
        done_date: null,
      },
    },
  ]);
}

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
