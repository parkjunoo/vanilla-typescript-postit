export default class App {
  $App: HTMLElement;

  constructor($el: HTMLElement, initState: object) {
    this.$App = $el;
    console.log(initState);
  }

  render() {}
}
