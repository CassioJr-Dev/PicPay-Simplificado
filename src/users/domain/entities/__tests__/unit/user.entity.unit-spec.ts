import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'
import { UserType } from '@/users/domain/enums/user.type.enum'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity
  beforeEach(() => {
    UserEntity.validate = jest.fn()
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })
  it('Constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.props.firstName).toEqual(props.firstName)
    expect(sut.props.lastName).toEqual(props.lastName)
    expect(sut.props.document).toEqual(props.document)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.balance).toEqual(props.balance)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.userType).toEqual(props.userType)
  })
  it('Getter of firstName field', () => {
    expect(sut.firstName).toBeDefined()
    expect(sut.firstName).toEqual(props.firstName)
    expect(typeof sut.firstName).toBe('string')
  })

  it('Setter of firstName field', () => {
    sut['firstName'] = 'other firstName'
    expect(sut.props.firstName).toEqual('other firstName')
    expect(typeof sut.props.firstName).toBe('string')
  })

  it('Getter of lastName field', () => {
    expect(sut.lastName).toBeDefined()
    expect(sut.lastName).toEqual(props.lastName)
    expect(typeof sut.lastName).toBe('string')
  })

  it('Setter of lastName field', () => {
    sut['lastName'] = 'other lastName'
    expect(sut.props.lastName).toEqual('other lastName')
    expect(typeof sut.props.lastName).toBe('string')
  })

  it('Getter of document field', () => {
    expect(sut.document).toBeDefined()
    expect(sut.document).toEqual(props.document)
    expect(typeof sut.document).toBe('string')
  })

  it('Setter of document field', () => {
    sut['document'] = 'other document'
    expect(sut.props.document).toEqual('other document')
    expect(typeof sut.props.document).toBe('string')
  })

  it('Getter of email field', () => {
    expect(sut.email).toBeDefined()
    expect(sut.email).toEqual(props.email)
    expect(typeof sut.email).toBe('string')
  })

  it('Setter of email field', () => {
    sut['email'] = 'other email'
    expect(sut.props.email).toEqual('other email')
    expect(typeof sut.props.email).toBe('string')
  })

  it('Getter of balance field', () => {
    expect(sut.balance).toBeDefined()
    expect(sut.balance).toEqual(props.balance)
    expect(typeof sut.balance).toBe('number')
  })

  it('Setter of balance field', () => {
    sut['balance'] = 5
    expect(sut.props.balance).toEqual(5)
    expect(typeof sut.props.balance).toBe('number')
  })
  it('Getter of password field', () => {
    expect(sut.password).toBeDefined()
    expect(sut.password).toEqual(props.password)
    expect(typeof sut.password).toBe('string')
  })

  it('Setter of password field', () => {
    sut['password'] = 'other password'
    expect(sut.props.password).toEqual('other password')
    expect(typeof sut.props.password).toBe('string')
  })

  it('Getter of userType field', () => {
    expect(sut.userType).toBeDefined()
    expect(sut.userType).toEqual(props.userType)
    expect(typeof sut.userType).toBe('string')
  })

  it('Setter of userType field', () => {
    sut['userType'] = UserType.LOGIST
    expect(sut.props.userType).toEqual('LOGIST')
    expect(typeof sut.props.userType).toBe('string')
  })

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('Should update a property', () => {
    sut.updateProperty({ firstName: 'other name', email: 'a@a.com' })
    expect(UserEntity.validate).toHaveBeenCalledTimes(2)
    expect(sut.props.firstName).toEqual('other name')
    expect(sut.props.email).toEqual('a@a.com')
  })
})
