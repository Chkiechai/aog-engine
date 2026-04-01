/**
 * A 2D character buffer for building terminal display frames.
 *
 * Coordinates use (x, y) where x is the column and y is the row.
 * The origin (0, 0) is the top-left corner.
 */
export class ScreenBuffer {
  private width: number;
  private height: number;
  private fillChar : string;
  private grid : string[][];

  /**
   * Create a new ScreenBuffer.
   * @param width - Number of columns
   * @param height - Number of rows
   * @param fillChar - Character used for empty cells (default: ".")
   */
  constructor(width: number, height: number, fillChar: string = ".") {
    this.width = width;
    this.height = height;
    this.fillChar = fillChar;

    this.grid = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => this.fillChar)
    );

  }

  /** Fill every cell with the fill character */
  clear(): void {
    this.grid = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => this.fillChar)
    );
  }

  /**
   * Set a character at (x, y). Does nothing if out of bounds.
   * @param x - Column index
   * @param y - Row index
   * @param char - The character to place (must be a single character)
   */
  set(x: number, y: number, char: string): void {
    if (x < 0 || x >= this.width){
      return;
    };
    if (y < 0 || y >= this.height){
      return;
    };
  
    this.grid[y][x] = char;
  }

  /**
   * Get the character at (x, y). Returns fillChar if out of bounds.
   * @param x - Column index
   * @param y - Row index
   * @returns The character at the position
   */
  get(x: number, y: number): string {
    if (x < 0 || x >= this.width){
      return this.fillChar;
    }

    if (y < 0 || y >= this.height){
      return this.fillChar;
    }

  return this.grid[y][x];

  }

  /**
   * Write a string starting at (x, y), extending to the right.
   * Characters that extend past the right edge are clipped.
   * @param x - Starting column
   * @param y - Row
   * @param text - The string to write
   */
  writeText(x: number, y: number, text: string): void {
    for (let i = 0; i < text.length; i++){
        this.set((x+i), y, text[i]);
    }
  }

  /**
   * Convert the buffer to a single display string.
   * Rows are joined with newlines.
   * @returns The buffer as a printable string
   */
  toString(): string {
    return this.grid.map((row) => row.join('')).join('\n');

  }

  /** @returns The buffer width in columns */
  getWidth(): number {
    return this.width;
  }

  /** @returns The buffer height in rows */
  getHeight(): number {
    return this.height;
  }
}

