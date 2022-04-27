import Postit from "../components/PostIt";

export interface initState {
  pageList?: PageListItem[];
  lastPageId?: number;
  selectedPageId?: number;
  selectedPageInfo?: PageListItem;
  maxPageId?: number;
  postitList?: Postit[];
}

export interface PageListItem {
  id: number;
  pageName: string;
  totalCount: number;
  doingCount: number;
  doneCount: number;
}

export interface PostItState {
  postit_id: number;
  contents?: string;
  status: string | number;
  pos_X: number;
  pos_Y: number;
  created_date: string | null;
  doing_date?: string | null;
  done_date?: string | null;
  pageId: number;
  pageName: string;
}

export type Postit = Postit;
