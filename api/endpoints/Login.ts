import { EndpointHandler } from "../EPLogic"
import { logger } from "../logger"

const loginHandler: EndpointHandler = async (req) => {
    if (req.method === 'POST') {
        const { username, password } = await req.json()
        logger('HTTP', 'Login request', JSON.parse(await req.json())
        return Response.json({ username, password })
    }

    return new Response('Unhandled HTTP method', { status: 405 })
}

export const login = { url: '/api/login', handler: loginHandler }