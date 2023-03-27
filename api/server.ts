import { connect, disconnect } from "mongoose"
import { mongodbUrl } from "./mockDB"
import { Carreer } from "./schemas/Carreer"

type EndpointHandler = (req: Request) => Response
const endpointMap = new Map<string, EndpointHandler>()

type ReqMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

type RegisterEndpointProps = {
    url: string,
    handler: EndpointHandler
} 

const registerEndpoint = ({ url, handler }: RegisterEndpointProps) => {
    endpointMap.set(url, handler)
    console.log(url)
}

const getEndpointHandler = (url: string) => {
    const handler = endpointMap.get(url)
    console.log(endpointMap.keys())
    if (handler) {
        return handler
    }

    return () => new Response('404! Not Found!')
}

const getCarreersAndSubjects: EndpointHandler = async (req) => {
    if (req.method === 'GET') {
        const resPayload = await Carreer.find({}).populate('subjects')
        console.log(resPayload)
        return Response.json(JSON.stringify(resPayload))
    }

    return new Response('Unhandled method')
}

registerEndpoint({ url: '/api/carreers', handler: getCarreersAndSubjects })

try {
    connect(mongodbUrl)
} finally {

}
Bun.serve({
    port: 8081, // defaults to $PORT, then 3000
    fetch(req) {
        const url = new URL(req.url).pathname
        const method = req.method as ReqMethods
        console.log(url, method)
        return getEndpointHandler(url)(req)
    },
})
