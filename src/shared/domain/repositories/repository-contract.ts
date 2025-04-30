import { Entity } from '../entities/entity'

export interface IRepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void | E>
  findById(id: string): Promise<E>
  findAll(userId?: string): Promise<E[]>
  update(entity: E): Promise<E>
  delete(id: string): Promise<void>
}
