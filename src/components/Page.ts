import { STORAGE_KEYS } from "../common/constant";
import { setStorage, getStorage } from "../helpers";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "../handler/movePostitHandler";
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
  postitLastId: number = 1;

  constructor($el: HTMLDivElement, initState: initState, props: props) {
    this.$Page = $el;
    this.state = initState;
    this.props = props;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addNewPostIt = this.addNewPostIt.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.$PostItContainer = this.$Page.querySelector(".postit-container")!;
    this.$PostItContainer.addEventListener("dragend", this.addNewPostIt);
    this.$PostItBody = this.$Page.querySelector(".postit-body")!;

    document.addEventListener("dragover", (e) => e.preventDefault());
    document.addEventListener("drop", (e) => e.preventDefault());

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
      if (post.postit_id > this.postitLastId)
        this.postitLastId = post.postit_id;
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
    const newPostit = new PostIt({
      postit_id: (() => {
        this.postitLastId += 1;
        return this.postitLastId;
      })(),
      pos_X: mouseX - 90,
      pos_Y: mouseY - 90,
    });
    this.postitLastId = this.postitList.push(newPostit);
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
      <div class='postit' id="${e.postit_id}" style="left: ${e.pos_X}px; top: ${e.pos_Y}px;">
        <div class="postit-top-area"></div>
        <div class="postit-contents-area">안녕하세요</div>
      </div>`;
    }).join("")}
    `;
    this.drowPostit();
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  drowPostit() {
    const postitList = document.querySelectorAll(".postit");
    postitList.forEach(function (postit: any, idx) {
      let priority: any = postit.getAttribute("priority");
      if (!priority) {
        priority = idx + 1;
        postit.setAttribute("priority", priority);
      }
      postit.style["z-index"] = priority;

      postit.addEventListener("mousedown", handleMouseDown);
    });
  }

  handleMouseUp(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    const { id, style } = target.parentElement!;

    const postit = this.postitList.find((e) => e.postit_id === Number(id));
    postit!.pos_X = parseInt(style.left);
    postit!.pos_Y = parseInt(style.top);
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
    document.removeEventListener("mousemove", handleMouseMove);
    e.preventDefault();
    const el: HTMLDivElement | null = document.querySelector(".postit.hold");
    if (el) {
      el.removeAttribute("gap-x");
      el.removeAttribute("gap-y");
      el.classList.remove("hold");
    }
  }
}
