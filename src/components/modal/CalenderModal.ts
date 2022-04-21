import Month from "./components/MonthItem";
import { getStorage } from "../../helpers";
import dayjs from "dayjs";
import { STORAGE_KEYS } from "../../common/constant";
interface PostItState {
  postit_id: number;
  contents?: string;
  status: string | number;
  pos_X: number;
  pos_Y: number;
  created_date: string | null;
  doing_date?: string | null;
  done_date?: string | null;
}
interface CalenderState {
  postitList: PostItState[];
  minDateTime: string;
  maxDateTime: string;
  monthList: any;
  dateOptions: { [x: string]: { [x: string]: any } };
}
export default class CalenderModal {
  $CalenderModal: HTMLDivElement;
  $CalenderModalDimmed: HTMLDivElement;
  $CalenderCloseButton: HTMLDivElement;
  $ScheduleWrapper: HTMLUListElement;

  state: CalenderState = {
    postitList: [],
    minDateTime: "",
    maxDateTime: dayjs().format("YYYY-MM"),
    monthList: [],
    dateOptions: {},
  };

  constructor() {
    this.$CalenderModal = document.querySelector(".calender-modal")!;
    this.$CalenderModalDimmed = document.querySelector(".calender-dimmed")!;
    this.$CalenderCloseButton = this.$CalenderModal.querySelector(
      ".modal-close-button"
    )!;
    this.$ScheduleWrapper = document.querySelector(".schedule-wrapper")!;
    this.$CalenderModalDimmed.addEventListener("click", this.hide);
    this.$CalenderCloseButton.addEventListener("click", this.hide);
    this.show();
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
          this.state.monthList.push(new Month(i, j, postitList));
        }
      }
    }

    this.render();
  };

  render = () => {
    const { monthList } = this.state;
    monthList.forEach((e: any, idx: number) => {
      console.log(e.getMonthWrapper());
      this.$ScheduleWrapper.appendChild(e.getMonthWrapper());
    });
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
    if (month === 2) {
    }
  };
}
