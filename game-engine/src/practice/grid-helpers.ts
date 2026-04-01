/**
 * Create a 2D grid filled with a character.
 * @param width - Number of columns
 * @param height - Number of rows
 * @param fill - Character to fill every cell with
 * @returns A 2D array of strings
 */
export function createGrid(width: number, height: number, fill: string): string[][] {
  // TODO: Implement

  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => fill)
  );
}

/**
 * Check if (x, y) is within the grid boundaries.
 * @param x - Column index
 * @param y - Row index
 * @param width - Grid width
 * @param height - Grid height
 * @returns true if the position is valid
 */
export function isInBounds(x: number, y: number, width: number, height: number): boolean {
  // TODO: Implement

  if (x < 0 || x >= width) {
    return false;
  }
  // Check column bounds
  if (y < 0 || y >= height) {
    return false;
  }

  return true;
}

/**
 * Set a character at (x, y) in the grid. Does nothing if out of bounds.
 * @param grid - The 2D grid
 * @param x - Column index
 * @param y - Row index
 * @param char - The character to place
 * @param width - Grid width
 * @param height - Grid height
 */
export function setCell(grid: string[][], x: number, y: number, char: string, width: number, height: number): void {
  // TODO: Implement (remember: grid[y][x], not grid[x][y])
  
  if (isInBounds(x,y,width,height) === false){
    return;
  };
  
  grid[y][x] = char;
}

/**
 * Get the character at (x, y) in the grid. Returns fill char if out of bounds.
 * @param grid - The 2D grid
 * @param x - Column index
 * @param y - Row index
 * @param width - Grid width
 * @param height - Grid height
 * @param fill - Character to return if out of bounds
 * @returns The character at the position, or fill if out of bounds
 */
export function getCell(grid: string[][], x: number, y: number, width: number, height: number, fill: string): string {
  // TODO: Implement

  if (isInBounds(x,y,width,height) === false){
    return fill;
  }

  return grid[y][x];
}

/**
 * Convert a 2D grid to a display string.
 * Each row becomes one line, joined by newlines.
 * @param grid - The 2D grid
 * @returns A single string representation of the grid
 */
export function gridToString(grid: string[][]): string {
  // TODO: Implement
  
  return grid.map((row) => row.join('')).join('\n');

}
