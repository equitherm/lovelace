/**
 * Create a debounced ResizeObserver that dispatches a window resize event.
 * Used by cards with ApexCharts to trigger chart reflow on container resize.
 */
export function createChartResizeObserver(
  target: Element,
  opts?: { debounceMs?: number }
): ResizeObserver {
  let timeout: ReturnType<typeof setTimeout>;
  const ms = opts?.debounceMs ?? 100;
  const observer = new ResizeObserver(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => window.dispatchEvent(new Event('resize')), ms);
  });
  observer.observe(target);
  return observer;
}
