export class CreateAnimeController {
  handle(httpRequest: any): any {

    if(!httpRequest.body.name){
      return {
        statusCode: 400,
        body: new Error("missing param: name")
      }
    }

    if(!httpRequest.body.description){
      return {
        statusCode: 400,
        body: new Error("missing param: description")
      }
    }

    if(!httpRequest.body.price){
      return {
        statusCode: 400,
        body: new Error("missing param: price")
      }
    }
 
  }
}