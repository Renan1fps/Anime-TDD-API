import { IDateValidator, IHttpRequest, IHttpResponse, IAddAnime , Controller } from './create-anime-protocols'
import { badRequest, serverError, success } from '../../helpers'
import { InvalidParam, MissingParamError } from '../../errors'

export class CreateAnimeController implements Controller {

  constructor(private readonly dateValidator: IDateValidator, private readonly addAnime: IAddAnime) { }

  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ["name", "description", "price", "date"]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { date } = httpRequest.body
      const isValidDate = this.dateValidator.isValid(date)
      if (!isValidDate) {
        return badRequest(new InvalidParam('date'))
      }

      const anime = this.addAnime.add(httpRequest.body)
      return success(anime)
    } catch (error) {
      return serverError()
    }
  }

}
