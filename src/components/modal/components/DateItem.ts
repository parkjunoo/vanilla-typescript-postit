export default class DateItam {
  date: number;
  $dailyElement;
  dailyScheduleJob: any;
  width;
  constructor(date: number, dailyWidth: string, dailyScheduleJob: any) {
    this.date = date;
    this.$dailyElement = document.createElement("li")!;
    this.$dailyElement.classList.add("date-wrapper");
    this.$dailyElement.style!.width = dailyWidth + "%";
    this.dailyScheduleJob = JSON.parse(JSON.stringify(dailyScheduleJob));
    this.width = dailyWidth;
    console.log(
      this.dailyScheduleJob
        .map((e: any) => {
          return `
      <div class="date-contents">
        <div class="daily-state"></div>
      </div>`;
        })
        .join("")
        .trim()
    );
  }

  getDailyElement = () => {
    this.$dailyElement.innerHTML = `
      <div class="date">${this.date}</div>
      ${this.dailyScheduleJob
        .map((e: any) => {
          return `
        <div class="date-contents">
          <div class="daily-state"></div>
        </div>`;
        })
        .join("")
        .trim()}
    `;
    return this.$dailyElement;
  };
}
