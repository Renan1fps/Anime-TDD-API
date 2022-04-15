import { ParseDate } from "../protocols/parse-date";
import { DbAddAnime } from "./db-add-account"

const validDate = new Date()

const makeParse = (): ParseDate => {
  class ParseStub implements ParseDate {
    parse(value: Date): string {
      return value.toString();
    }
  }

  return new ParseStub()
}

interface ISutTypes {
  sut: DbAddAnime,
  parseStub: ParseDate,
}

const makeSut = (): ISutTypes => {
  const parseStub = makeParse()
  const sut = new DbAddAnime(parseStub)

  return {
    sut,
    parseStub,
  }
}

describe('DbAddAnime Usecase', () => {
  test('Should call parseDate with correct date', async () => {
    const { sut, parseStub } = makeSut()
    const isValidSpy = jest.spyOn(parseStub, 'parse')
    const anime = {
      name: 'valid_name',
      description: 'valid_description',
      price: 1,
      date: validDate,
    }
    await sut.add(anime)
    expect(isValidSpy).toHaveBeenCalledWith(validDate)
  })

  test('Should throw if parseDate throws', async () => {
    const { sut, parseStub } = makeSut()
    jest.spyOn(parseStub, 'parse').mockImplementationOnce(() => {
      throw new Error()
    })
    const anime = {
      name: 'valid_name',
      description: 'valid_description',
      price: 1,
      date: validDate,
    }
    const reject = sut.add(anime)
    await expect(reject).rejects.toThrow()
  })
})