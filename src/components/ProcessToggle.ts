export default class ProgressToggle {
  $ProgressToggle: HTMLInputElement;
  state: any;

  constructor($el: HTMLInputElement, state: any) {
    this.$ProgressToggle = $el;
    this.state = state;
    this.$ProgressToggle?.addEventListener("mousedown", (e) =>
      e.stopPropagation()
    );
    this.$ProgressToggle?.addEventListener("mouseup", (e) =>
      e.stopPropagation()
    );
    this.$ProgressToggle?.addEventListener("change", (e) => {
      console.log(this.$ProgressToggle?.value);
      // console.log(e);
    });
  }

  setState(newState: any) {
    this.state = newState;
    this.render();
  }

  render(): void {}
}
