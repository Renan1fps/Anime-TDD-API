export const badRequest = (err: Error) => ({
  statusCode: 400,
  body: err
})