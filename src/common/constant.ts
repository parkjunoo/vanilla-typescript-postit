interface StatusText {
  [status: string]: { color: string; text: string };
}
interface StatusCode {
  [status: number]: string;
}
interface BGColor {
  [status: string]: string;
}

export const STORAGE_KEYS = {
  PAGE_LIST: "page_list",
  POSTIT_PAGE: "postit_page",
} as const;

export const STATUS_TEXT: StatusText = {
  todo: { color: "#778899", text: "TODO" },
  doing: { color: "#035400", text: "DOING.." },
  done: { color: "#1b64de", text: "DONE!" },
} as const;

export const STATUS_BG_COLOR: BGColor = {
  todo: "#fff6c1",
  doing: "#94dbc5",
  done: "#bdcfe4",
};

export const STATUS_CODE: StatusCode = {
  1: "todo",
  2: "doing",
  3: "done",
} as const;

export default { STORAGE_KEYS, STATUS_TEXT, STATUS_CODE, STATUS_BG_COLOR };
