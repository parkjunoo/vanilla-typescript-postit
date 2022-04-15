import Nav from "./components/Nav";
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
    this.HeaderComponent = new Nav(
      this.$App.querySelector<HTMLDivElement>(".postit-header")!,
      this.state
    );
    this.NavComponent = this.$App.querySelector(".postit-page-nav");
    this.BodyComponent = this.$App.querySelector(".postit-body-page");
  }

  render() {}
}
