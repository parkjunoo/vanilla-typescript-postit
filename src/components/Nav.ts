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
  deletePage: (id: number) => void;
}
export default class Nav {
  $Nav: HTMLDivElement;
  $NavAddButton: HTMLDivElement;
  $NavContainer: HTMLDivElement;
  state: initState;
  props: props;

  constructor($el: HTMLDivElement, initState: initState, props: props) {
    this.$Nav = $el;
    this.state = initState;
    this.props = props;

    this.$NavContainer = this.$Nav.querySelector(".page-nav-tab")!;
    this.$NavAddButton = this.$Nav.querySelector(".add-tab-button")!;
    this.$NavAddButton.addEventListener("click", this.props.addNewPage);
    this.setState(initState);
  }

  setState(newState: initState) {
    this.state = newState;
    this.render();
  }

  render(): void {
    const { pageList, selectedPageId } = this.state;
    this.$NavContainer.innerHTML = `
    ${pageList!
      .map((e, idx) => {
        return `<div class='tab ${selectedPageId === e.id ? "selected" : ""}'>
        ${e.page_name}
        <div class="tab-delete-button" id="${e.id}">🗑</div>
        </div>`;
      })
      .join("")}
    `;

    const $tabs = this.$Nav.querySelectorAll<HTMLDivElement>(".tab");
    $tabs.forEach((e) => {
      const $delete_button = e.childNodes[1] as HTMLDivElement;
      $delete_button.addEventListener("click", () =>
        this.props.deletePage(Number($delete_button.id))
      );
    });
  }
}
