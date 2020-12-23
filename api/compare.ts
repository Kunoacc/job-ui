import { ComparePeople } from "../interfaces/compare.interface";
import { ApiRequestError } from "../model/apiRequestError";
import { get } from "../utils/http.util";

export default {
  async compareUsers({ first, second }: {
    first: string,
    second: string
  }, skills?: []): Promise<ComparePeople>{
    try {
      const searchParams = new URLSearchParams(skills.map(skill => ['skill', skill]))
      const response = await get<ComparePeople>(`compare/people/${first}/${second}${searchParams}`)
      return response?.parsedBody
    } catch (error) {
      throw new ApiRequestError(error)
    }
  }
}