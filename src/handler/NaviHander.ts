import { setStorage, getStorage } from "../helpers";


interface PageInfo {
  page_id: number;
  page_name: string;
  total_count: number;
  todo_count: number;
  ing_count: number;
  complete_count: number;
}

export default class NavHandler {
  $Nav: HTMLDivElement;
  $NavPages: HTMLDivElement;
  $NavAddButton: HTMLDivElement;
  navList: PageInfo[] = [];
  last_page_id: number = 0;

  constructor($target: HTMLDivElement) {
    this.$Nav = $target;
    this.$NavPages = this.$Nav.querySelector(".page-nav-tab")!;
    this.$NavAddButton = this.$Nav.querySelector(".add-tab-button")!;
    this.addNewPage = this.addNewPage.bind(this);
    this.drowNav = this.drowNav.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.initNav();
  }

  initNav() {
    this.fetchData();
    this.$NavAddButton.addEventListener("click", this.addNewPage);
    this.drowNav();
  }

  fetchData() {
    const pageData = getStorage("page_list");
    if (pageData) {
      this.navList = pageData;
      this.last_page_id = this.navList[this.navList.length - 1].page_id;
    }
  }

  addNewPage() {
    this.navList.push({
      page_id: this.last_page_id + 1,
      page_name: "untitled",
      total_count: 0,
      todo_count: 0,
      ing_count: 0,
      complete_count: 0,
    });
    setStorage("page_list", this.navList);
    this.drowNav();
  }

  deletePage(e: MouseEvent): void {
    const { id } = e.target as HTMLElement;
    const findIndex = this.navList.findIndex((e) => {
      return String(e.page_id) === id;
    });
    this.navList.splice(findIndex, 1);
    setStorage("page_list", this.navList);
    this.drowNav();
  }

  drowNav(): void {
    this.$NavPages.innerHTML = `
    ${this.navList
      .map((e, idx) => {
        return `<div class='tab'>
        ${e.page_name}
        <div class="tab-delete-button" id="${e.page_id}">🗑</div>
        </div>`;
      })
      .join("")}
    `;

    const $tabs =
      this.$NavPages.querySelectorAll<HTMLDivElement>(".tab-delete-button");
    $tabs.forEach((e) => e.addEventListener("click", this.deletePage));
  }
}
