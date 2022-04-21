import Daily from "./DateItem";
import dayjs from "dayjs";

export default class Month {
  $monthWrapper: HTMLLIElement;
  $monthTitle: HTMLDivElement;
  $monthList: HTMLDivElement;
  month: number;
  year: number;
  isLeap: boolean;
  postitList: any;
  monthEndDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  dailyScheduleJob: any = [];
  scheduleList: any = [];
  constructor(year: number, month: number, postitList: any) {
    this.postitList = postitList;
    this.month = month;
    this.year = year;
    this.isLeap = this.checkLeapYear(year);
    this.$monthWrapper = document.createElement("li");
    this.$monthWrapper.classList.add("month-wrapper")!;
    this.$monthTitle = document.createElement("div")!;
    this.$monthTitle.classList.add("month-title");
    this.$monthTitle.innerText = `${year}년 ${month}월`;
    this.$monthList = document.createElement("div")!;
    this.$monthList.classList.add("month");
    this.changeYearMonth();
    this.render();
  }

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

  changeYearMonth = async () => {
    let monthLastDate = this.monthEndDay[this.month - 1];
    if (this.month === 2 && this.isLeap) {
      monthLastDate = 29;
    }
    const dailyWidth = (100 / monthLastDate).toFixed(2);
    for (let i = 1; i <= monthLastDate; i++) {
      const date = i < 10 ? "0" + i : i;
      this.postitList.forEach((postit: any, index: any) => {
        const startDiff = dayjs(postit.created_date).diff(
          `${this.year}-${this.month}-${date}`,
          "day"
        );
        const doneDiff = dayjs(postit.done_date).diff(
          `${this.year}-${this.month}-${date}`,
          "day"
        );

        if (startDiff <= 0) {
          if (!this.dailyScheduleJob.includes(postit)) {
            this.dailyScheduleJob.push(postit);
          }
          if (!isNaN(doneDiff) && doneDiff < 0) {
            this.dailyScheduleJob = this.dailyScheduleJob.filter(
              (e: any) => e.postit_id !== postit.postit_id
            );
          }
        }
      });
      this.scheduleList.push(new Daily(i, dailyWidth, this.dailyScheduleJob));
    }
  };

  render = () => {
    this.scheduleList.forEach((e: any) => {
      this.$monthList.appendChild(e.getDailyElement());
    });
  };

  getMonthWrapper = () => {
    this.$monthWrapper.appendChild(this.$monthTitle);
    this.$monthWrapper.appendChild(this.$monthList);
    return this.$monthWrapper;
  };
}
