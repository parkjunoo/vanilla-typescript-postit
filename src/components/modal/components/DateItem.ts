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
  domState: { [x: string]: any } = {};

  constructor(date: string, dailyWidth: string, postitList: any) {
    this.date = date;
    this.$dailyElement = document.createElement("li")!;
    this.$dailyElement.classList.add("date-wrapper");
    this.$dailyElement.style!.width = dailyWidth + "%";
    this.postitList = JSON.parse(JSON.stringify(postitList));
  }

  checkSchedule = (postit: PostItState, idx: number) => {
    const today = dayjs().format("YYYY-MM-DD");
    const created_date = dayjs(postit.created_date).format("YYYY-MM-DD");
    const done_date = dayjs(postit.done_date).format("YYYY-MM-DD");
    const startDiff = dayjs(created_date).diff(this.date, "day");
    const doneDiff = dayjs(done_date).diff(this.date, "day");
    const todayDiff = dayjs(this.date).diff(today, "day");

    if (startDiff <= 0) {
      if (todayDiff > 0) {
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

    this.domState["color"] = "#fff6c1";
    this.domState["start"] = "0";
    this.domState["end"] = "0";

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
      this.domState["color"] = "#fff6c1";
      if (startDiff === 0) {
        this.domState["star"] = 5;
      }
    }
    if (!isNaN(doingDiff) && doingDiff <= 0) {
      this.domState["color"] = "#0152cc";
    }
    if (!isNaN(doneDiff) && doneDiff <= 0) {
      this.domState["color"] = "#34b37e";
      if (doneDiff === 0) {
        this.domState["end"] = 5;
      }
    }
  };

  getDailyElement = () => {
    this.$dailyElement.innerHTML = `
      <div class="date">${this.date.split("-")[2]}</div>
      ${this.postitList
        .map((e: any, idx: number) => {
          if (idx === 7) {
            console.log("@@@@@@", e);
          }
          const processState = this.checkSchedule(e, idx);
          this.setColor(e);
          const statusColor = processState ? this.domState.color : "#fff";
          return `
          <div class="date-contents" style="background-color: ${
            processState ? "#d0cfcf" : "#fff"
          }; border-radius: ${this.domState.start}px 0 0 ${
            this.domState.end
          }px;">
            <div class="daily-state" style="border-bottom: 3px solid ${statusColor};" ></div>
          </div>`;
        })
        .join("")
        .trim()}
    `;
    return this.$dailyElement;
  };
}
