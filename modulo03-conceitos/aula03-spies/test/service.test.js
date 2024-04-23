import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Service from '../src/service.js'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
describe('Service Test Suite', () => {
  let _service

  // describe('#read', () => {
  //   it('should return an empty array if the file is empty', async () => {
  //     jest.spyOn(fs, fs.readFile.name).mockResolvedValue('')
  //     const result = await _service.read()
  //     expect(result).toEqual([])
  //   })
  //   it('should return users without password if file contains users', async () => {
  //     // Arrange
  //     const dbData = [
  //       {
  //         username: 'user1',
  //         password: 'pass1',
  //         createdAt: new Date().toISOString()
  //       },
  //       {
  //         username: 'user2',
  //         password: 'pass2',
  //         createdAt: new Date().toISOString()
  //       }
  //     ]
  //     const fileContents = dbData
  //       .map(item => JSON.stringify(item).concat('\n'))
  //       .join('')
  //     jest.spyOn(fs, 'readFile').mockResolvedValue(fileContents)

  //     // Act
  //     const result = await _service.read()

  //     // Assert
  //     const expected = dbData.map(({ password, ...rest }) => ({ ...rest }))
  //     expect(result).toEqual(expected)
  //   })

  // })

  describe('#create - spies', () => {
    const filename = 'testefile.ndjson'
    const MOCKED_HASH_PWD = 'hashedPassword'
    beforeEach(() => {
      jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD)
      })
      jest.spyOn(fs, fs.appendFile.name).mockResolvedValue()
      _service = new Service({ filename })
    })
    it('should call appendFile with correct params', async () => {
      const input = { username: 'user1', password: 'pass1' }
      const expectedCreatedAt = new Date().toISOString()

      //Arrange
      jest
        .spyOn(Date.prototype, Date.prototype.toISOString.name)
        .mockReturnValue(expectedCreatedAt)
      //Act

      await _service.create(input)

      //Assert
      expect(crypto.createHash).toHaveBeenCalledWith('sha256')

      const hash = crypto.createHash('sha256')

      expect(hash.update).toHaveBeenCalledWith(input.password)
      expect(hash.digest).toHaveBeenCalledWith('hex')

      const expected = JSON.stringify({
        ...input,
        createdAt: expectedCreatedAt,
        password: MOCKED_HASH_PWD
      }).concat('\n')
      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected)
    })
  })
})
