export type Resolution = {
  x: number;
  y: number;
};

export function prettyResolution(resolution: Resolution): string {
  return resolution.x + "px by " + resolution.y + "px";
}
