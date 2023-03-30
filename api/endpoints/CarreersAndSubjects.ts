import { EndpointHandler } from "../EPLogic"
import { models } from "../schemas/models"

const Carreer = models.get().Carreer

const getCarreersAndSubjects: EndpointHandler = async (req) => {
    if (req.method === 'GET') {
        const resPayload = await Carreer.find({}).populate('subjects')
        return Response.json(resPayload)
    }

    return new Response('Unhandled HTTP method', { status: 405 })
}

export const carreersAndSubjects = { url: '/api/carreers', handler: getCarreersAndSubjects }