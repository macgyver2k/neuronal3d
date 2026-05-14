/**
 * Minimaler DOM-Oberflächen-Ersatz für OrbitControls im Worker:
 * Events kommen per postMessage vom Hauptthread (lokale Canvas-Koordinaten).
 */
export class WorkerCanvasDomSurfaceStub {
  clientWidth = 1;
  clientHeight = 1;
  readonly style: { touchAction: string } = { touchAction: 'none' };

  private readonly listeners = new Map<
    string,
    Set<EventListenerOrEventListenerObject>
  >();

  setLayoutSize(width: number, height: number): void {
    this.clientWidth = Math.max(1, Math.floor(width));
    this.clientHeight = Math.max(1, Math.floor(height));
  }

  getBoundingClientRect(): DOMRect {
    return new DOMRect(0, 0, this.clientWidth, this.clientHeight);
  }

  getRootNode(): ReturnType<HTMLElement['getRootNode']> {
    return this as unknown as ReturnType<HTMLElement['getRootNode']>;
  }

  setPointerCapture(_pointerId: number): void {}

  releasePointerCapture(_pointerId: number): void {}

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    _options?: boolean | AddEventListenerOptions,
  ): void {
    if (listener === null) return;
    let bucket = this.listeners.get(type);
    if (!bucket) {
      bucket = new Set();
      this.listeners.set(type, bucket);
    }
    bucket.add(listener);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    _options?: boolean | EventListenerOptions,
  ): void {
    if (listener === null) return;
    this.listeners.get(type)?.delete(listener);
  }

  dispatchForwardedEvent(event: Event): void {
    const bucket = this.listeners.get(event.type);
    if (!bucket) return;
    bucket.forEach((listener) => {
      if (typeof listener === 'function') listener(event);
      else listener.handleEvent(event);
    });
  }

  dispatchEvent(event: Event): boolean {
    this.dispatchForwardedEvent(event);
    return true;
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}
