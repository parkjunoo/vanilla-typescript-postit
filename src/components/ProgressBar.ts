interface PageListItem {
  id: number;
  page_name: string;
  totalCount: number;
  todoCount: number;
  ingCount: number;
  doneCount: number;
}
interface initState {
  //   [key: string]: number | string | object | [];
  pageList: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
}

export default class ProgressBar {
  $ProgressBar: HTMLDivElement;
  $Doing: HTMLDivElement;
  $Done: HTMLDivElement;
  donePercent: number = 0;
  doingPercent: number = 0;
  state: initState;

  constructor($el: HTMLDivElement, initState: initState) {
    this.$ProgressBar = $el;
    this.$Doing = this.$ProgressBar.querySelector(".progress-doing")!;
    this.$Done = this.$ProgressBar.querySelector(".progress-done")!;
    this.state = initState;
    this.setState(initState);
  }

  fetchProcess = () => {
    const target = this.state.pageList.find(
      (e) => e.id === this.state.selectedPageId
    );
    this.doingPercent = (target!.ingCount / target!.totalCount) * 100;
    this.donePercent = (target!.doneCount / target!.totalCount) * 100;
  };

  setState = (newState: initState) => {
    this.state = newState;
    this.fetchProcess();
    this.render();
  };

  render(): void {
    console.log("!!!!!!");
    this.$Doing.style.width = this.doingPercent + "%;";
    this.$Done.style.width = this.donePercent + "%;";
  }
}
