import { badRequest } from '../helpers/httpHelper'
import { IDateValidator } from './protocols/date-validator'
import { IHttpRequest, IHttpResponse } from './protocols/http'
export class CreateAnimeController {

  constructor(private readonly dateValidator: IDateValidator){}

  handle(httpRequest: IHttpRequest): IHttpResponse {

    const requiredFields = ["name", "description", "price", "date"]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new Error(`missing param: ${field}`))
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