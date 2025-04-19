import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'
import { UnprocessableError } from '@/shared/domain/errors/unprocessable-error'

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid firstName', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        firstName: null,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        firstName: '',
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        firstName: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        firstName: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)
    })

    it('Should throw an error when creating a user with invalid lastName', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        lastName: null,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        lastName: '',
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        lastName: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        lastName: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)
    })
    it('Should throw an error when creating a user with invalid document', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        document: null,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        document: '',
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        document: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        document: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)
    })

    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        email: '',
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)
    })

    it('Should throw an error when creating a user with invalid balance', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        balance: null,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        balance: 'a' as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)
    })

    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        password: '',
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)
    })

    it('Should throw an error when creating a user with invalid userType', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        userType: null,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        userType: '' as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        userType: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)

      props = {
        ...UserDataBuilder({}),
        userType: 'a'.repeat(101) as any,
      }
      expect(() => new UserEntity(props)).toThrowError(UnprocessableError)
    })

    it('Should a valid user', () => {
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({}),
      }
      new UserEntity(props)
    })

    describe('Update property', () => {
      it('Should throw an error when update a user with invalid property', () => {
        const entity = new UserEntity(UserDataBuilder({}))
        expect(() =>
          entity.updateProperty({ firstName: 0 as any }),
        ).toThrowError(UnprocessableError)
        expect(() =>
          entity.updateProperty({ balance: 'a' as any }),
        ).toThrowError(UnprocessableError)
        expect(() =>
          entity.updateProperty({ userType: 'a' as any }),
        ).toThrowError(UnprocessableError)
      })

      it('Should a valid user', () => {
        expect.assertions(1)

        const props: UserProps = {
          ...UserDataBuilder({}),
        }

        const entity = new UserEntity(props)
        entity.updateProperty({ firstName: 'other name' })

        expect(entity.firstName).toBe('other name')
      })
    })
  })
})
