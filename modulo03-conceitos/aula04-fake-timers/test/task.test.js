import { it, expect, describe, beforeEach, jest } from '@jest/globals'
import Task from '../src/task.js'
import { setTimeout } from 'node:timers/promises'
describe('Task test Suite', () => {
  let _logMock
  let _task
  beforeEach(() => {
    _logMock = jest.spyOn(console, console.log.name).mockImplementation()
    _task = new Task()
  })
  it.skip('it should only run tasks that are due without fake timers (slow)', async () => {
    ///AAA = Arrange, Act, Assert
    //Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn()
      }
    ]
    // Act
    _task.save(tasks[0])
    _task.save(tasks[1])

    _task.run(200)

    await setTimeout(11000)
    expect(tasks[0].fn).toHaveBeenCalled()
    expect(tasks[1].fn).toHaveBeenCalled()
  }, 15000) //configurar para o jest aguardar 15 segundos nesse teste
  it('it should only run tasks that are due with fake timers (fast)', async () => {
    jest.useFakeTimers()

    ///AAA = Arrange, Act, Assert
    //Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn()
      }
    ]
    // Act
    _task.save(tasks[0])
    _task.save(tasks[1])

    _task.run(200)

    jest.advanceTimersByTime(4000)

    expect(tasks[0].fn).not.toHaveBeenCalled()
    expect(tasks[1].fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2000)

    expect(tasks[0].fn).toHaveBeenCalled()
    expect(tasks[1].fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(4000)

    expect(tasks[1].fn).toHaveBeenCalled()

    jest.useRealTimers()
  })
})
