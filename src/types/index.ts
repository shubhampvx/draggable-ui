export interface Element {
  id: string;
  type: string;
  content?: string;
  styles?: Record<string, string>;
  children?: Element[];
  html?: string;
}

export interface Section {
  id: string;
  type: string;
  elements: Element[];
  styles?: Record<string, string>;
}

export interface DragItem {
  type: string;
  id: string;
  index: number;
}
