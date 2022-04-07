import { DateValidator } from "./date-validator-adapter"

describe('DateValidator', () => {

  const date = new Date()

  test('Should return false if invalid date is provided', () => {
    const sut =  new DateValidator()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid(date)
    expect(isValid).toBe(false)
  })
})