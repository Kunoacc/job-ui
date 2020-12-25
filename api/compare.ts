import { ComparePeople } from "../interfaces/compare.interface";
import { ApiRequestError } from "../model/apiRequestError";
import { get } from "../utils/http.util";

export default {
  async compareUsers({ first, second }: {
    first: string,
    second: string
  }, skills?: any): Promise<ComparePeople>{
    try {
      const response = await get<ComparePeople>(`compare/people/${first}/${second}${skills ? `?skills=${encodeURI(skills)}` : ``}`)
      return response?.parsedBody
    } catch (error) {
      throw new ApiRequestError(error)
    }
  }
}