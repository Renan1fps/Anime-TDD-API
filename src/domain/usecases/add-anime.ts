import { IAnimeModel } from "../models/anime"

export interface IAddAnimeModel{
  name: string,
  description: string,
  price: number,
  date: Date
}

export interface IAddAnime{
  add(anime: IAddAnimeModel): IAnimeModel
}