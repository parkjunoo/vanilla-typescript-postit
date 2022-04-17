import { setStorage, getStorage } from "../helpers";

interface PostItState {
  postit_id: number;
  contents?: string;
  status?: string;
  pos_X: number;
  pos_Y: number;
}
interface PageListItem {
  id: number;
  page_name: string;
  total_count: number;
  todo_count: number;
  ing_count: number;
  complete_count: number;
}
interface initState {
  //   [key: string]: number | string | object | [];
  pageList?: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
  postitList?: Postit[];
}
interface PostItProps {
  updatePostit: (postit_id: number) => void;
}
export default class Postit {
  $Postit: HTMLDivElement;
  $PostItContents: HTMLDivElement;
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
      <div class="postit-top-area"></div>
      <div class="postit-contents-area">${contents}</div>
      <textarea class="postit-contents-form" value="${contents}" style="display: none;"></textarea>
    `;

    this.$PostItContents = this.$Postit.querySelector(".postit-contents-area")!;

    this.$Postit.addEventListener("dblclick", this.dbClickPostit);
    this.dbClickPostit = this.dbClickPostit.bind(this);
    this.setContetns = this.setContetns.bind(this);
  }

  dbClickPostit = (e: MouseEvent) => {
    e.stopPropagation();
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
  setState() {
    this.render();
  }
  getState() {}

  render(): void {
    this.$Postit;
  }
}
