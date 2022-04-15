import { DbAddAnime } from "./db-add-account"

describe('DbAddAnime Usecase', () => {

  const validDate = new Date()
 
test('Should call parse with correct date', async () => {
  class ParseStub {
    parse(value: Date): string {
      return value.toString();
    }
  }
  const parseStub = new ParseStub()
  const sut = new DbAddAnime(parseStub)
  const isSpy = jest.spyOn(parseStub, 'parse')
  const anime = {
    name: 'valid_name',
    description: 'valid_description',
    price: 1,
    date: validDate,
  }
  await sut.add(anime)
  expect(isSpy).toHaveBeenCalledWith(validDate)
})


})