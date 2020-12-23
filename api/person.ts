import { Person } from "../interfaces/person.interface";
import { ApiRequestError } from "../model/apiRequestError";
import { get, post } from "../utils/http.util";

export default {
  async getPerson(userId: string): Promise<Person>{
    try {
      const response = await get<Person>(`person/${userId}`)
      console.log(response)
      return response?.parsedBody
    } catch (error) {
      console.log(error)
      throw new ApiRequestError(error)
    }
  },

  async createPerson(userId: string): Promise<Person>{
    try {
      const response = await post<Person, {
        userId: string
      }>(`person`, { userId })
      return response?.parsedBody
    } catch (error) {
      throw new ApiRequestError(error)
    }
  }
}