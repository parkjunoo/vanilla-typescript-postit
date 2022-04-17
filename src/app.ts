import Nav from "./components/Nav";
import Page from "./components/Page";
import Postit from "./components/PostIt";
import { STORAGE_KEYS } from "./common/constant";
import { setStorage, getStorage, removeStorage } from "./helpers";

interface PageListItem {
  id: number;
  page_name: string;
  total_count: number;
  todo_count: number;
  ing_count: number;
  complete_count: number;
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

  constructor($el: HTMLElement, initState: initState) {
    this.$App = $el;
    this.state = initState;
    this.HeaderComponent = this.$App.querySelector(".postit-header");
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
      {}
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
      total_count: 0,
      todo_count: 0,
      ing_count: 0,
      complete_count: 0,
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
