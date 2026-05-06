// These interfaces describe the shape of your components.

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  dx: number;   // cells per second
  dy: number;   // cells per second
}

export interface Appearance {
  char: string;
}
