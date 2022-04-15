import { STORAGE_KEYS } from "../common/constant";
import { setStorage, getStorage } from "../helpers";
import PostIt from "./PostIt";

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
  postitList?: PostIt[];
}

interface props {}
export default class Page {
  $Page: HTMLDivElement;
  $PostItContainer: HTMLDivElement;
  $PostItBody: HTMLDivElement;
  state: initState;
  props: props;
  postitList: PostIt[] = [];

  constructor($el: HTMLDivElement, initState: initState, props: props) {
    this.$Page = $el;
    this.state = initState;
    this.props = props;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addNewPostIt = this.addNewPostIt.bind(this);

    this.$PostItContainer = this.$Page.querySelector(".postit-container")!;
    this.$PostItContainer.addEventListener("dragend", this.addNewPostIt);
    this.$PostItBody = this.$Page.querySelector(".postit-body")!;

    const { selectedPageId } = this.state;
    this.fetchData(selectedPageId!);
    this.setState(initState);
  }

  fetchData(selectedPageId: number) {
    let postits: PostIt[] = getStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${selectedPageId}`
    );

    if (!postits) {
      setStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${selectedPageId}`, []);
      postits = [];
    }

    this.postitList = postits.map((post: PostIt) => {
      return new PostIt({
        postit_id: post.postit_id,
        status: post.status,
        contents: post.contents,
        pos_X: post.pos_X,
        pos_Y: post.pos_Y,
      });
    });
  }

  setState(newState: initState) {
    this.state = newState;
    const { selectedPageId } = this.state;
    this.fetchData(selectedPageId!);
    this.render();
  }

  addNewPostIt(e: DragEvent) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const newPostit = new PostIt({ pos_X: mouseX - 90, pos_Y: mouseY - 90 });
    this.postitList.push(newPostit);
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
    this.setState(this.state);
  }

  onDragEnd(e: any) {
    const newPostit = document.createElement("div");
    newPostit.classList.add("postit");
    newPostit.innerHTML = `
      <div class="postit-top-area" ></div>
      <div
      class="postit-contents-area"
      >안녕하세요</div>
      `;
    this.$Page.appendChild(newPostit);

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    newPostit.style.left = mouseX - 90 + "px";
    newPostit.style.top = mouseY - 90 + "px";
  }

  render(): void {
    this.$PostItBody.innerHTML = `${this.postitList!.map((e, idx) => {
      return `
      <div class='postit' style="left: ${e.pos_X}px; top: ${e.pos_Y}px;">
        <div class="postit-top-area"></div>
        <div class="postit-contents-area">안녕하세요</div>
      </div>`;
    }).join("")}
    `;
  }
}
