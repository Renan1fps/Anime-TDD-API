import { badRequest } from '../helpers/httpHelper'
export class CreateAnimeController {
  handle(httpRequest: any): any {

    const requiredFields = ["name", "description", "price"]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new Error(`missing param: ${field}`))
      }
    }
  }
}