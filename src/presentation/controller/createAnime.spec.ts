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
    expect(httpResponse.body).toEqual(new Error("missing param name"))
  })
})