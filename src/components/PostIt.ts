interface PostIt {
  postit_id?: number;
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
interface PostitState {}
interface props {
  addNewPage: () => void;
  deletePage: (id: number) => void;
}
export default class Postit {
  $Postit: HTMLDivElement;
  postit_id: number;
  contents: string;
  status: string;
  pos_X: number;
  pos_Y: number;
  constructor({ postit_id, contents, status, pos_X, pos_Y }: PostIt) {
    this.postit_id = postit_id || 0;
    this.contents = contents || "";
    this.status = status || "todo";
    this.pos_X = pos_X;
    this.pos_Y = pos_Y;

    this.$Postit = document.createElement("div");
    this.$Postit.classList.add("postit");
    this.$Postit.id = String(this.postit_id);
    this.$Postit.style.left = this.pos_X + "px";
    this.$Postit.style.top = this.pos_Y + "px";
    this.$Postit.innerHTML = `
      <div class="postit-top-area"></div>
      <div class="postit-contents-area">${this.contents}</div>
      <textarea class="postit-contents-form" style="display: none;">${this.contents}</textarea>
    `;

    this.$Postit.addEventListener("dblclick", this.dbClickPostit);
    this.dbClickPostit = this.dbClickPostit.bind(this);
  }

  dbClickPostit(e: MouseEvent) {
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
      this.contents = "1111";
    });
  }
  setState() {
    this.render();
  }
  getState() {}

  render(): void {}
}
