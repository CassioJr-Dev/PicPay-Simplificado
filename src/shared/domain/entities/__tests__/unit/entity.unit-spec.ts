import { Entity } from '../../entity'

type StubProps = Record<string, any>

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should set porps and id', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity.id).not.toBeNull()
    expect(typeof entity.id).toBe('string')
  })

  it('Should validate a uuid', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = '698b0c7e-c68b-4cfd-99dd-aac08024be8d'
    const entity = new StubEntity(props, id)

    expect(entity.id).toBe(id)
    expect(entity.isValidUUID(id)).toEqual(id)
    expect(entity.isValidUUID('3')).not.toEqual(id)
  })

  it('Should convert a entity to a Javascript Object', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = '698b0c7e-c68b-4cfd-99dd-aac08024be8d'
    const created_at = new Date()
    const entity = new StubEntity(props, id, created_at)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
      created_at,
    })
  })

  it('Should create newDate', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const entity = new StubEntity(props)

    expect(entity.created_at).toBeDefined()
    expect(entity.created_at).toBeInstanceOf(Date)
  })
})
