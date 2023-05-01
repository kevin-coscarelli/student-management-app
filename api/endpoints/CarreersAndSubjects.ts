import { EndpointHandler } from "../EPLogic"
import { authorizeHandler, defaultMiddleware, plugMiddleware } from "../middleware"
import { models } from "../schemas/models"

const Carreer = models.get().Carreer

const getCarreersAndSubjects: EndpointHandler = async (req) => {
    if (req.method === 'GET') {
        const resPayload = await Carreer.find({}).populate('subjects')
        return Response.json(resPayload)
    }

    return new Response('carreersAndSubjects: Unhandled HTTP method', { status: 405 })
}

export const carreersAndSubjects = {
    url: '/api/carreers',
    handler: plugMiddleware(getCarreersAndSubjects, defaultMiddleware.concat(authorizeHandler))
}