import Month from "./components/MonthItem";
import { getStorage } from "../../helpers";
import dayjs from "dayjs";
import { STORAGE_KEYS } from "../../common/constant";
import { CalenderState, PostItState } from "../../interfaces/state";

interface CalenderModalProps {
  clickPageTab: (pageId: number) => void;
  modalHide?: () => void;
}
export default class CalenderModal {
  $CalenderModal: HTMLDivElement;
  $CalenderModalDimmed: HTMLDivElement;
  $CalenderCloseButton: HTMLDivElement;
  $ScheduleWrapper: HTMLUListElement;
  $CalenderYearSelector: HTMLSelectElement;
  $CalenderMonthSelector: HTMLSelectElement;

  state: CalenderState = {
    postitList: [],
    minDateTime: "",
    maxDateTime: dayjs().format("YYYY-MM"),
    monthList: [],
    dateOptions: {},
    toDay: dayjs().format("YYYY-MM"),
    selectedYear: "",
    selectedMonth: "",
    dontMoveScroll: "",
  };
  props: CalenderModalProps;

  constructor(props: CalenderModalProps) {
    this.props = {
      ...props,
      modalHide: this.hide,
    };
    this.$CalenderModal = document.querySelector(".calender-modal")!;
    this.$CalenderModalDimmed = document.querySelector(".calender-dimmed")!;
    this.$CalenderCloseButton = this.$CalenderModal.querySelector(
      ".modal-close-button"
    )!;
    this.$ScheduleWrapper = document.querySelector(".schedule-wrapper")!;
    this.$CalenderModalDimmed.addEventListener("click", this.hide);
    this.$CalenderCloseButton.addEventListener("click", this.hide);

    this.$CalenderMonthSelector = document.querySelector(".month-selector")!;
    this.$CalenderYearSelector = document.querySelector(".year-selector")!;

    this.state.selectedYear = this.state.toDay.split("-")[0];
    this.state.selectedMonth = this.state.toDay.split("-")[1];

    this.$CalenderYearSelector.value = this.state.selectedYear;
    this.$CalenderMonthSelector.value = this.state.selectedMonth;

    this.$CalenderYearSelector.addEventListener("change", () => {
      this.setYear(this.$CalenderYearSelector.value);
    });

    this.$CalenderMonthSelector.addEventListener("change", () => {
      this.setMonth(this.$CalenderMonthSelector.value);
    });
    this.hide();
  }
  show = async () => {
    this.fetchData();
    this.$CalenderModal.style.display = "";
    this.$CalenderModalDimmed.style.display = "";
  };
  hide = () => {
    this.$CalenderModal.style.display = "none";
    this.$CalenderModalDimmed.style.display = "none";
  };

  fetchData = () => {
    this.state = {
      ...this.state,
      postitList: [],
      minDateTime: "",
      maxDateTime: dayjs().format("YYYY-MM"),
      monthList: [],
      dateOptions: {},
      selectedYear: this.state.toDay.split("-")[0],
      selectedMonth: this.state.toDay.split("-")[1],
      toDay: dayjs().format("YYYY-MM"),
    };

    const { postitList } = this.state;
    const pageList = getStorage(STORAGE_KEYS.PAGE_LIST);
    pageList.forEach((e: any) => {
      const postit = getStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${e.id}`);
      postit.forEach((e: any) => {
        const { state } = e;
        postitList.push(state);
      });
    });

    postitList.sort((a: PostItState, b: PostItState) => {
      const aYear = dayjs(a.created_date).year();
      const bYear = dayjs(b.created_date).year();
      if (aYear > bYear) return 1;
      if (aYear < bYear) return -1;
      const aMonth = dayjs(a.created_date).month();
      const bMonth = dayjs(b.created_date).month();
      if (aMonth > bMonth) return 1;
      if (aMonth < bMonth) return -1;
      const aDate = dayjs(a.created_date).date();
      const bDate = dayjs(b.created_date).date();
      if (aDate > bDate) {
        return 1;
      }
      return -1;
    });

    this.state.minDateTime = dayjs(postitList[0].created_date).format(
      "YYYY-MM"
    );

    this.fetchYearMonth();
    this.render();
  };

  render = () => {
    this.$ScheduleWrapper.innerHTML = "";
    const { monthList } = this.state;
    monthList.forEach((e: any, idx: number) => {
      this.$ScheduleWrapper.appendChild(e.getMonthWrapper());
    });

    const yearSelectOptions = Object.keys(this.state.dateOptions);
    this.$CalenderYearSelector.innerHTML = `
    ${yearSelectOptions
      .map((year) => {
        return `<option value="${year}">${year}</option>`;
      })
      .join("")}
    `;

    this.setYear(this.state.selectedYear);
  };

  setYear = (year: string) => {
    const monthSelectOptions = Object.keys(this.state.dateOptions[year]);
    this.$CalenderMonthSelector.innerHTML = `
    ${monthSelectOptions
      .map((month) => {
        const mon = Number(month) < 10 ? "0" + month : month;
        return `<option value="${mon}" ${
          this.state.selectedMonth === mon ? "selected" : ""
        } >${mon}</option>`;
      })
      .join("")}
    `;

    this.changePageMove(
      `${this.state.selectedYear}-${this.state.selectedMonth}`
    );
  };

  setMonth = (month: string) => {
    this.changePageMove(`${this.state.selectedYear}-${month}`);
  };

  changePageMove = (selected: string) => {
    const target = document.getElementById(selected)!;
    const month = selected.split("-")[1];
    if (month === this.state.dontMoveScroll) return;
    setTimeout((save) => {
      const { x: targetX } = target.getBoundingClientRect();
      const container = document.getElementsByClassName("modal-body")[0]!;
      container.scroll(targetX, 0);
    }, 200);
    this.state.dontMoveScroll = month;
  };

  fetchYearMonth = () => {
    const yearDiff = dayjs(this.state.maxDateTime).diff(
      this.state.minDateTime,
      "year"
    );
    const startYear = Number(dayjs(this.state.minDateTime).format("YYYY"));
    const startMonth = Number(dayjs(this.state.minDateTime).format("MM"));
    const endYear = Number(dayjs(this.state.maxDateTime).format("YYYY"));
    const endMonth = Number(dayjs(this.state.maxDateTime).format("MM"));

    for (let i = startYear; i <= startYear + yearDiff; i++) {
      const isYear = !!this.state.dateOptions[i];
      if (!isYear) {
        this.state.dateOptions[i] = {};
      }
      for (let j = i === startYear ? startMonth : 1; j <= 12; j++) {
        const isMonth = !!this.state.dateOptions[i][j];
        if (i === endYear && j === endMonth + 1) break;
        if (!isMonth) {
          this.state.dateOptions[i][j] = j;
          this.state.monthList.push(
            new Month(i, j, this.state.postitList, this.props)
          );
        }
      }
    }
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
}
