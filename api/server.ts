type EndpointHandler = (req: Request) => Response
const endpointMap = new Map<string, EndpointHandler>()

type ReqMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

const formatPath = (path: string) => `/api${path}`

type RegisterEndpointProps = {
    url: string,
    method: ReqMethods,
    handler: EndpointHandler
}

const buildKey = (url: string, method: ReqMethods) => `${method}:${url}` 

const registerEndpoint = ({ url, method, handler }: RegisterEndpointProps) => {
    endpointMap.set(buildKey(url, method), handler)
}

const getEndpointHandler = (url: string, method: ReqMethods) => {
    const handler = endpointMap.get(buildKey(url, method))
    if (handler) {
        return handler
    }

    return () => new Response('404! Not Found!')
}

// const getCarreerSubjects: EndpointHandler = (req) => {
    
// }

Bun.serve({
    port: 8081, // defaults to $PORT, then 3000
    fetch(req) {
        const url = new URL(req.url).pathname;
        const method = req.method as ReqMethods
        return getEndpointHandler(url, method)(req)
    },
});

