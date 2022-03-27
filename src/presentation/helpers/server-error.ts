import { IHttpResponse } from "../controller/protocols";
import { ServerError } from "../errors";

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})