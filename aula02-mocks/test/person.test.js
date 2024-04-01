import { describe, it, expect } from '@jest/globals'
import  Person  from "../src/person.js"
describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw an error if name is not provided', () => {
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-00'
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
      new Error('Name is required')
      )
    })
  })
})
