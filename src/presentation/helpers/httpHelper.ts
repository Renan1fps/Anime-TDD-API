import { IHttpResponse } from "../protocols"
import { ServerError } from "../errors"


export const success = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})
export const badRequest = (err: Error): IHttpResponse => ({
  statusCode: 400,
  body: err
})

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})