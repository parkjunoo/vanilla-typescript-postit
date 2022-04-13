interface PostIt {}

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
  navList: PageInfo[];

  constructor($target: HTMLDivElement) {
    this.$Nav = $target;
    this.$NavPages = this.$Nav.querySelector(".page-nav-tab")!;
    this.$NavAddButton = this.$Nav.querySelector(".add-tab-button")!;
    this.navList = this.fetchData();
  }

  fetchData() {
    const pageData = localStorage.getItem("page_list");
    if (pageData) return JSON.parse(pageData);
    return [];
  }

  drowNav(pageList: string[]): void {
    pageList.forEach((e, idx) => {
      const newTab = document.createElement("div");
      newTab.classList.add("tab");
      this.$Nav.appendChild(newTab);
    });
  }
}
