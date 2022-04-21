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
    const [year, month, day] = this.date.split("-");
    const startDiff = dayjs(postit.created_date).diff(
      `${year}-${month}-${day}`,
      "day"
    );
    const doneDiff = dayjs(postit.done_date).diff(
      `${year}-${month}-${day}`,
      "day"
    );
    if (startDiff <= 0) {
      if (!isNaN(doneDiff) && doneDiff < 0) {
        return false;
      }
      return true;
    }
    return false;
  };

  getDailyElement = () => {
    this.$dailyElement.innerHTML = `
      <div class="date">${this.date.split("-")[2]}</div>
      ${this.postitList
        .map((e: any) => {
          const processState = this.checkSchedule(e);
          const statusColor = processState
            ? Constant.STATUS_BG_COLOR[e.status]
            : "#fff";
          return `
          <div class="date-contents" style="background-color: ${
            processState ? "#d0cfcf" : "#fff"
          };">
            <div class="daily-state" style="border-bottom: 2px solid ${statusColor};"></div>
          </div>`;
        })
        .join("")
        .trim()}
    `;
    return this.$dailyElement;
  };
}
