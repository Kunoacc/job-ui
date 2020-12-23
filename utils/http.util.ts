interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export const BASE_PATH = process.env.NODE_ENV !== 'production' ? `http://localhost:3000/api/` : 'https://torre-api-h3q5m.ondigitalocean.app/api/'

export async function http<T>(
  request: RequestInfo
): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  response.parsedBody = await response.json();

  if (!response.ok) {
    console.log(response)
    throw response.parsedBody
  }

  console.log(response)

  return response;
}

export async function get<T>(
  path: string
): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    method: 'GET',
    credentials: 'omit',
    mode: 'cors'
  }
  return await http<T>(
    new Request(BASE_PATH + path, args)
  )
}

export async function post<T, E>(
  path: string,
  body?: E
): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'omit',
    mode: 'cors'
  }
  return await http<T>(
    new Request(BASE_PATH + path, args)
  )
}