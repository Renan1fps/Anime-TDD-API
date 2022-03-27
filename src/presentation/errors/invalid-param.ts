export class InvalidParam extends Error {
  constructor(paramError: string) {
    super(`Invalid param ${paramError}`)
    this.name = 'InvalidParam'
  }
}