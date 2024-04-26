import { it, expect, describe, beforeEach, jest } from '@jest/globals'
import { mapPerson } from '../src/person.js'

describe('Person Test Suite', () => {
  describe('happy path', () => {
    it('should map a person string to a person object', () => {
      const personStr = '{"name": "John", "age": 30}'
      const person = mapPerson(personStr)
      expect(person).toEqual({
        name: 'John',
        age: 30,
        createdAt: expect.any(Date)
      })
    })
  })
  describe('what coverage doesnt tell you', () => {
    it('should not map person given invalid JSON string', () => {
      const personStr = '{"name"'
      expect(() => mapPerson(personStr)).toThrow('Unexpected end of JSON input')
    })
    it('should not map person given invalid JSON data', () => {
      const personStr = '{}'
      const person = mapPerson(personStr)
      expect(person).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(Date)
      })
    })
  })
})
