interface PageListItem {
  id: number;
  pageName: string;
  totalCount: number;
  doingCount: number;
  doneCount: number;
}
interface initState {
  //   [key: string]: number | string | object | [];
  pageList?: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
  selectedPageInfo?: PageListItem;
}

export default class ProgressBar {
  $ProgressBar: HTMLDivElement;
  $Doing: HTMLDivElement;
  $Done: HTMLDivElement;
  $DoneRate: HTMLDivElement;
  donePercent: number = 0;
  doingPercent: number = 0;
  state: initState;

  constructor($el: HTMLDivElement, initState: initState) {
    this.$ProgressBar = $el;
    this.$Doing = this.$ProgressBar.querySelector(".progress-doing")!;
    this.$Done = this.$ProgressBar.querySelector(".progress-done")!;
    this.$DoneRate = this.$ProgressBar.querySelector(".done-rate")!;

    this.state = initState;
    this.setState(initState);
  }

  fetchProcess = () => {
    const { totalCount, doingCount, doneCount } = this.state.selectedPageInfo!;
    this.doingPercent = totalCount ? (doingCount / totalCount) * 100 : 0;
    this.donePercent = totalCount ? (doneCount / totalCount) * 100 : 0;
  };

  setState = (newState: initState) => {
    this.state = newState;
    this.fetchProcess();
    this.render();
  };

  render(): void {
    this.$DoneRate.innerText = Math.floor(this.donePercent) + "% 완료";
    this.$Doing.style.width = this.doingPercent + "%";
    this.$Done.style.width = this.donePercent + "%";
  }
}
