import { STORAGE_KEYS } from "../common/constant";
import { setStorage, getStorage } from "../helpers";
import dayjs from "dayjs";
import { handleMouseDown, handleMouseMove } from "../handler/movePostitHandler";
import { initState } from "../interfaces/state";
import { DomHandler, ElementMouseEvent } from "../interfaces/event";
import Postit from "../components/PostIt";

interface pageProps {
  reRenderPage: (newState: initState) => void;
}

export default class Page {
  $Page: HTMLDivElement;
  $PostItContainer: HTMLDivElement;
  $PostItBody: HTMLDivElement;
  state: initState;
  props: pageProps;
  postitList: Postit[] = [];
  postitLastId: number = 1;

  constructor($el: HTMLDivElement, initState: initState, props: pageProps) {
    this.$Page = $el;
    this.state = initState;
    this.props = props;
    this.addNewPostIt = this.addNewPostIt.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.updatePostit = this.updatePostit.bind(this);
    this.setState = this.setState.bind(this);

    this.$PostItContainer = this.$Page.querySelector(".postit-container")!;
    this.$PostItBody = this.$Page.querySelector(".postit-body")!;
    this.$Page.addEventListener("dblclick", this.addNewPostIt);

    document.addEventListener("dragstart", (e: DragEvent) => {
      e.dataTransfer!.setData("startX", `${e.clientX!}`);
      e.dataTransfer!.setData("startY", `${e.clientY!}`);
    });

    document.addEventListener("dragover", (e) => e.preventDefault());
    document.addEventListener("drop", this.addNewPostIt);

    this.setState(initState);
  }

  fetchData(selectedPageId: number) {
    let postits: Postit[] = getStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${selectedPageId}`
    );

    if (!postits) {
      setStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${selectedPageId}`, []);
      postits = [];
    }

    let totalCount = postits.length;
    let doingCount = 0;
    let doneCount = 0;

    this.postitList = postits.map((post: Postit) => {
      if (post.state.postit_id > this.postitLastId)
        this.postitLastId = post.state.postit_id;

      switch (post.state.status) {
        case "doing":
          doingCount++;
          break;
        case "done":
          doneCount++;
          break;
      }

      return new Postit(
        {
          postit_id: post.state.postit_id,
          status: post.state.status,
          contents: post.state.contents,
          pos_X: post.state.pos_X,
          pos_Y: post.state.pos_Y,
          created_date: post.state.created_date,
          doing_date: post.state.doing_date,
          done_date: post.state.done_date,
          pageId: post.state.pageId,
          pageName: post.state.pageName,
        },
        {
          updatePostit: this.updatePostit,
          deletePostit: this.deletePostit,
          reRenderPage: this.props.reRenderPage,
        }
      );
    });

    this.state.selectedPageInfo!.totalCount = totalCount;
    this.state.selectedPageInfo!.doingCount = doingCount;
    this.state.selectedPageInfo!.doneCount = doneCount;
  }

  setState(newState: initState) {
    this.state = newState;
    this.fetchData(this.state.selectedPageId!);
    this.render();
  }

  addNewPostIt = (e: DragEvent | MouseEvent) => {
    let startX = 0;
    let startY = 0;
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    if (e instanceof DragEvent) {
      startX = Number(e.dataTransfer!.getData("startX")) - 10;
      startY = Number(e.dataTransfer!.getData("startY")) - 125;
    } else {
      mouseX = e.offsetX - 85;
      mouseY = e.offsetY + 20;
    }

    const newPostit = new Postit(
      {
        postit_id: (() => {
          this.postitLastId += 1;
          return this.postitLastId;
        })(),
        status: "todo",
        pos_X: mouseX - startX,
        pos_Y: mouseY - startY,
        created_date: dayjs().format("YYYY-MM-DD HH:mm"),
        doing_date: null,
        done_date: null,
        pageId: this.state.selectedPageInfo!.id,
        pageName: this.state.selectedPageInfo!.pageName,
      },
      {
        updatePostit: this.updatePostit,
        deletePostit: this.deletePostit,
        reRenderPage: this.props.reRenderPage,
      }
    );
    this.postitLastId = this.postitList.push(newPostit);
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
    this.setState(this.state);
    this.props.reRenderPage(this.state);
  };

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

  updatePostit() {
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
  }

  deletePostit = (e: ElementMouseEvent<MouseEvent>, postid_id: number) => {
    e.stopPropagation();
    e.preventDefault();
    const target = this.postitList.findIndex(
      (postit) => postit.state.postit_id === postid_id
    );
    if (target !== -1) {
      const [postit] = this.postitList.splice(target, 1);
      postit.$Postit.remove();
    }
    setStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${this.state.selectedPageId}`,
      this.postitList
    );
    this.props.reRenderPage(this.state);
    this.render();
  };

  handleMouseUp(e: DomHandler<HTMLDivElement>) {
    e.preventDefault();
    const target = e.target;
    const { id, style } = target.parentElement!;
    const postit = this.postitList.find((e: Postit) => {
      return e.state.postit_id === Number(id);
    });
    if (!postit) return;
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
