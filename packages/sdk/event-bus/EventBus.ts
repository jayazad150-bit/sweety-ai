type Handler = (payload?: unknown) => void;

export class EventBus {
  private listeners = new Map<string, Handler[]>();

  on(event: string, handler: Handler) {
    const current = this.listeners.get(event) ?? [];
    current.push(handler);
    this.listeners.set(event, current);
  }

  emit(event: string, payload?: unknown) {
    const handlers = this.listeners.get(event) ?? [];
    handlers.forEach((handler) => handler(payload));
  }
}