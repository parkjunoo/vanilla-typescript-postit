import dayjs from "dayjs";
import { PostItState } from "../../../interfaces/state";

interface DateItamProps {
  clickPageTab: (pageId: number) => void;
  modalHide?: () => void;
}
export default class DateItam {
  date: string;
  $dailyElement;
  postitList: PostItState[];
  domState: { [x: string]: any } = {};
  props: DateItamProps;

  constructor(
    date: string,
    dailyWidth: string,
    postitList: PostItState[],
    props: DateItamProps
  ) {
    this.date = date;
    this.$dailyElement = document.createElement("li")!;
    this.$dailyElement.classList.add("date-wrapper");
    this.$dailyElement.style!.width = dailyWidth + "%";
    this.postitList = JSON.parse(JSON.stringify(postitList));
    this.props = props;
    this.postitList.reverse();
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

    this.domState["color"] = "#ffe200";
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
      this.domState["color"] = "#ffe200";
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

  goToPage = (pageId: number, postitId: number) => {
    this.props.clickPageTab(pageId);
    this.props.modalHide!();
  };

  getDailyElement = () => {
    const targetDate = dayjs().format("YYYY-MM-DD");
    this.$dailyElement.innerHTML = `
      <div class="date" style="background-color:${
        dayjs(this.date).diff(targetDate, "day") === 0 ? "#fff6c1" : "#fff"
      };">${this.date.split("-")[2]}</div>
    `;
    this.postitList.forEach((postit: PostItState, idx: number) => {
      const processState = this.checkSchedule(postit, idx);
      this.setColor(postit);
      const statusColor = processState ? this.domState.color : "#fff";
      const $dateContentsElement = document.createElement("div");
      $dateContentsElement.classList.add("date-contents");

      $dateContentsElement.style.backgroundColor = processState
        ? "#d0cfcf"
        : "#fff";
      if (processState) {
        const hover_contents = `Page: [${postit.pageName}]\n\n${postit.contents}`;
        $dateContentsElement.setAttribute("postit-content", hover_contents);
        $dateContentsElement.classList.add("title");
        $dateContentsElement.addEventListener("click", () =>
          this.goToPage(postit.pageId, postit.postit_id)
        );
      }
      $dateContentsElement.style.borderStartStartRadius =
        this.domState.start + "px";
      $dateContentsElement.style.borderEndEndRadius = this.domState.end + "px";
      $dateContentsElement.innerHTML = `
        <div class="daily-state" style="border-top: 3px solid ${statusColor};" ></div>
      `;

      this.$dailyElement.appendChild($dateContentsElement);
    });

    return this.$dailyElement;
  };
}
