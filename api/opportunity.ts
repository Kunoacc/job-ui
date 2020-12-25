import { Opportunity } from "../interfaces/opportunity.interface";
import { ApiRequestError } from "../model/apiRequestError";
import { get, post } from "../utils/http.util";

export default {
  async getOpportunity(id: string): Promise<Opportunity>{
    try {
      const response = await get<Opportunity>(`opportunity/${id}`)
      return response?.parsedBody
    } catch (error) {
      throw new ApiRequestError(error)
    }
  },

  async createOpportunity(opportunityId: string): Promise<Opportunity>{
    try {
      const response = await post<Opportunity, {
        opportunityId: string
      }>(`opportunity`, { opportunityId })
      return response?.parsedBody
    } catch (error) {
      throw new ApiRequestError(error)
    }
  }
}