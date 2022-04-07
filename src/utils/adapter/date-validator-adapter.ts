import moment from "moment";
import { IDateValidator } from "../../presentation/protocols";

export class DateValidator implements IDateValidator{
  isValid(date: Date): boolean {
    return moment.isDate(date)
  }
}