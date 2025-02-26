import { UserType } from '@/users/domain/enums/user.type.enum'
import { TransactionEntity, TransactionProps } from '../../transaction.entity'
import { TransactionDataBuilder } from '@/transaction/domain/testing/helpers/transaction-data-builder'
import { randomUUID } from 'node:crypto'

describe('TransactionEntity unit tests', () => {
  let props: TransactionProps
  let sut: TransactionEntity
  beforeEach(() => {
    TransactionEntity.validate = jest.fn()
    props = TransactionDataBuilder({})
    sut = new TransactionEntity(props)
  })
  it('Constructor method', () => {
    expect(TransactionEntity.validate).toHaveBeenCalled()
    expect(sut.props.amount).toEqual(props.amount)
    expect(sut.props.receiverId).toEqual(props.receiverId)
    expect(sut.props.senderId).toEqual(props.senderId)
  })
  it('Getter of amount field', () => {
    expect(sut.amount).toBeDefined()
    expect(sut.amount).toEqual(props.amount)
    expect(typeof sut.amount).toBe('number')
  })

  it('Setter of amount field', () => {
    sut['amount'] = 5
    expect(sut.props.amount).toEqual(5)
    expect(typeof sut.props.amount).toBe('number')
  })

  it('Getter of receiverId field', () => {
    expect(sut.receiverId).toBeDefined()
    expect(sut.receiverId).toEqual(props.receiverId)
    expect(typeof sut.receiverId).toBe('string')
  })

  it('Setter of receiverId field', () => {
    const newUuid = randomUUID()
    sut['receiverId'] = newUuid
    expect(sut.props.receiverId).toEqual(newUuid)
    expect(typeof sut.props.receiverId).toBe('string')
  })

  it('Getter of senderId field', () => {
    expect(sut.senderId).toBeDefined()
    expect(sut.senderId).toEqual(props.senderId)
    expect(typeof sut.senderId).toBe('string')
  })

  it('Setter of senderId field', () => {
    const newUuid = randomUUID()
    sut['senderId'] = newUuid
    expect(sut.props.senderId).toEqual(newUuid)
    expect(typeof sut.props.senderId).toBe('string')
  })

  it('Should update a property', () => {
    sut.updateProperty({ amount: 6 })
    expect(TransactionEntity.validate).toHaveBeenCalledTimes(2)
    expect(sut.props.amount).toEqual(6)
  })
})
