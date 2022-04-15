import { IAnimeModel } from "../../domain/models/anime";
import { IAddAnimeModel } from "../../domain/usecases/add-anime";
import { ParseDate } from "../protocols/parse-date";

export class DbAddAnime {

  constructor(private readonly parseDate: ParseDate) { }

  async add(anime: IAddAnimeModel): Promise<IAnimeModel> {
    this.parseDate.parse(anime.date)
    return new Promise(resolve => resolve(null))
  }
}