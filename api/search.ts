import { OpportunitySearchApiResponse, PersonSearchApiResponse } from "../interfaces/search.interface";
import { ApiRequestError } from "../model/apiRequestError";
import { get, post } from "../utils/http.util";

export default {
  async searchPerson(query: string, offset: string, skills?: any): Promise<PersonSearchApiResponse>{
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

  async searchOpportunity(query: string, offset: string, skills?: any): Promise<OpportunitySearchApiResponse>{
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
  },

  async loadFilterOptions(query: string, limit: number = 5){
    try {
      const response = await get<{
        id: number,
        term: string,
        distance: number
      }[]>(`https://torre.co/api/strengths?limit=${limit}&q=${encodeURI(query)}&context=add-opportunity&locale=en`, false)
      return response?.parsedBody
    } catch (error) {
      console.log(error)
      throw new Error('sorry, something went wrong')
    }
  }
}