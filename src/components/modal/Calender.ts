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

  checkLeapYear = (year: number) => {
    if (year % 400 === 0) {
      return true;
    } else if (year % 100 === 0) {
      return false;
    } else if (year % 4 === 0) {
      return true;
    }
    return false;
  };

  getFirstDayOfWeek = (year: number, month: number | string) => {
    if (month < 10) month = "0" + month;
    return new Date(year + "-" + month + "-01").getDay();
  };

  changeYearMonth = (year: number, month: number) => {
    let month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
    }
  };
}
