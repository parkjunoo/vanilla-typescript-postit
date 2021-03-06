import Nav from "./components/Nav";
import Page from "./components/Page";
import ProgressBar from "./components/ProgressBar";
import CalenderModal from "./components/modal/CalenderModal";
import { STORAGE_KEYS } from "./common/constant";
import { setStorage, getStorage, removeStorage } from "./helpers";
import { initState, Postit } from "./interfaces/state";

export default class App {
  $App: HTMLElement;
  $CalenderButton: HTMLElement;
  state: initState;
  HeaderComponent;
  NavComponent;
  BodyComponent;
  ProgressBarComponent;
  CalenderComponent;

  constructor($el: HTMLElement, initState: initState) {
    this.$App = $el;
    this.state = initState;
    this.HeaderComponent = this.$App.querySelector(".postit-header");
    this.$CalenderButton = this.$App.querySelector(".calender-button")!;
    this.NavComponent = new Nav(
      this.$App.querySelector<HTMLDivElement>(".postit-page-nav")!,
      this.state,
      {
        addNewPage: this.addNewPage,
        deletePage: this.deletePage,
        clickPageTab: this.clickPageTab,
        updateTab: this.updateTab,
      }
    );
    this.BodyComponent = new Page(
      this.$App.querySelector(".postit-body-page")!,
      this.state,
      {
        reRenderPage: this.setState,
      }
    );
    this.ProgressBarComponent = new ProgressBar(
      this.$App.querySelector(".postit-progress-bar")!,
      this.state
    );

    this.CalenderComponent = new CalenderModal({
      clickPageTab: this.clickPageTab,
    });
    this.$CalenderButton.addEventListener("click", (e) => {
      this.CalenderComponent.show();
    });
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
      pageName: `untitled_${newIndex}`,
      totalCount: 0,
      doingCount: 0,
      doneCount: 0,
    });
    const newTabInfo = this.state.pageList!.find(
      (e) => e.id === maxPageId! + 1
    );
    this.state.selectedPageId = this.state.maxPageId!;
    this.state.selectedPageInfo = newTabInfo;
    setStorage(STORAGE_KEYS.PAGE_LIST, pageList!);
    this.setState(this.state);
  };

  updateTab = (tab_id: number, newPageName: string) => {
    if (!newPageName) return;
    const newTabInfo = this.state.pageList!.find((e) => e.id === tab_id);
    newTabInfo!.pageName = newPageName;
    const newState = {
      ...this.state,
      selectedPageInfo: newTabInfo,
    };
    const postitList = getStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${tab_id}`);
    const updatePostit = postitList!.map((e: Postit) => {
      e.state.pageName = newPageName;
      e.state.pageId = tab_id;
      return e;
    });
    setStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${tab_id}`, updatePostit);
    setStorage(STORAGE_KEYS.PAGE_LIST, this.state.pageList!);
    this.setState(newState);
  };

  deletePage = (id: number) => {
    let { pageList, selectedPageId } = this.state;
    const findIndex = pageList!.findIndex((e) => {
      return e.id === id;
    });
    if (selectedPageId === id) {
      if (pageList!.length === 1) {
        alert("????????? ???????????? ????????? ??? ????????????.");
        return;
      }
      this.state.selectedPageId = pageList![findIndex - 1].id;
    }

    const [target] = pageList!.splice(findIndex, 1);
    setStorage(STORAGE_KEYS.PAGE_LIST, pageList!);
    removeStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${target.id}`);
    this.setState(this.state);
  };

  clickPageTab = (tab_id: number) => {
    const newState = {
      ...this.state,
      selectedPageId: tab_id,
      selectedPageInfo: this.state.pageList!.find((e) => e.id === tab_id),
    };
    this.setState(newState);
  };

  //? ----------------------------page------------------------- ?//

  setState = (newState: initState) => {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.NavComponent.setState(this.state);
    this.BodyComponent.setState(this.state);
    this.ProgressBarComponent.setState(this.state);
  };
}
