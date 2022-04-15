import Nav from "./components/Nav";
import { STORAGE_KEYS } from "./common/constant";
import { setStorage, getStorage } from "./helpers";

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
export default class App {
  $App: HTMLElement;
  state: initState;
  HeaderComponent;
  NavComponent;
  BodyComponent;

  constructor($el: HTMLElement, initState: initState) {
    this.$App = $el;
    this.state = initState;
    this.NavComponent = new Nav(
      this.$App.querySelector<HTMLDivElement>(".postit-page-nav")!,
      this.state,
      {
        addNewPage: this.addNewPage,
        deletePage: this.deletePage,
      }
    );
    this.HeaderComponent = this.$App.querySelector(".postit-header");
    this.BodyComponent = this.$App.querySelector(".postit-body-page");
  }

  addNewPage = () => {
    let { pageList, maxPageId } = this.state;
    pageList!.push({
      id: (() => {
        this.state = {
          ...this.state,
          maxPageId: maxPageId! + 1,
        };
        return this.state.maxPageId!;
      })(),
      page_name: "untitled",
      total_count: 0,
      todo_count: 0,
      ing_count: 0,
      complete_count: 0,
    });
    setStorage(STORAGE_KEYS.PAGE_LIST, pageList!);
    this.NavComponent.setState(this.state);
  };

  deletePage = (id: number) => {
    let { pageList } = this.state;
    const findIndex = pageList!.findIndex((e) => {
      return e.id === id;
    });
    pageList!.splice(findIndex, 1);
    setStorage(STORAGE_KEYS.PAGE_LIST, pageList!);
    this.NavComponent.setState(this.state);
  };
}
