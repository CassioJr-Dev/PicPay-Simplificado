import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UnprocessableError } from '@/shared/domain/errors/unprocessable-error'
import { TransactionEntity, TransactionProps } from '../../transaction.entity'
import { TransactionDataBuilder } from '@/transaction/domain/testing/helpers/transaction-data-builder'

describe('TransactionEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a transaction with invalid amount', () => {
      let props: TransactionProps = {
        ...TransactionDataBuilder({}),
        amount: null,
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )

      props = {
        ...TransactionDataBuilder({}),
        amount: '' as any,
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )

      props = {
        ...TransactionDataBuilder({}),
        amount: '10' as any,
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )
    })

    it('Should throw an error when creating a user with invalid senderId', () => {
      let props: TransactionProps = {
        ...TransactionDataBuilder({}),
        senderId: null,
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )

      props = {
        ...TransactionDataBuilder({}),
        senderId: '',
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )

      props = {
        ...TransactionDataBuilder({}),
        senderId: 10 as any,
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )

      props = {
        ...TransactionDataBuilder({}),
        senderId: 'a'.repeat(256),
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )
    })
    it('Should throw an error when creating a user with invalid receiverId', () => {
      let props: TransactionProps = {
        ...TransactionDataBuilder({}),
        receiverId: null,
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )

      props = {
        ...TransactionDataBuilder({}),
        receiverId: '',
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )

      props = {
        ...TransactionDataBuilder({}),
        receiverId: 10 as any,
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )

      props = {
        ...TransactionDataBuilder({}),
        receiverId: 'a'.repeat(256),
      }
      expect(() => new TransactionEntity(props)).toThrowError(
        UnprocessableError,
      )
    })

    it('Should a valid user', () => {
      expect.assertions(0)

      const props: TransactionProps = {
        ...TransactionDataBuilder({}),
      }
      new TransactionEntity(props)
    })

    describe('Update property', () => {
      it('Should throw an error when update a transaction with invalid property', () => {
        const entity = new TransactionEntity(TransactionDataBuilder({}))
        expect(() =>
          entity.updateProperty({ amount: 'a' as any }),
        ).toThrowError(UnprocessableError)
      })

      it('Should a valid transaction', () => {
        expect.assertions(1)

        const props: TransactionProps = {
          ...TransactionDataBuilder({}),
        }

        const entity = new TransactionEntity(props)
        entity.updateProperty({ amount: 5 })

        expect(entity.amount).toBe(5)
      })
    })
  })
})
