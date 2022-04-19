import Nav from "./components/Nav";
import Page from "./components/Page";
import Postit from "./components/PostIt";
import ProgressBar from "./components/ProgressBar";
import { STORAGE_KEYS } from "./common/constant";
import { setStorage, getStorage, removeStorage } from "./helpers";

interface PageListItem {
  id: number;
  page_name: string;
  totalCount: number;
  todoCount: number;
  ingCount: number;
  doneCount: number;
}
interface initState {
  pageList: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
  maxPageId?: number;
  postitList?: Postit[];
}

export default class App {
  $App: HTMLElement;
  state: initState;
  HeaderComponent;
  NavComponent;
  BodyComponent;
  ProgressBarComponent;

  constructor($el: HTMLElement, initState: initState) {
    this.$App = $el;
    this.state = initState;
    this.HeaderComponent = this.$App.querySelector(".postit-header");
    this.ProgressBarComponent = new ProgressBar(
      this.$App.querySelector(".postit-progress-bar")!,
      this.state
    );
    this.NavComponent = new Nav(
      this.$App.querySelector<HTMLDivElement>(".postit-page-nav")!,
      this.state,
      {
        addNewPage: this.addNewPage,
        deletePage: this.deletePage,
        clickPageTab: this.clickPageTab,
      }
    );
    this.BodyComponent = new Page(
      this.$App.querySelector(".postit-body-page")!,
      this.state,
      {
        updateProcess: this.ProgressBarComponent.setState,
      }
    );
  }

  //? -------------------------nav----------------------------- ?//

  addNewPage = () => {
    let { pageList, maxPageId } = this.state;
    const newIndex = (() => {
      this.state = {
        ...this.state,
        maxPageId: maxPageId! + 1,
      };
      return this.state.maxPageId!;
    })();
    pageList!.push({
      id: newIndex,
      page_name: `untitled_${newIndex}`,
      totalCount: 0,
      todoCount: 0,
      ingCount: 0,
      doneCount: 0,
    });
    this.state.selectedPageId = this.state.maxPageId!;
    setStorage(STORAGE_KEYS.PAGE_LIST, pageList!);
    this.NavComponent.setState(this.state);
    this.BodyComponent.setState(this.state);
  };

  deletePage = (id: number) => {
    let { pageList, selectedPageId } = this.state;
    const findIndex = pageList!.findIndex((e) => {
      return e.id === id;
    });
    if (selectedPageId === id) {
      if (pageList.length === 1) {
        alert("마지막 페이지는 삭제할 수 없습니다.");
        return;
      }
      this.state.selectedPageId = pageList[findIndex - 1].id;
    }

    const [target] = pageList!.splice(findIndex, 1);
    setStorage(STORAGE_KEYS.PAGE_LIST, pageList!);
    removeStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${target.id}`);

    this.NavComponent.setState(this.state);
    this.BodyComponent.setState(this.state);
  };

  clickPageTab = (tab_id: number) => {
    const newState = {
      ...this.state,
      selectedPageId: tab_id,
    };
    this.state.selectedPageId = tab_id;
    this.NavComponent.setState(newState);
    this.BodyComponent.setState(newState);
  };

  //? ----------------------------page------------------------- ?//
}
