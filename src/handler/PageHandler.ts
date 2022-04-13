export default class PageHandler {
  $Page: HTMLDivElement;
  $Nav: HTMLDivElement;
  constructor($target: HTMLDivElement) {
    this.$Page = $target.querySelector(".main-section")!;
    this.$Nav = $target.querySelector(".page-nav-tab")!;
  }
}
