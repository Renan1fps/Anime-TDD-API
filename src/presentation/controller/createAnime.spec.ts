import { CreateAnimeController } from './createAnime'

describe('CreateAnime Controller', () => {

  const makeSut = () => {
    const sut = new CreateAnimeController()
    return {
      sut
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
    expect(httpResponse.body).toEqual(new Error("missing param: name"))
  })

  test('Should return 400 if no description is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        price: 0.00,
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error("missing param: description"))
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
    expect(httpResponse.body).toEqual(new Error("missing param: price"))
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
    expect(httpResponse.body).toEqual(new Error('missing param: date'))
  })
})