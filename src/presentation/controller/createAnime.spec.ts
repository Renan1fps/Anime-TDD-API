import { InvalidParam, MissingParamError } from '../errors'
import { ServerError } from '../errors/server-error'
import { CreateAnimeController } from './createAnime'
import { IDateValidator } from './protocols/date-validator'

describe('CreateAnime Controller', () => {

  const makeDateValidator = (): IDateValidator => {
    class DateValidatorStub implements IDateValidator {
      isValid(date: Date): boolean {
        return true
      }
    }

    return new DateValidatorStub()
  }

  const makeSut = () => {
    const dateValidatorStub = makeDateValidator()
    const sut = new CreateAnimeController(dateValidatorStub)
    return {
      sut,
      dateValidatorStub
    }
  }

  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: "any_description",
        price: 0.00,
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no description is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        price: 1,
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('description'))
  })

  test('Should return 400 if no price is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('price'))
  })

  test('Should return 400 if no date is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 1,
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('date'))
  })

  test('Should return 400 if an invalid date is provided', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 1,
        date: new Date()
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParam('date'))
  })

  test('Should 500 if dateValidator throws', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 1,
        date: new Date()
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call error corrector if dateValidator throws', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 1,
        date: new Date()
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBeInstanceOf(ServerError)
  })
})