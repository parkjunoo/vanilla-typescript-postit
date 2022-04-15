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
  addNewPage: () => void;
}
export default class Nav {
  $Nav: HTMLDivElement;
  state: initState;
  props: props;
  constructor($el: HTMLDivElement, initState: initState, props: props) {
    this.$Nav = $el;
    this.state = initState;
    this.props = props;
    this.setState(initState);
    console.log(this.props);
  }

  setState(newState: initState) {
    this.state = newState;
    this.render();
  }

  render(): void {
    const { pageList } = this.state;
    this.$Nav.innerHTML = `
    ${pageList!
      .map((e, idx) => {
        return `<div class='tab'>
        ${e.page_name}
        <div class="tab-delete-button" id="${e.id}">🗑</div>
        </div>`;
      })
      .join("")}
    `;

    const $tabs = this.$Nav.querySelectorAll<HTMLDivElement>(".tab");
    $tabs.forEach((e) => {
      e.addEventListener("click", this.props.addNewPage);
      // const $delete_button = e.childNodes[1] as HTMLDivElement;
      // e.parentElement!.addEventListener("click", () => this.clickPage(e));
    });
  }
}
