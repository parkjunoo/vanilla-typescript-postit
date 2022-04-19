import { setStorage, getStorage } from "../helpers";
import ProcessToggle from "./ProcessToggle";
import Constant from "../common/constant";

interface PostItState {
  postit_id: number;
  contents?: string;
  status: string | number;
  pos_X: number;
  pos_Y: number;
}

interface PostItProps {
  updatePostit: () => void;
  deletePostit: (e: MouseEvent, postit_id: number) => void;
}
export default class Postit {
  $Postit: HTMLDivElement;
  $PostItContents: HTMLDivElement;
  $PostItForm: HTMLTextAreaElement;
  $PostItDeleteButton: HTMLDivElement;
  $PostItStatus: HTMLDivElement;
  processToggle: ProcessToggle;
  state: PostItState;
  props: PostItProps;

  constructor(
    { postit_id, contents = "", status, pos_X, pos_Y }: PostItState,
    props: PostItProps
  ) {
    this.state = {
      postit_id: postit_id,
      contents: contents,
      status: status,
      pos_X: pos_X,
      pos_Y: pos_Y,
    };
    this.props = props;
    this.$Postit = document.createElement("div");
    this.$Postit.classList.add("postit");
    this.$Postit.id = String(postit_id);
    this.$Postit.style.left = pos_X + "px";
    this.$Postit.style.top = pos_Y + "px";
    this.$Postit.style.background = Constant.STATUS_BG_COLOR[this.state.status];
    this.$Postit.innerHTML = `
      <div class="postit-top-area">
        <div class="postit-status"></div>
        <input
          class="process-toggle-button"
          type="range"
          id="RangeFilter"
          min="1"
          max="3"
          value="1"
          style=""
        />
        <div class="postit-delete-button">🗑</div>
      </div>
      <div class="postit-contents-area">${contents}</div>
      <textarea class="postit-contents-form" value="${contents}" style="display: none;"></textarea>
    `;

    this.$PostItContents = this.$Postit.querySelector(".postit-contents-area")!;
    this.$PostItForm = this.$Postit.querySelector(".postit-contents-form")!;
    this.$PostItForm.value = contents;

    this.$PostItContents.addEventListener("dblclick", this.dbClickPostit);
    this.dbClickPostit = this.dbClickPostit.bind(this);
    this.setContetns = this.setContetns.bind(this);

    this.$PostItStatus = this.$Postit.querySelector(".postit-status")!;
    this.$PostItStatus.innerText = Constant.STATUS_TEXT[this.state.status].text;
    this.$PostItStatus.style.color =
      Constant.STATUS_TEXT[this.state.status].color;

    this.$PostItDeleteButton = this.$Postit.querySelector(
      ".postit-delete-button"
    )!;
    this.$PostItDeleteButton.addEventListener("mouseup", (e) =>
      e.stopPropagation()
    );
    this.$PostItDeleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.props.deletePostit(e, this.state.postit_id);
    });

    this.processToggle = new ProcessToggle(
      this.$Postit.querySelector(".process-toggle-button")!,
      this.state.status,
      {
        setBgColor: this.setBgColor,
        setTextColor: this.setTextColor,
        updateStatus: this.updateStatus,
      }
    );
  }

  dbClickPostit = (e: MouseEvent) => {
    const $PostitContents = e.target as HTMLDivElement;
    const $InputForm =
      $PostitContents.parentElement?.querySelector<HTMLTextAreaElement>(
        ".postit-contents-form"
      );

    $PostitContents!.style.display = "none";
    $InputForm!.style.display = "";

    $InputForm?.focus();
    $InputForm?.addEventListener("focusout", (e) => {
      $PostitContents!.style.display = "";
      $InputForm!.style.display = "none";
      this.setContetns($InputForm!.value);
    });
  };

  setContetns = (text: string) => {
    this.$PostItContents.innerHTML = `${text}`;
    this.state.contents = text;
    this.props.updatePostit();
  };

  updateStatus = (process: number) => {
    const newStatus = Constant.STATUS_CODE[process];
    this.state.status = newStatus;
    this.props.updatePostit();
  };

  setBgColor = (process: number) => {
    const status = Constant.STATUS_CODE[process];
    this.$Postit.style.backgroundColor = Constant.STATUS_BG_COLOR[status];
    this.props.updatePostit();
  };

  setTextColor = (process: number) => {
    const status = Constant.STATUS_CODE[process];
    this.$PostItStatus.innerText = Constant.STATUS_TEXT[status].text;
    this.$PostItStatus.style.color = Constant.STATUS_TEXT[status].color;
  };

  setState() {
    this.render();
  }
  getState() {}

  render(): void {
    this.$Postit;
  }
}
