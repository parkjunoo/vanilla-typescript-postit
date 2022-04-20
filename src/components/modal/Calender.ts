export default class CalenderModal {
  $CalenderModal: HTMLDivElement;
  $CalenderModalDimmed: HTMLDivElement;
  $CalenderCloseButton: HTMLDivElement;
  constructor() {
    this.$CalenderModal = document.querySelector(".calender-modal")!;
    this.$CalenderModalDimmed = document.querySelector(".calender-dimmed")!;
    this.$CalenderCloseButton = this.$CalenderModal.querySelector(
      ".modal-close-button"
    )!;
    this.$CalenderModal.style.display = "none";
    this.$CalenderModalDimmed.style.display = "none";
    console.log("!!!", this.$CalenderCloseButton);
    this.$CalenderModalDimmed.addEventListener("click", this.hide);
    this.$CalenderCloseButton.addEventListener("click", this.hide);
  }
  show = () => {
    this.$CalenderModal.style.display = "";
    this.$CalenderModalDimmed.style.display = "";
  };
  hide = () => {
    this.$CalenderModal.style.display = "none";
    this.$CalenderModalDimmed.style.display = "none";
  };
}
