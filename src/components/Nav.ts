import { initState, PageListItem } from "../interfaces/state";

interface NavProps {
  addNewPage: () => void;
  deletePage: (id: number) => void;
  clickPageTab: (id: number) => void;
  updateTab: (id: number, newPageName: string) => void;
}
export default class Nav {
  $Nav: HTMLDivElement;
  $NavAddButton: HTMLDivElement;
  $NavCalenderButton: HTMLDivElement;
  $NavContainer: HTMLDivElement;
  state: initState;
  props: NavProps;

  constructor($el: HTMLDivElement, initState: initState, props: NavProps) {
    this.$Nav = $el;
    this.state = initState;
    this.props = props;

    this.$NavContainer = this.$Nav.querySelector(".page-nav-tab")!;
    this.$NavAddButton = this.$Nav.querySelector(".add-tab-button")!;
    this.$NavCalenderButton = this.$Nav.querySelector(".calender-button")!;
    this.$NavAddButton.addEventListener("click", this.props.addNewPage);
    this.setState(initState);
  }

  setState(newState: initState) {
    this.state = newState;
    this.render();
  }

  render(): void {
    const { pageList, selectedPageId } = this.state;
    this.$NavContainer.innerHTML = `
    ${pageList!
      .map((e, idx) => {
        return `<div class='tab ${
          selectedPageId === e.id ? "selected" : ""
        }' id="${e.id}">
        <p>${e.pageName}</p>
        <input class="tab-name-form" style="display:none" type="text" />
        <div class="tab-delete-button" id="${e.id}">🗑</div>
        </div>
        `;
      })
      .join("")}
    `;

    const $tabs = this.$Nav.querySelectorAll<HTMLDivElement>(".tab");
    $tabs.forEach((e: HTMLDivElement) => {
      const $textArea = e.childNodes[1] as HTMLParagraphElement;
      const $NavNameForm = e.childNodes[3] as HTMLInputElement;
      const $deleteButton = e.childNodes[5] as HTMLDivElement;
      const tabId = Number($deleteButton.id);

      $deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.props.deletePage(tabId);
      });
      e.addEventListener("click", (e) => {
        e.stopPropagation();
        if (selectedPageId === tabId) return;
        this.props.clickPageTab(tabId);
      });

      e.addEventListener("dblclick", (e) => {
        e.preventDefault();
        $textArea.style.display = "none";
        $NavNameForm.style.display = "";

        $NavNameForm?.focus();
        $NavNameForm?.addEventListener("focusout", (e) => {
          $textArea.style.display = "";
          $NavNameForm!.style.display = "none";
          this.props.updateTab(tabId, $NavNameForm!.value);
        });
      });

      $deleteButton.addEventListener;
    });
  }
}
