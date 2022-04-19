interface PageListItem {
  id: number;
  pageName: string;
  totalCount: number;
  doingCount: number;
  doneCount: number;
}
interface initState {
  //   [key: string]: number | string | object | [];
  pageList?: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
  selectedPageInfo?: PageListItem;
}
interface props {
  addNewPage: () => void;
  deletePage: (id: number) => void;
  clickPageTab: (id: number) => void;
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
        ${e.pageName}
        <div class="tab-delete-button" id="${e.id}">🗑</div>
        </div>`;
      })
      .join("")}
    `;

    const $tabs = this.$Nav.querySelectorAll<HTMLDivElement>(".tab");
    $tabs.forEach((e: HTMLDivElement) => {
      const $deleteButton = e.childNodes[1] as HTMLDivElement;
      $deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.props.deletePage(Number($deleteButton.id));
      });
      e.addEventListener("click", (e) => {
        e.stopPropagation();
        this.props.clickPageTab(Number($deleteButton.id));
      });
    });
  }
}
