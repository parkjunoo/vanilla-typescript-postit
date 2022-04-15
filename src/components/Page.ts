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
}

interface props {
  addNewPage?: () => void;
  deletePage?: (id: number) => void;
}
export default class Page {
  $Page: HTMLDivElement;
  state: initState;
  props: props;
  PostitList: PostIt[] = [];

  constructor($el: HTMLDivElement, initState: initState, props: props) {
    this.$Page = $el;
    this.state = initState;
    this.props = props;
    const { selectedPageId } = this.state;
    this.fetchData(selectedPageId!);

    this.setState(initState);
  }

  fetchData(selectedPageId: number) {
    const postits: PostIt[] = getStorage(
      `${STORAGE_KEYS.POSTIT_PAGE}_${selectedPageId}`
    );
    console.log(postits);

    if (!postits) {
      setStorage(`${STORAGE_KEYS.POSTIT_PAGE}_${selectedPageId}`, []);
    }

    this.PostitList = postits.map((post: PostIt) => {
      console.log("@@@@@@", post);
      return new PostIt({
        postit_id: post.postit_id,
        status: post.status,
        contents: post.contents,
        pos_X: post.pos_X,
        pos_Y: post.pos_Y,
      });
    });

    console.log("!!!", this.PostitList);
  }

  setState(newState: initState) {
    this.state = newState;
    const { selectedPageId } = this.state;

    this.render();
  }

  render(): void {}
}
