import { IHttpResponse } from "../controller/protocols";

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new Error('internal server error')
})