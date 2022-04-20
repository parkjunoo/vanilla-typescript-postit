import DateItam from "./components/DateItem";
import Month from "./components/MonthItem";
import { getStorage } from "../../helpers";
import dayjs from "dayjs";
import { STORAGE_KEYS } from "../../common/constant";

export default class CalenderModal {
  $CalenderModal: HTMLDivElement;
  $CalenderModalDimmed: HTMLDivElement;
  $CalenderCloseButton: HTMLDivElement;
  monthEndDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  state: any = {
    postitList: [],
    monthList: [],
  };
  constructor() {
    this.$CalenderModal = document.querySelector(".calender-modal")!;
    this.$CalenderModalDimmed = document.querySelector(".calender-dimmed")!;
    this.$CalenderCloseButton = this.$CalenderModal.querySelector(
      ".modal-close-button"
    )!;
    this.$CalenderModalDimmed.addEventListener("click", this.hide);
    this.$CalenderCloseButton.addEventListener("click", this.hide);
  }
  show = async () => {
    await this.fetchData();
    this.$CalenderModal.style.display = "";
    this.$CalenderModalDimmed.style.display = "";
  };
  hide = () => {
    this.$CalenderModal.style.display = "none";
    this.$CalenderModalDimmed.style.display = "none";
  };

  fetchData = () => {
    const pageList = getStorage(STORAGE_KEYS.PAGE_LIST);
    pageList.forEach((e: any) => {
      const postit = getStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${e.id}`);
      postit.forEach((e: any) => {
        const { state } = e;
        this.state.postitList.push(state);
      });
    });

    this.state.postitList.sort(
      (a: any, b: any) => a.created_date - b.created_date
    );

    this.monthEndDay.forEach((e) => {
      
    });

    this.render();
  };

  render = () => {};

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
    if (month === 2) {
    }
  };
}
