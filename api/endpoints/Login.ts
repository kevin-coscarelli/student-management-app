import { EndpointHandler } from "../EPLogic"
import { signJWT } from "../helpers/jwt"
import { logger } from "../logger"
import { defaultMiddleware, plugMiddleware } from "../middleware"
import { models } from "../schemas/models"
import { serialize, CookieSerializeOptions} from 'cookie'

const User = models.get().User

const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 days
}

const loginHandler: EndpointHandler = async (req) => {
    try {
        if (req.method === 'POST') {
            const { email, password } = await req.json() as any
            // Comparamos el email y la contraseña con la base de datos
            const resPayload = await User.findOne({
                email,
                password
            }, ['_id', 'email']).lean()
            
            if (resPayload?.email) {
                logger('HTTP', 'Login attempt', resPayload.email)
                // Generamos el JSON Web Token a partir del email y el id del usuario,
                // lo encriptamos y devolvemos el token en la respuesta.
                const token = await signJWT(resPayload.email, resPayload._id)
                if (!token) return new Response('Login: Error signing JWT', { status: 500 })

                return new Response(JSON.stringify({
                    JWT: token
                }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            }
    
            return new Response('Login: Invalid credentials', { 
                status: 401,
            })
        }
    
        return new Response('Login: Unhandled HTTP method', { status: 405 })
    }

    catch (e: any) {
        return new Response(e?.message, { status: 500 })
    }
}

export const login = { url: '/api/login', handler: plugMiddleware(loginHandler, defaultMiddleware) }
