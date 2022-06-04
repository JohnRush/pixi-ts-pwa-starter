/**
 * Trigger a callback a short period of time after a Window resize event occurs.
 * @param window The window to watch for `resize` on.
 * @param delayMs How long to wait in milliseconds. 100 is a good default.
 * @param fn The function to call after resize.
 * @returns An object with a dispose function for cleaning up.
 */
export function handleResizeComplete(
  window: Window,
  delayMs: number,
  fn: () => unknown
) {
  let id: number | undefined;

  function doWork() {
    clearTimeout(id);
    id = setTimeout(fn, delayMs);
  }

  window.addEventListener("resize", doWork);

  return {
    dispose() {
      clearTimeout(id), window.removeEventListener("resize", doWork);
    },
  };
}
