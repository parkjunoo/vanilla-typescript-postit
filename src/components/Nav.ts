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
export default class Nav {
  $Nav: HTMLDivElement;
  state: initState;
  constructor($el: HTMLDivElement, initState: initState) {
    this.$Nav = $el;
    this.state = initState;
    this.setPostits(initState);
  }

  setPostits(newState: initState) {
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
  }
}
