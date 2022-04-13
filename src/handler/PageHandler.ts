export default class PageHandler {
  $Page: HTMLDivElement;
  pageList: string[] = [];

  constructor($target: HTMLDivElement) {
    this.$Page = $target.querySelector(".main-section")!;

    const pageList = localStorage.getItem("page_list");
    if (pageList) {
      this.pageList = JSON.parse(pageList);
    }
  }
}
