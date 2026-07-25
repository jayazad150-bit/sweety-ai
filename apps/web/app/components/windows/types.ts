export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;

  position: WindowPosition;

  size: WindowSize;

  minimized: boolean;

  maximized: boolean;

  focused: boolean;

  closable?: boolean;

  resizable?: boolean;
}