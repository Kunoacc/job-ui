import { OpportunitySearchApiResponse, PersonSearchApiResponse } from "../interfaces/search.interface";
import { ApiRequestError } from "../model/apiRequestError";
import { post } from "../utils/http.util";

export default {
  async searchPerson(query: string, offset: string, skills?: []): Promise<PersonSearchApiResponse>{
    try {
      const searchParams = new URLSearchParams()
      searchParams.append('offset', offset)
      const response = await post<PersonSearchApiResponse, {
        name: string,
        skills: []
      }>(`search/person?${searchParams.toString()}`, {
        name: query,
        skills: skills
      })
      return response?.parsedBody
    } catch(error) {
      console.log(error)
      throw new ApiRequestError(error)
    }
  },

  async searchOpportunity(query: string, offset: string, skills?: []): Promise<OpportunitySearchApiResponse>{
    try {
      const searchParams = new URLSearchParams()
      searchParams.append('offset', offset)
      const response = await post<OpportunitySearchApiResponse, {
        code: string,
        skills: []
      }>(`search/opportunity?${searchParams.toString()}`, {
        code: query,
        skills: skills
      })
      return response?.parsedBody
    } catch(error) {
      console.log(error)
      throw new ApiRequestError(error)
    }
  }
}