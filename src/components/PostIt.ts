interface PostIt {
  postit_id: number;
  contents: string;
  status: string;
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
  postit_id: number;
  contents: string;
  status: string;
  pos_X: number;
  pos_Y: number;
  constructor({ postit_id, contents, status, pos_X, pos_Y }: PostIt) {
    this.postit_id = postit_id;
    this.contents = contents;
    this.status = status;
    this.pos_X = pos_X;
    this.pos_Y = pos_Y;
  }

  setState() {
    this.render();
  }
  getState() {}

  render(): void {}
}
