import { IDateValidator, IHttpRequest, IHttpResponse, Controller } from './protocols'
import { badRequest, serverError } from '../helpers'
import { InvalidParam, MissingParamError } from '../errors'
export class CreateAnimeController implements Controller {

  constructor(private readonly dateValidator: IDateValidator) { }

  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ["name", "description", "price", "date"]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValidDate = this.dateValidator.isValid(httpRequest.body.date)
      if (!isValidDate) {
        return badRequest(new InvalidParam('date'))
      }
       //TODO: CALL USECASE ande validade chamada
    } catch (error) {
      return serverError()
    }
  }

}
