export default class PostItHandler {
  $postit_stk: HTMLDivElement;
  constructor($target: HTMLDivElement) {
    this.$postit_stk = $target;
    this.drawPostits();
  }

  drawPostits(): void {
    // const postitList = document.querySelectorAll(".postit");
    // postitList.forEach(function (postit: HTMLDivElement, idx: number) {
    //   let priority: string = postit.getAttribute("priority");
    //   if (!priority) {
    //     priority = idx + 1;
    //     postit.setAttribute("priority", priority);
    //   }
    //   postit.style.zIndex = priority;
    //   return;
    //   // postit.addEventListener("mousedown", handleMouseDown);
    // });
  }
}
