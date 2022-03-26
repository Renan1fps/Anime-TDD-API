import { badRequest } from '../helpers/httpHelper'
import { IHttpRequest, IHttpResponse } from './protocols/http'
export class CreateAnimeController {
  handle(httpRequest: IHttpRequest): IHttpResponse {

    const requiredFields = ["name", "description", "price"]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new Error(`missing param: ${field}`))
      }
    }
  }
}