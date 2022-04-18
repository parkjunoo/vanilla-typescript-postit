import { setStorage, getStorage } from "../helpers";
import ProcessToggle from "./ProcessToggle";

interface PostItState {
  postit_id: number;
  contents?: string;
  status?: string;
  pos_X: number;
  pos_Y: number;
}
interface BGColor {
  [bs: string]: string;
}

interface PostItProps {
  updatePostit: (postit_id: number) => void;
}
export default class Postit {
  $Postit: HTMLDivElement;
  $PostItContents: HTMLDivElement;
  $PostItForm: HTMLTextAreaElement;
  $PostItDeleteButton: HTMLDivElement;
  processToggle: ProcessToggle;
  state: PostItState;
  props: PostItProps;
  constructor(
    { postit_id, contents = "", status = "todo", pos_X, pos_Y }: PostItState,
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
    this.$Postit.innerHTML = `
      <div class="postit-top-area">
        <input
          class="process-toggle-button"
          type="range"
          id="RangeFilter"
          min="1"
          max="3"
          value="1"
          style="width: 60px"
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

    this.$PostItDeleteButton = this.$Postit.querySelector(
      ".postit-delete-button"
    )!;
    this.$PostItDeleteButton.addEventListener("mouseup", (e) =>
      e.stopPropagation()
    );

    this.processToggle = new ProcessToggle(
      this.$Postit.querySelector(".process-toggle-button")!,
      this.state.status,
      {
        setBgColor: this.setBgColor,
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
    this.props.updatePostit(this.state.postit_id);
  };

  setBgColor = (process: number) => {
    const bgList: BGColor = {
      1: "#fff6c1",
      2: "#94dbc5",
      3: "#bdcfe4",
    };
    this.$Postit.style.backgroundColor = bgList[process];
  };

  setState() {
    this.render();
  }
  getState() {}

  render(): void {
    this.$Postit;
  }
}
