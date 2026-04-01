import { createGrid, isInBounds, setCell, getCell, gridToString } from './grid-helpers';

describe('createGrid', () => {
  test('should create a grid of the correct dimensions', () => {
    const grid = createGrid(5, 3, ".");
    expect(grid.length).toBe(3);         // 3 rows
    expect(grid[0].length).toBe(5);      // 5 columns each
    expect(grid[1].length).toBe(5);
    expect(grid[2].length).toBe(5);
  });

  test('should fill every cell with the fill character', () => {
    const grid = createGrid(3, 2, "X");
    for (const row of grid) {
      for (const cell of row) {
        expect(cell).toBe("X");
      }
    }
  });

  test('rows should be independent (not shared references)', () => {
    const grid = createGrid(3, 2, ".");
    grid[0][0] = "#";
    expect(grid[1][0]).toBe(".");  // Row 1 should not be affected
  });
});

describe('isInBounds', () => {
  test('should return true for valid positions', () => {
    expect(isInBounds(0, 0, 10, 5)).toBe(true);
    expect(isInBounds(9, 4, 10, 5)).toBe(true);
    expect(isInBounds(5, 2, 10, 5)).toBe(true);
  });

  test('should return false for negative positions', () => {
    expect(isInBounds(-1, 0, 10, 5)).toBe(false);
    expect(isInBounds(0, -1, 10, 5)).toBe(false);
  });

  test('should return false for positions at or beyond the boundary', () => {
    expect(isInBounds(10, 0, 10, 5)).toBe(false);
    expect(isInBounds(0, 5, 10, 5)).toBe(false);
  });
});

describe('setCell and getCell', () => {
  test('should write and read a character', () => {
    const grid = createGrid(5, 3, ".");
    setCell(grid, 2, 1, "@", 5, 3);
    expect(getCell(grid, 2, 1, 5, 3, ".")).toBe("@");
  });

  test('setCell should ignore out-of-bounds writes', () => {
    const grid = createGrid(5, 3, ".");
    setCell(grid, -1, 0, "@", 5, 3);   // Should not crash
    setCell(grid, 99, 0, "@", 5, 3);   // Should not crash
    // Grid should be unchanged
    expect(getCell(grid, 0, 0, 5, 3, ".")).toBe(".");
  });

  test('getCell should return fill for out-of-bounds reads', () => {
    const grid = createGrid(5, 3, ".");
    expect(getCell(grid, -1, 0, 5, 3, ".")).toBe(".");
    expect(getCell(grid, 99, 0, 5, 3, ".")).toBe(".");
  });
});

describe('gridToString', () => {
  test('should join rows with newlines', () => {
    const grid = createGrid(3, 2, ".");
    const result = gridToString(grid);
    expect(result).toBe("...\n...");
  });

  test('should reflect changes made with setCell', () => {
    const grid = createGrid(3, 2, ".");
    setCell(grid, 1, 0, "@", 3, 2);
    const result = gridToString(grid);
    expect(result).toBe(".@.\n...");
  });
});
