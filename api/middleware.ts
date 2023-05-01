import { parse } from "cookie"
import { verifyJWT } from "./helpers/jwt"
import { EndpointHandler } from "./EPLogic"

export type MiddlewareFn = (req: Request) => Promise<Response | null>

export const preflightHandler: MiddlewareFn = async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('Preflight accepted', {
            status: 204,
        })
    }
    return null
}

export const authorizeHandler: MiddlewareFn = async (req: Request) => {
    try {
        
        const auth = req.headers.get('Authorization')
        if (!auth) return new Response('JWT: No Authorization header provided', { status: 401 })
        console.log(auth)
        const jwe = auth.split(' ')[1]
        if (!jwe) return new Response('JWT: No JWT provided', { status: 401 })

        const verifier = await verifyJWT(jwe)
        if (!verifier) return new Response('JWT: Invalid JWT', { status: 401 })

        return null
    }
    catch (e: any) {
        console.error(e)
        return new Response('JWT: Server Error', { status: 500 })
    }
}

export const defaultMiddleware: MiddlewareFn[] = [
    preflightHandler,
]

/**
 * Conecta el handler de un endpoint con los middlewares.
 */
export const plugMiddleware = (handler: EndpointHandler, middlewareArr: MiddlewareFn[]): EndpointHandler => {
    return async (req) => {
        for (const middleware of middlewareArr) {
            const middlewareResponse = await middleware(req)
            if (middlewareResponse) {
                return middlewareResponse
            }
        }
        return handler(req)
    }
}