import { randomUUID as uuidV4 } from 'node:crypto'

export type ToJSONReturnType<Props> = {
  id: string
  created_at: Date
  updated_at: Date
} & Props

export abstract class Entity<Props = any> {
  protected readonly _id: string
  protected readonly _props: Props
  protected readonly _created_at: Date
  protected readonly _updated_at: Date

  constructor(props: Props, id?: string, created_at?: Date, updated_at?: Date) {
    this._props = props
    this._id = id || uuidV4()
    this._created_at = created_at || this.toDate()
    this._updated_at = updated_at || this.toDate()
  }

  toJSON(): ToJSONReturnType<Props> {
    return {
      id: this._id,
      ...this._props,
      created_at: this._created_at,
      updated_at: this._updated_at,
    }
  }

  toDate(): Date {
    const newDate = new Date()
    newDate.setHours(newDate.getUTCHours())

    return newDate
  }
}
