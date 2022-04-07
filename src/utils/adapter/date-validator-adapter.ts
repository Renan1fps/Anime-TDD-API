import { IDateValidator } from "../../presentation/protocols";

export class DateValidator implements IDateValidator{
  isValid(date: Date): boolean {
    return false
  }
}