interface ProgressTogglePops {
  setBgColor: (process: number) => void;
  setTextColor: (process: number) => void;
}

export default class ProgressToggle {
  $ProgressToggle: HTMLInputElement;
  state: any;
  props: ProgressTogglePops;

  constructor($el: HTMLInputElement, state: any, props: ProgressTogglePops) {
    this.$ProgressToggle = $el;
    this.state = state;
    this.props = props;

    this.$ProgressToggle?.addEventListener("mousedown", (e) =>
      e.stopPropagation()
    );
    this.$ProgressToggle?.addEventListener("mouseup", (e) =>
      e.stopPropagation()
    );
    this.$ProgressToggle?.addEventListener("change", (e) =>
      this.setState(this.$ProgressToggle?.value)
    );
  }

  setState = (newState: any) => {
    this.state = newState;
    this.props.setBgColor(this.state);
    this.props.setTextColor(this.state);
  };

  render(): void {}
}
