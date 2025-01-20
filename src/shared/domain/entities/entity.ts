import { randomUUID as uuidV4 } from 'node:crypto'

export type ToJSONReturnType<Props = Record<string, any>> = {
  id: string
  created_at: Date
} & Props

export abstract class Entity<Props = Record<string, any>> {
  protected readonly _id: string
  protected readonly _props: Props
  protected readonly _created_at: Date
  protected readonly _updated_at: Date

  constructor(props: Props, id?: string, created_at?: Date) {
    this._props = props
    this._id = this.isValidUUID(id)
    this._created_at = created_at || this.toDate()
  }

  get id() {
    return this._id
  }

  get props() {
    return this._props
  }

  get created_at() {
    return this._created_at
  }

  toJSON(): ToJSONReturnType<Props> {
    return {
      id: this._id,
      ...this._props,
      created_at: this._created_at,
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
