export class CreateAnimeController {
  handle(httpRequest: any): any {

    const requiredFields = ["name", "description", "price"]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`missing param: ${field}`)
        }
      }
    }
  }
}