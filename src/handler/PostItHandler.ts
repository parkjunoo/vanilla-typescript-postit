interface PostIt {
  postit_id: number;
  contents: string;
  status: string;
  pos_X: number;
  pos_Y: number;
}

export default class PostItHandler {
  $postit_stk: HTMLDivElement;
  postit_list: PostIt[] = [];
  constructor($target: HTMLDivElement, state: []) {
    this.$postit_stk = $target;
    this.postit_list = state;
    this.render = this.render.bind(this);
  }

  setPostits(newState: PostIt[]) {
    this.postit_list = newState;
    this.render();
  }

  render(): void {}
}
