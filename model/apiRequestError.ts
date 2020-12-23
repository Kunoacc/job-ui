import { ApiError } from "../interfaces/error.interface";

export class ApiRequestError extends Error implements ApiError {

  name: string;
  error?: string;
  message: string;
  status: number;
  statusCode?: number;
  data?: any;

  constructor(error: ApiError) {
    super(error?.message || error?.error || 'Something went wrong, please try again')
    this.message = error?.message || error?.error || 'Something went wrong, please try again'
    this.error = error?.error
    this.status = error?.status
    this.statusCode = error?.statusCode
    this.data = error?.data
    
  }
}