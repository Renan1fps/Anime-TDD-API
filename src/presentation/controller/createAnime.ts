import { IDateValidator, IHttpRequest, IHttpResponse, Controller } from './protocols'
import { badRequest, serverError } from '../helpers'
import { InvalidParam, MissingParamError } from '../errors'
import { IAddAnime } from '../../domain/usecases/add-anime'
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

      this.addAnime.add(httpRequest.body)
    } catch (error) {
      return serverError()
    }
  }

}
