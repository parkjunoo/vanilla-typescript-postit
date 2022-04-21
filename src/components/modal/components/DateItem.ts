import dayjs from "dayjs";
import Constant from "../../../common/constant";

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
export default class DateItam {
  date: string;
  $dailyElement;
  postitList: any;
  constructor(date: string, dailyWidth: string, postitList: any) {
    this.date = date;
    this.$dailyElement = document.createElement("li")!;
    this.$dailyElement.classList.add("date-wrapper");
    this.$dailyElement.style!.width = dailyWidth + "%";
    this.postitList = JSON.parse(JSON.stringify(postitList));
  }

  checkSchedule = (postit: PostItState) => {
    const today = dayjs().format("YYYY-MM-DD");
    const startDiff = dayjs(postit.created_date).diff(this.date, "day");
    const doneDiff = dayjs(postit.done_date).diff(this.date, "day");
    const todayDiff = dayjs(this.date).diff(today, "day");

    if (startDiff <= 0) {
      if (todayDiff >= 0) {
        return false;
      }
      if (!isNaN(doneDiff) && doneDiff <= 0) {
        if (doneDiff === 0) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  };

  setColor = (postit: PostItState) => {
    const [year, month, day] = this.date.split("-");

    let color = "#fff6c1";
    const startDiff = dayjs(postit.created_date).diff(
      `${year}-${month}-${day}`,
      "day"
    );
    const doingDiff = dayjs(postit.doing_date).diff(
      `${year}-${month}-${day}`,
      "day"
    );
    const doneDiff = dayjs(postit.done_date).diff(
      `${year}-${month}-${day}`,
      "day"
    );
    if (startDiff <= 0) {
      color = "#fff6c1";
    }
    if (!isNaN(doingDiff) && doingDiff <= 0) {
      color = "#0152cc";
    }
    if (!isNaN(doneDiff) && doneDiff <= 0) {
      color = "#34b37e";
    }

    return color;
  };

  getDailyElement = () => {
    this.$dailyElement.innerHTML = `
      <div class="date">${this.date.split("-")[2]}</div>
      ${this.postitList
        .map((e: any) => {
          const processState = this.checkSchedule(e);
          const statusColor = processState ? this.setColor(e) : "#fff";
          return `
          <div class="date-contents" style="background-color: ${
            processState ? "#d0cfcf" : "#fff"
          };">
            <div class="daily-state" style="border-bottom: 3px solid ${statusColor};"></div>
          </div>`;
        })
        .join("")
        .trim()}
    `;
    return this.$dailyElement;
  };
}
