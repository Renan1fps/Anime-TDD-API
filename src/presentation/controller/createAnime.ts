import { IDateValidator, IHttpRequest, IHttpResponse } from './protocols'
import { badRequest } from '../helpers/httpHelper'
import { MissingParamError } from '../errors/missing-param-error'

export class CreateAnimeController {

  constructor(private readonly dateValidator: IDateValidator){}

  handle(httpRequest: IHttpRequest): IHttpResponse {

    const requiredFields = ["name", "description", "price", "date"]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
     const isValidDate = this.dateValidator.isValid(httpRequest.body.date)
     if(!isValidDate){
       return {
         statusCode: 400,
         body: new Error('invalid date')
       }
     }
  }
}