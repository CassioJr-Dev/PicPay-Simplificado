import { randomUUID as uuidV4 } from 'node:crypto'

export type ToJSONReturnType<Props = Record<string, any>> = {
  id: string
  createdAt: Date
} & Props

export abstract class Entity<Props = Record<string, any>> {
  protected readonly _id: string
  protected readonly _props: Props
  protected readonly _createdAt: Date

  constructor(props: Props, id?: string, createdAt?: Date) {
    this._props = props
    this._id = this.isValidUUID(id)
    this._createdAt = createdAt || this.toDate()
  }

  get id() {
    return this._id
  }

  get props() {
    return this._props
  }

  get createdAt() {
    return this._createdAt
  }

  toJSON(): ToJSONReturnType<Props> {
    return {
      id: this._id,
      ...this._props,
      createdAt: this._createdAt,
    }
  }

  toDate(): Date {
    const newDate = new Date()
    newDate.setHours(newDate.getUTCHours())

    return newDate
  }

  isValidUUID(uuid: string): string {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89a-f]{1}[0-9a-f]{3}-[0-9a-f]{12}$/i

    const validate = regex.test(uuid)

    if (validate) {
      return uuid
    }

    return uuidV4()
  }
}
