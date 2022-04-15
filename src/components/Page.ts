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
interface props {
  addNewPage?: () => void;
  deletePage?: (id: number) => void;
}
export default class Page {
  $Page: HTMLDivElement;
  state: initState;
  props: props;

  constructor($el: HTMLDivElement, initState: initState, props: props) {
    this.$Page = $el;
    this.state = initState;
    this.props = props;
    this.setState(initState);
  }

  setState(newState: initState) {
    this.state = newState;
    this.render();
  }

  render(): void {}
}
