export type RectangleDimensions = [number, number, number, number]; // left, top, width, height

/**
 * Create RectangleDimensions object from a given width and height.
 * @param width The width of the rectangle.
 * @param height The height of the rectangle.
 * @returns A new RectangleDimensions object.
 */
export const makeRect = (
  width: number,
  height: number
): RectangleDimensions => [0, 0, width, height];

/**
 * Adds padding/margin outside of the given rectangle.
 * The resulting rectangle will be smaller by twice the padding size.
 * @param r The rectangle to pad
 * @param horiz The amount of horizontal padding.
 * @param vert The amount of vertical padding.
 * @returns A new RectangleDimensions object.
 */
export const padRect = (
  r: RectangleDimensions,
  horiz: number,
  vert = horiz
): RectangleDimensions => [
  r[0] + horiz,
  r[1] + vert,
  r[2] - horiz * 2,
  r[3] - vert * 2,
];

/**
 * Translate (move) a rectangle by the provided distance.
 * @param r The rectangle to translate
 * @param x The distance on the x axis to move.
 * @param y The distance on the y axis to move.
 * @returns A new RectangleDimensions object.
 */
export const translateRect = (
  r: RectangleDimensions,
  x: number,
  y: number
): RectangleDimensions => [r[0] + x, r[1] + y, r[2], r[3]];
