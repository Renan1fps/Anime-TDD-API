import { IAnimeModel } from '../../domain/models/anime'
import { IAddAnime, IAddAnimeModel } from '../../domain/usecases/add-anime'
import { InvalidParam, MissingParamError } from '../errors'
import { ServerError } from '../errors/server-error'
import { CreateAnimeController } from './createAnime'
import { IDateValidator } from './protocols/date-validator'

const createdAt = new Date()
const date = new Date()

describe('CreateAnime Controller', () => {

  interface ISutTypes {
    sut: CreateAnimeController
    dateValidatorStub: IDateValidator
    addAnimeStub: IAddAnime,
  }

  const makeDateValidator = (): IDateValidator => {
    class DateValidatorStub implements IDateValidator {
      isValid(date: Date): boolean {
        return true
      }
    }

    return new DateValidatorStub()
  }

  const makeAddAnime = (): IAddAnime => {
    class AddAnimeStub implements IAddAnime {
      add(anime: IAddAnimeModel): IAnimeModel {
        const fakeAnime = {
          id: 'valid_id',
          name: 'valid_name',
          price: 1,
          description: 'valid_description',
          date,
          createdAt,
        }
        return fakeAnime
      }
    }

    return new AddAnimeStub()
  }

  const makeSut = (): ISutTypes => {
    const dateValidatorStub = makeDateValidator()
    const addAnimeStub = makeAddAnime()
    const sut = new CreateAnimeController(dateValidatorStub, addAnimeStub)
    return {
      sut,
      dateValidatorStub,
      addAnimeStub
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
        date
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
        date
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
        date
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBeInstanceOf(ServerError)
  })

  test('Should call dateValidator with correct date', () => {
    const { sut, dateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 1,
        date
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(date)
  })

  test('Should call addAnime with correct values', () => {
    const { sut, addAnimeStub } = makeSut()
    const addSpy = jest.spyOn(addAnimeStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 1,
        date
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({ ...httpRequest.body })
  })

  test('Should return 500 if addAnime throws', () => {
    const { sut, addAnimeStub } = makeSut()
    jest.spyOn(addAnimeStub, 'add').mockImplementationOnce(() => {
      throw Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 1,
        date
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 1,
        date
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      price: 1,
      description: 'valid_description',
      date,
      createdAt,
    })
  })
})