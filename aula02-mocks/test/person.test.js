import { describe, it, expect } from '@jest/globals'
import Person from '../src/person.js'
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
    it('should throw an error if cpf is not provided', () => {
      const mockInvalidPerson = {
        name: 'Fulano nome da Silva',
        cpf: ''
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error('CPF is required')
      )
    })
    it('should not throw an error if name is valid', () => {
      const mockInvalidPerson = {
        name: 'Fulano nome da Silva',
        cpf: '123.345.678-00'
      }

      expect(() => Person.validate(mockInvalidPerson)).not.toThrow()
    })
  })
  describe('#format', () => {
    // parte do principio que os dados foram validados
    it('should format the person name and CPF', () => {
      // Arrange = Preparar
      const mockPerson = {
        name: 'John Doe',
        cpf: '123.456.789-00'
      }
      // Act = Executar
      const formattedPerson = Person.format(mockPerson)
      // Assert = Validar
      const expectedPerson = {
        name: 'John',
        lastName: 'Doe',
        cpf: '12345678900'
      }
      expect(formattedPerson).toStrictEqual(expectedPerson)
    })
  })
  describe('#save', () => {
    it('should throw an error if person is invalid', () => {
      const mockInvalidPerson = {
        name: 'John Doe',
        cpf: '123.456.789-00'
      }

      expect(() => Person.save(mockInvalidPerson)).toThrow(
        new Error(
          'cannot save invalid person: {"name":"John Doe","cpf":"123.456.789-00"}'
        )
      )
    })
    it('should not throw an error if person is valid', () => {
      const mockValidPerson = {
        name: 'John',
        lastName: 'Doe',
        cpf: '12345678900'
      }

      expect(() => Person.save(mockValidPerson)).not.toThrow()
    })
  })
})
