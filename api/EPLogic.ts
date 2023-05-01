import { carreersAndSubjects } from "./endpoints/CarreersAndSubjects"
import { login } from "./endpoints/Login"
import { MiddlewareFn, authorizeHandler, preflightHandler } from "./middleware"

export type EndpointHandler = (req: Request) => Promise<Response>

export type ReqMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

type RegisterEndpointProps = {
    url: string,
    handler: EndpointHandler
}

const endpointMap = new Map<string, EndpointHandler>()

const registerEndpoint = ({ url, handler }: RegisterEndpointProps) => {
    endpointMap.set(url, handler)
}

/**
 * Obtiene el handler de un a partir del path de la URL.
 */
export const getEndpointHandler = (url: string) => {
    const handler = endpointMap.get(url)
    if (handler) {
        return handler
    }

    return async () => new Response('404! Not Found!')
}

/**
 * Registra todos los endpoint handlers en el Map(), usando el path de la URL como key.
 */
export const registerAllEndpoints = () => {
    registerEndpoint(carreersAndSubjects)
    registerEndpoint(login)
}