import moment from "moment"
import { DateValidator } from "./date-validator-adapter"

describe('DateValidator', () => {

  const date = new Date()

  jest.mock('moment', () => ({
    isDate: () => {
      return true
    }
  }))

  test('Should return false if invalid date is provided', () => {
    const sut = new DateValidator()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid(date)
    expect(isValid).toBe(false)
  })

  test('Should return false if valid date is provided', () => {
    const sut = new DateValidator()
    const isValid = sut.isValid(date)
    expect(isValid).toBe(true)
  })

  test('Should call isValid with correct date', ()=>{
    const sut = new DateValidator()
    const isValidSpy = jest.spyOn(sut, 'isValid')
    sut.isValid(date)
    expect(isValidSpy).toHaveBeenCalledWith(date)
  })
})