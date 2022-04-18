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
interface PostItState {
  postit_id: number;
  contents?: string;
  status?: string;
  pos_X: number;
  pos_Y: number;
}
interface initState {
  //   [key: string]: number | string | object | [];
  pageList: PageListItem[];
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
    this.addNewPostIt = this.addNewPostIt.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.updatePostit = this.updatePostit.bind(this);
    this.setState = this.setState.bind(this);

    this.$PostItContainer = this.$Page.querySelector(".postit-container")!;
    this.$PostItBody = this.$Page.querySelector(".postit-body")!;

    document.addEventListener("dragstart", (e: DragEvent) => {
      e.dataTransfer!.setData("startX", `${e.clientX! - 22}`);
      e.dataTransfer!.setData("startY", `${e.clientY! - 74}`);
    });
    document.addEventListener("dragover", (e) => e.preventDefault());
    document.addEventListener("drop", this.addNewPostIt);

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
      if (post.state.postit_id > this.postitLastId)
        this.postitLastId = post.state.postit_id;

      return new PostIt(
        {
          postit_id: post.state.postit_id,
          status: post.state.status,
          contents: post.state.contents,
          pos_X: post.state.pos_X,
          pos_Y: post.state.pos_Y,
        },
        {
          updatePostit: this.updatePostit,
          deletePostit: this.deletePostit,
        }
      );
    });
  }

  setState(newState: initState) {
    this.state = newState;
    this.fetchData(this.state.selectedPageId!);
    this.render();
  }

  addNewPostIt(e: DragEvent) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const startX = Number(e.dataTransfer!.getData("startX"));
    const startY = Number(e.dataTransfer!.getData("startY"));

    const newPostit = new PostIt(
      {
        postit_id: (() => {
          this.postitLastId += 1;
          return this.postitLastId;
        })(),
        pos_X: mouseX - startX,
        pos_Y: mouseY - startY,
      },
      {
        updatePostit: this.updatePostit,
        deletePostit: this.deletePostit,
      }
    );
    this.postitLastId = this.postitList.push(newPostit);
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
    this.setState(this.state);
  }

  render(): void {
    this.$PostItBody.innerHTML = ``;
    this.postitList!.forEach((e, idx) => {
      this.$PostItBody.appendChild(e.$Postit);
    });
    this.drowPostit();
  }

  drowPostit() {
    const postitList = document.querySelectorAll(".postit");
    postitList.forEach((postit: any, idx) => {
      let priority: any = postit.getAttribute("priority");
      if (!priority) {
        priority = idx + 1;
        postit.setAttribute("priority", priority);
      }
      postit.style["z-index"] = priority;

      postit.addEventListener("mousedown", handleMouseDown);
      postit.addEventListener("mouseup", this.handleMouseUp);
    });
  }

  updatePostit(postid_id: number) {
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
  }

  deletePostit = (postid_id: number) => {
    const target = this.postitList.findIndex(
      (postit) => postit.state.postit_id === postid_id
    );
    console.log("!!!!!!!!!", target);

    if (target !== -1) this.postitList.splice(target, 1);
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
    this.setState(this.state);
  };

  handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    const { id, style } = target.parentElement!;

    const postit = this.postitList.find((e: PostIt) => {
      return e.state.postit_id === Number(id);
    });
    postit!.state.pos_X = parseInt(style.left);
    postit!.state.pos_Y = parseInt(style.top);
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
    document.removeEventListener("mousemove", handleMouseMove);
    const el: HTMLDivElement | null = document.querySelector(".postit.hold");
    if (el) {
      el.removeAttribute("gap-x");
      el.removeAttribute("gap-y");
      el.classList.remove("hold");
    }
  }
}
