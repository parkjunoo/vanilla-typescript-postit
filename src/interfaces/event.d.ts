// export interface DomHandler<T> extends EventTarget {
//   T;
//   target: T;
// }

export interface DomHandler<T extends EventTarget> extends MouseEvent {
  target: T;
}

export interface ElementMouseEvent<T extends Event> extends T {}
