import { IRepositoryInterface } from '@/shared/domain/repositories/repository-contract'
import { UserEntity } from '../entities/user.entity'

export interface IUserRepositoryInterface
  extends IRepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<boolean>
}
