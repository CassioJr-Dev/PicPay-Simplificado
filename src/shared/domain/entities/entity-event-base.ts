export class EntityEventBase {
  #events: unknown[] = []

  addEvent(event: unknown): void {
    this.#events.push(event)
  }

  clearEvents(): void {
    this.#events = []
  }

  getEvents(): unknown[] {
    return [...this.#events]
  }
}
